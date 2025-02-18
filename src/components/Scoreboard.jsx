import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Scoreboard = ({ score, gameOver }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    setHighScores(storedScores);
  }, []);

  useEffect(() => {
    if (gameOver) {
      const updatedScores = [...highScores, score]
        .sort((a, b) => b - a)
        .slice(0, 3);
      setHighScores(updatedScores);
      localStorage.setItem("highScores", JSON.stringify(updatedScores));
    }
  }, [gameOver]);

  return (
    <div>
      <h2>🏆 Leaderboard 🏆</h2>
      <ul>
        {highScores.map((s, index) => (
          <li key={index}>
            #{index + 1}: {s} points
          </li>
        ))}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default Scoreboard;
