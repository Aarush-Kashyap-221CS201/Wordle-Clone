import { useState } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import "./styles/App.css";

function App() {
  const rows = 6;
  const cols = 5;

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const [colors, setColors] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const [gameStatus, setGameStatus] = useState("playing");

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Wordle Clone</h1>

      <Grid
        grid={grid}
        setGrid={setGrid}
        colors={colors}
        setColors={setColors}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />

      <Keyboard grid={grid} colors={colors} />
    </div>
  );
}

export default App;