import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div>
      {gameStarted ? (
        <Game />
      ) : (
        <StartScreen onStart={() => setGameStarted(true)} />
      )}
    </div>
  );
};

export default App;

//In the above code, we have a simple  App  component that renders either the  StartScreen  or the  Game  component based on the  gameStarted  state. Initially, the  gameStarted  state is set to  false  and the  StartScreen  component is rendered. When the user clicks on the start button, the  onStart  function is called which sets the  gameStarted  state to  true  and the  Game  component is rendered.
// Now, let’s create the  StartScreen  component.
