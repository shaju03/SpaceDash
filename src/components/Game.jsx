import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import Scoreboard from "./Scoreboard";
import { backgroundMusic, crashSound, collectSound } from "../sound";

const Game = () => {
  const gameRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [pixiApp, setPixiApp] = useState(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });

    gameRef.current.appendChild(app.view);
    setPixiApp(app);

    // **Background Setup**
    const bgTexture = PIXI.Texture.from("/assets/background.png");
    const bg1 = new PIXI.Sprite(bgTexture);
    const bg2 = new PIXI.Sprite(bgTexture);

    bg1.x = 0;
    bg2.x = 1024;
    bg1.y = bg2.y = 0;
    app.stage.addChild(bg1, bg2);

    // **Spaceship**
    const spaceship = PIXI.Sprite.from("/assets/spaceship.png");
    spaceship.anchor.set(0.5);
    spaceship.x = 100;
    spaceship.y = app.screen.height / 2;
    spaceship.rotation = Math.PI / 2; // Face right direction
    app.stage.addChild(spaceship);

    let obstacles = [];
    let powerUps = [];
    let velocityY = 0;
    const speed = 5;

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") velocityY = -speed;
      if (e.key === "ArrowDown") velocityY = speed;
    });

    window.addEventListener("keyup", () => (velocityY = 0));

    app.ticker.add(() => {
      if (gameOver) return;

      // **Move Background**
      bg1.x -= 3;
      bg2.x -= 3;
      if (bg1.x <= -1024) bg1.x = bg2.x + 1024;
      if (bg2.x <= -1024) bg2.x = bg1.x + 1024;

      // **Move Spaceship**
      spaceship.y += velocityY;
      spaceship.y = Math.max(50, Math.min(app.screen.height - 50, spaceship.y));

      // **Move Obstacles & Power-ups**
      obstacles.forEach((obs) => (obs.x -= 5));
      powerUps.forEach((pwr) => (pwr.x -= 5));

      // **Collision with Obstacles (Game Over)**
      obstacles.forEach((obs) => {
        if (spaceship.getBounds().intersects(obs.getBounds())) {
          setGameOver(true);
          backgroundMusic.stop();
          crashSound.play();
        }
      });

      // **Collision with Power-ups (Increase Score)**
      powerUps.forEach((pwr) => {
        if (spaceship.getBounds().intersects(pwr.getBounds())) {
          collectSound.play();
          setScore((prev) => prev + 10);
          app.stage.removeChild(pwr);
          powerUps.splice(powerUps.indexOf(pwr), 1); // Remove from array
        }
      });
    });

    // **Spawn Obstacles**
    const spawnObstacle = () => {
      if (gameOver) return;
      const obstacle = PIXI.Sprite.from("/assets/asteroid.png");
      obstacle.anchor.set(0.5);
      obstacle.x = app.screen.width;
      obstacle.y = Math.random() * app.screen.height;
      app.stage.addChild(obstacle);
      obstacles.push(obstacle);
    };

    // **Spawn Power-ups (`powerup.png`)**
    const spawnPowerUp = () => {
      if (gameOver) return;
      const powerUp = PIXI.Sprite.from("/assets/powerup.png");
      powerUp.anchor.set(0.5);
      powerUp.x = app.screen.width;
      powerUp.y = Math.random() * app.screen.height;
      app.stage.addChild(powerUp);
      powerUps.push(powerUp);
    };

    let obstacleInterval = setInterval(spawnObstacle, 1500);
    let powerUpInterval = setInterval(spawnPowerUp, 5000);

    backgroundMusic.play();

    // **Pause/Resume Game on Tab Visibility Change**
    const handleVisibilityChange = () => {
      if (document.hidden) {
        app.ticker.stop();
        backgroundMusic.pause();
        clearInterval(obstacleInterval);
        clearInterval(powerUpInterval);
      } else {
        app.ticker.start();
        backgroundMusic.play();
        obstacleInterval = setInterval(spawnObstacle, 1500);
        powerUpInterval = setInterval(spawnPowerUp, 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      app.destroy(true);
      clearInterval(obstacleInterval);
      clearInterval(powerUpInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [gameOver]);

  // **Restart Game Function**
  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    if (pixiApp) pixiApp.stage.removeChildren();
  };

  return (
    <div style={{ position: "relative", width: "800px", height: "600px" }}>
      <div ref={gameRef} />
      <h2 style={{ position: "absolute", top: 10, left: 20, color: "#fff" }}>
        Score: {score}
      </h2>

      {gameOver && (
        <div style={styles.overlay}>
          <h1 style={styles.gameOverText}>Game Over</h1>
          <h2 style={styles.scoreText}>Score: {score}</h2>
          <Scoreboard score={score} gameOver={gameOver} />
          <button onClick={restartGame} style={styles.restartButton}>
            Restart
          </button>
        </div>
      )}

      {/* <Scoreboard score={score} /> */}
    </div>
  );
};

// **🔹 Styles for Game Over Screen**
const styles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "800px",
    height: "600px",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
  },
  gameOverText: {
    fontSize: "50px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  scoreText: {
    fontSize: "30px",
    marginBottom: "20px",
  },
  restartButton: {
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Game;
