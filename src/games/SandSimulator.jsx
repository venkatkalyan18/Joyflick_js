import { useState, useEffect } from "react";

const SandBox = () => {
  const [sandArray, setSandArray] = useState([]);
  const [pixels, setPixels] = useState(60); // ! set the number of pixels in the box
  const [viewPort, setViewPort] = useState(400); // ! set the size of the viewport
  const [isDragging, setIsDragging] = useState(false); // To track mouse dragging
  const [time, setTime] = useState(1); // ! set the delay between each computation
  const [colors, setColors] = useState({
    1: "bg-violet-500",
    2: "bg-indigo-500",
    3: "bg-blue-500",
    4: "bg-green-500",
    5: "bg-yellow-500",
    6: "bg-orange-500",
    7: "bg-red-500",
  });
  const [color, setColor] = useState(0);

  useEffect(() => {
    let array = new Array(pixels).fill().map(() => new Array(pixels).fill(0));
    setSandArray(array);
  }, [pixels]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSandBox();
    }, time);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [sandArray]);

  const updateSandBox = () => {
    let newArray = sandArray.map((row) => row.slice()); // Clone the current array

    for (let i = pixels - 2; i >= 0; i--) {
      // Start from the second last row
      for (let j = 0; j < pixels; j++) {
        if (sandArray[i][j] !== 0) {
          if (sandArray[i + 1][j] === 0) {
            newArray[i + 1][j] = newArray[i][j];
            newArray[i][j] = 0;
          } else {
            // randomly choose whether to drop left or right
            let randomNo = Math.floor(Math.random() * 2);

            // drop left
            if (randomNo === 0) {
              if (j > 0 && sandArray[i + 1][j - 1] === 0) {
                newArray[i + 1][j - 1] = newArray[i][j];
                newArray[i][j] = 0;
              } else if (j < pixels - 1 && sandArray[i + 1][j + 1] === 0) {
                newArray[i + 1][j + 1] = newArray[i][j];
                newArray[i][j] = 0;
              }
            } else {
              // drop right
              if (j < pixels - 1 && sandArray[i + 1][j + 1] === 0) {
                newArray[i + 1][j + 1] = newArray[i][j];
                newArray[i][j] = 0;
              } else if (j > 0 && sandArray[i + 1][j - 1] === 0) {
                newArray[i + 1][j - 1] = newArray[i][j];
                newArray[i][j] = 0;
              }
            }
          }
        }
      }
    }

    setSandArray(newArray);
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDragging(true); // Start dragging
    addSand(rowIndex, colIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isDragging) {
      addSand(rowIndex, colIndex); // Add sand when dragging
    }
  };

  const addSand = (rowIndex, colIndex) => {
    if (sandArray[rowIndex][colIndex] !== 0) return;
    let newArray = sandArray.map((row) => row.slice());

    // randomly add color
    if (color === "0") {
      newArray[rowIndex][colIndex] = Math.floor(Math.random() * 7) + 1;
    } else {
      newArray[rowIndex][colIndex] = color; // add color based on the input color
    }
    setSandArray(newArray);
  };

  const handleColorChange = (e) => {
    setColor(e.target.id);
  };

  return (
    <div className="flex flex-col items-center bg-background1 min-h-screen py-6">
      {/* Sand Canvas */}
      <div
        className="bg-black rounded-md shadow-lg"
        style={{
          width: `${viewPort}px`,
          height: `${viewPort}px`,
        }}
        onMouseUp={handleMouseUp}
      >
        {sandArray.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex"
            style={{ height: `${viewPort / pixels}px` }}
          >
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                className={cell !== 0 ? colors[cell] : "bg-black"}
                style={{
                  width: `${viewPort / pixels}px`,
                  height: `${viewPort / pixels}px`,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Color Palette */}
      <div className="flex flex-row justify-center mt-4 px-4 py-4 gap-4 bg-gray-800 rounded-md shadow-md">
        <div
          id="1"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[1]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="2"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[2]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="3"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[3]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="4"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[4]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="5"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[5]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="6"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[6]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="7"
          className={`h-10 w-10 rounded cursor-pointer border-2 border-transparent hover:border-white ${colors[7]}`}
          onClick={handleColorChange}
        ></div>
        <div
          id="0"
          className="h-10 w-fit px-3 bg-white text-black font-semibold text-sm flex items-center justify-center rounded cursor-pointer shadow-md hover:bg-gray-200"
          onClick={handleColorChange}
        >
          Random
        </div>
      </div>
    </div>
  );
};

export default SandBox;
