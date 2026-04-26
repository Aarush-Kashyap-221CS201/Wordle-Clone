import WORDS from "../../wordleWords";
import { useEffect, useState } from "react";

const SECRET_WORD = WORDS[Math.floor(Math.random() * WORDS.length)]; // 👈 constant for now

const Grid = ({
  grid,
  setGrid,
  colors,
  setColors,
  gameStatus,
  setGameStatus,
}) => {
  const rows = 6;
  const cols = 5;

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== "playing") return;
      const key = e.key;

      // Letter input
      if (/^[a-zA-Z]$/.test(key)) {
        if (currentCol < cols && currentRow < rows) {
          const newGrid = [...grid];
          newGrid[currentRow][currentCol] = key.toUpperCase();
          setGrid(newGrid);
          setCurrentCol(currentCol + 1);
        }
      }

      // Backspace
      if (key === "Backspace") {
        if (currentCol > 0) {
          const newGrid = [...grid];
          newGrid[currentRow][currentCol - 1] = "";
          setGrid(newGrid);
          setCurrentCol(currentCol - 1);
        }
      }

      // Enter → go to next row
      if (key === "Enter") {
        if (currentCol === cols) {
          const guess = grid[currentRow];
          const secret = SECRET_WORD.split("");

          const newColors = [...colors];
          const rowColors = Array(cols).fill("gray");

          const secretCopy = [...secret];

          // ✅ Step 1: Mark greens first
          for (let i = 0; i < cols; i++) {
            if (guess[i] === secret[i]) {
              rowColors[i] = "green";
              secretCopy[i] = null; // remove used letter
            }
          }

          // ✅ Step 2: Mark yellows
          for (let i = 0; i < cols; i++) {
            if (rowColors[i] === "green") continue;

            const index = secretCopy.indexOf(guess[i]);
            if (index !== -1) {
              rowColors[i] = "#b59f3b"; // dark yellow
              secretCopy[index] = null;
            }
          }

          newColors[currentRow] = rowColors;
          setColors(newColors);

          // Trigger flip animation for each tile in the row
          const row = currentRow;
          for (let i = 0; i < cols; i++) {
            setTimeout(() => {
              const cell = document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${i + 1})`);
              if (cell) {
                cell.classList.add("flip", `flip-delay-${i}`);
              }
            }, i * 100);
          }

          // ✅ Win check
          if (guess.join("") === SECRET_WORD) {
            setGameStatus("won");
            return;
          }

          // ✅ Lose check
          if (currentRow === rows - 1) {
            setGameStatus("lost");
            return;
          }

          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, currentRow, currentCol, gameStatus]);

  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${colors[rowIndex][colIndex] && colors[rowIndex][colIndex] !== "" ? "flip" : ""}`}
                style={{
                  backgroundColor:
                    colors[rowIndex][colIndex] || "transparent",
                  color: colors[rowIndex][colIndex] ? "white" : "black",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameStatus !== "playing" && gameStatus !== "closed" && (
        <div className="popup-overlay">
          <div className="popup">
            <button
              className="close-btn"
              onClick={() => setGameStatus("closed")}
            >
              ✖
            </button>

            <h2>
              {gameStatus === "won"
                ? "🎉 You Won!"
                : `😢 You Lost! Word was ${SECRET_WORD}`}
            </h2>

            <button
              className="ok-btn"
              onClick={() => window.location.reload()}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;