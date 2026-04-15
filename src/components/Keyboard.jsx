const Keyboard = ({ grid, colors }) => {
  const rows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM",
  ];

  const keyColors = {};

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const letter = grid[r][c];
      const color = colors[r][c];

      if (!letter || !color) continue;

      if (color === "green") {
        keyColors[letter] = "green";
      } else if (
        color === "#b59f3b" &&
        keyColors[letter] !== "green"
      ) {
        keyColors[letter] = "#b59f3b";
      } else if (!keyColors[letter]) {
        keyColors[letter] = "#3a3a3c";
      }
    }
  }

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.split("").map((letter) => (
            <div
              key={letter}
              className="key"
              style={{
                backgroundColor: keyColors[letter] || "#d3d6da",
                color: keyColors[letter] ? "white" : "black",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;