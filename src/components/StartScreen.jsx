import PropTypes from "prop-types";

const StartScreen = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Space Dash 🚀</h1>
      <p style={styles.subtitle}>
        Avoid obstacles, collect UP, and score points!
      </p>
      <button onClick={onStart} style={styles.button}>
        Start Game
      </button>
    </div>
  );
};

// ✅ Styled Component for Fullscreen Effect
const styles = {
  container: {
    width: "800px", // Match Game Screen Width
    height: "600px", // Match Game Screen Height
    background: "url('/assets/background.png') center/cover no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    border: "2px solid white",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartScreen;
