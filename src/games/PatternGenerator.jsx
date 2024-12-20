import { useState, useEffect, useRef } from "react";
import Tile from "../lib/TileClass";
import image1 from "../assets/pattern-images/1.jpeg";
import image2 from "../assets/pattern-images/2.jpeg";
import image3 from "../assets/pattern-images/3.jpeg";
import image4 from "../assets/pattern-images/4.jpeg";
import image5 from "../assets/pattern-images/5.jpeg";
import image6 from "../assets/pattern-images/6.jpeg";
import image7 from "../assets/pattern-images/7.jpeg";
import image8 from "../assets/pattern-images/8.jpeg";
import image9 from "../assets/pattern-images/9.jpeg";
import image10 from "../assets/pattern-images/10.jpeg";
import image11 from "../assets/pattern-images/11.jpeg";
import image12 from "../assets/pattern-images/12.jpeg";
import image13 from "../assets/pattern-images/13.jpeg";
import image14 from "../assets/pattern-images/14.jpeg";
import image15 from "../assets/pattern-images/15.jpeg";
import image16 from "../assets/pattern-images/16.jpeg";
import image17 from "../assets/pattern-images/17.jpeg";
import image18 from "../assets/pattern-images/18.jpeg";

// ! add image in folder,
// ! import image,
// ! add to the connectors state,
// ! imageArray.push
// ! increment imageCount;

const viewPort = 500;
const imageCount = 18;
const delay = 50;
var myTimeInterval = null;
var end = false;

const PatternGenrator = () => {
  const input = useRef();
  const [grid, setGrid] = useState(25); // ? number of blocks (should divide the viewPort)
  const [imageArray, setImageArray] = useState([]); // ? store the image in order
  // ? array used to store tile objects and used for main processing
  const [gridArray, setGridArray] = useState();
  const [timeInterval, setTimeInterval] = useState(null);
  const [connectors, setConnectors] = useState({
    1: ["aaa", "aaa", "aaa", "aaa"],
    2: ["aba", "aba", "aaa", "aba"],
    3: ["aaa", "aaa", "aba", "aba"],
    4: ["aba", "aaa", "aaa", "aba"],
    5: ["aaa", "aba", "aaa", "aba"],
    6: ["aba", "aaa", "aba", "aba"],
    7: ["aba", "aba", "aba", "aaa"],
    8: ["aaa", "aba", "aba", "aba"],
    9: ["aba", "aaa", "aaa", "aba"],
    10: ["aba", "aba", "aaa", "aaa"],
    11: ["aba", "aaa", "aba", "aaa"],
    12: ["aba", "aba", "aba", "aaa"],
    13: ["aaa", "aba", "aba", "aaa"],
    14: ["aba", "aba", "aba", "aba"],
    15: ["aba", "aaa", "aaa", "aaa"],
    16: ["aaa", "aaa", "aaa", "aba"],
    17: ["aaa", "aaa", "aba", "aaa"],
    18: ["aaa", "aba", "aaa", "aaa"],
  });

  // ? add all the images in array
  useEffect(() => {
    imageArray.push(null);
    imageArray.push(image1);
    imageArray.push(image2);
    imageArray.push(image3);
    imageArray.push(image4);
    imageArray.push(image5);
    imageArray.push(image6);
    imageArray.push(image7);
    imageArray.push(image8);
    imageArray.push(image9);
    imageArray.push(image10);
    imageArray.push(image11);
    imageArray.push(image12);
    imageArray.push(image13);
    imageArray.push(image14);
    imageArray.push(image15);
    imageArray.push(image16);
    imageArray.push(image17);
    imageArray.push(image18);

    setImageArray([...imageArray]);
    setGridArray(createArray());
    window.addEventListener("keypress", handleKeyPress);
  }, []);

  // ? create a 2d array of Tile objects
  const createArray = () => {
    const array = new Array(grid)
      .fill()
      .map(() => new Array(grid).fill(null).map(() => new Tile(imageCount)));

    // ? set the row and col number
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        array[i][j].row = i;
        array[i][j].col = j;
      }
    }
    return array;
  };

  // ? function to collapse a tile and alter the possiblities of adjacent tiles
  const collapse = (row, col, imageNo) => {
    if (imageNo === undefined) {
      console.log("skipping");
      gridArray[row][col].isCollapsed = true;
      return;
    }

    // ? collapse the tile
    if (gridArray !== undefined) {
      gridArray[row][col].image = imageArray[imageNo];
      gridArray[row][col].isCollapsed = true;
      gridArray[row][col].imageNumber = imageNo;

      // ? see nearby tiles and reduce the possibilities based on connectors

      // ? see up
      if (row > 0 && !gridArray[row - 1][col].isCollapsed) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row - 1][col].possibilities[i] === 1) {
            // ? if possibility exists
            if (notEqual(connectors[i][2], connectors[imageNo][0])) {
              // ? if connectors don't match remove
              gridArray[row - 1][col].possibilities[i] = 0;
              gridArray[row - 1][col].possibilities[0] -= 1;
            }
          }
        }
      }

      // ? see right
      if (col < grid - 1) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row][col + 1].possibilities[i] === 1) {
            if (notEqual(connectors[i][3], connectors[imageNo][1])) {
              gridArray[row][col + 1].possibilities[i] = 0;
              gridArray[row][col + 1].possibilities[0] -= 1;
            }
          }
        }
      }

      // ? see down
      if (row < grid - 1) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row + 1][col].possibilities[i] === 1) {
            if (notEqual(connectors[i][0], connectors[imageNo][2])) {
              gridArray[row + 1][col].possibilities[i] = 0;
              gridArray[row + 1][col].possibilities[0] -= 1;
            }
          }
        }
      }

      // ? see left
      if (col > 0) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row][col - 1].possibilities[i] === 1) {
            if (notEqual(connectors[i][1], connectors[imageNo][3])) {
              gridArray[row][col - 1].possibilities[i] = 0;
              gridArray[row][col - 1].possibilities[0] -= 1;
            }
          }
        }
      }

      setGridArray([...gridArray]);
    } else console.log("undifined");
  };

  const notEqual = (str1, str2) => {
    str2 = str2.split("").reverse().join(""); // ? reverse and compare the connectors
    if (str1 === str2) return false;
    else return true;
  };

  // ? search and collapse
  const startCollapse = () => {
    if (gridArray !== undefined) {
      // ? create a 1d array and filter out only the uncollapsed tiles
      let newArray1 = gridArray.flat();
      let newArray = newArray1.filter((item) => !item.isCollapsed);
      if (newArray === undefined) return;
      // ? sort the array based on the possiblities
      newArray.sort((a, b) => a.possibilities[0] - b.possibilities[0]);

      // ? end of the program
      if (newArray.length === 0) {
        end = true;
        return;
      }
      let tempNum = newArray[0].possibilities[0];
      if (tempNum === 0) {
        gridArray[newArray[0].row][newArray[0].col].isCollapsed = true;
        return;
      }

      // ? randomly choose a tile
      let randNo = 0;
      let i = 0;
      if (tempNum === imageCount) {
        // ? choose one tile from the entire grid
        randNo = Math.floor(Math.random() * newArray.length);
      } else {
        // ? choose a tile from only the tile which connects one of the previous tile
        for (i = 0; i < newArray.length; i++) {
          if (newArray[i].possibilities[0] >= imageCount) break;
        }
        randNo = Math.floor(Math.random() * i);
      }

      let tempPossibilities = new Array();
      for (let j = 1; j <= imageCount; j++) {
        if (newArray[randNo].possibilities[j] === 1) {
          tempPossibilities.push(j);
        }
      }
      if (tempPossibilities == []) {
        console.log("no possiblities to choose from");
        return;
      }
      let randPossibility = Math.floor(
        Math.random() * Math.min(newArray[randNo].possibilities[0], 18)
      );
      let collapseChoice = tempPossibilities[randPossibility];
      // !     console.log("collapsing to choice " + collapseChoice);
      collapse(newArray[randNo].row, newArray[randNo].col, collapseChoice);
    } else console.log(undefined);
  };

  const reset = () => {
    if (timeInterval) {
      clearInterval(myTimeInterval);
      myTimeInterval = null;
      //setTimeInterval(null);
    }
    setGridArray(createArray());
    end = false;
  };

  const restart = () => {
    if (myTimeInterval) {
      clearInterval(myTimeInterval);
      myTimeInterval = null;
      //setTimeInterval(null);
    }

    setGridArray(createArray());
    end = false;

    const time = setInterval(() => {
      if (end) clearInterval(time);
      input.current.click();
    }, delay);
    myTimeInterval = time;
    //setTimeInterval(time);
    return;
  };

  const start = () => {
    const time = setInterval(() => {
      if (end) clearInterval(time);
      input.current.click();
    }, delay);
    myTimeInterval = time;
    //setTimeInterval(time);
  };

  const pause = () => {
    if (myTimeInterval) {
      clearInterval(myTimeInterval);
      //console.log("reset");
      myTimeInterval = null;
      //setTimeInterval(null);
    }
  };

  const handleKeyPress = (e) => {
    //console.log(e.key);
    if (e.key === "r") {
      restart();
      return;
    }
    if (e.key === "s") {
      start();
      return;
    }
    if (e.key === "p") {
      pause();
      return;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center min-h-[92vh]">
        <div
          ref={input}
          className={`h-[${viewPort}px] w-[${viewPort}px] `}
          onClick={() => startCollapse()}
        >
          {gridArray?.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex w-full bg-black-400`}
              style={{ height: `${viewPort / grid}px` }}
            >
              {row.map((tile, colIndex) => (
                <div
                  key={colIndex}
                  className={`h-full bg-black text-[8px] text-center text-white`}
                  style={{ width: `${viewPort / grid}px` }}
                >
                  {tile.image !== null ? (
                    <img
                      src={tile.image}
                      alt={`Tile ${rowIndex}-${colIndex}`}
                      className="h-full w-full object-cover "
                    />
                  ) : // tile.possibilities[0]
                  null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mx-2">
          <input
            className="px-5 py-2 bg-red-400"
            type="button"
            value={"restart"}
            onClick={restart}
          />
          <input
            className="px-5 py-2 bg-green-400"
            type="button"
            value={"start"}
            onClick={start}
          />
          <input
            className="px-5 py-2 bg-yellow-400"
            type="button"
            value={"pause"}
            onClick={pause}
          />
          {/* <select
            name="grid-size"
            onChange={(e) => {
              setGrid(e.target.value);
              reset();
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select> */}
        </div>
      </div>
    </>
  );
};
// #8fd82f

export default PatternGenrator;