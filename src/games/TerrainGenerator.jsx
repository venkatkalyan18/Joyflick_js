import { useEffect, useState, useRef } from "react";
import Block from "../lib/Block";
import image1 from "../assets/terrain-images/1.png";
import image2 from "../assets/terrain-images/2.png";
import image3 from "../assets/terrain-images/3.png";
import image4 from "../assets/terrain-images/4.png";

// * tree 1
// * grass 2
// * sand 3
// * water 4

const probabilities = [0.25, 0.25, 0.25, 0.25];
const grid = 40;
const viewPort = 500;
const images = 4;
const delay = 0;
var radius = 5;
var strictness = 5;
var end = false;
var timeInterval = null;

const TerrainGenerator = () => {
  // const [probabilities, setProbabilities] = useState([0.25, 0.25, 0.25, 0.25]);
  const [gridArray, setGridArray] = useState();
  const [imageArray, setImageArray] = useState();
  const inputRef = useRef();
  const formInputRefs = useRef(new Array(6));

  useEffect(() => {
    // let a = new Block(probabilities);
    // console.log(a.probabilities);

    const tempImageArray = new Array(1).fill(images);
    tempImageArray.push(image1);
    tempImageArray.push(image2);
    tempImageArray.push(image3);
    tempImageArray.push(image4);
    setImageArray(tempImageArray);
    //console.log(tempImageArray);

    setGridArray(createGridArray(grid));
    //console.log(gridArray);
    window.addEventListener("keypress", handleKeyPress);
    verifyForm();
    //createMyInterval();
  }, []);

  const createMyInterval = () => {
    const time = setInterval(() => {
      if (end) clearInterval(time);
      inputRef.current.click();
    }, delay);
    timeInterval = time;
  };

  //   useEffect(() => {
  //     console.log(gridArray);
  //   }, [gridArray]);

  const handleKeyPress = (e) => {
    //console.log(e);
    if (e.key == "c") {
      // do a step
      inputRef.current.click();
    }
  };

  const createGridArray = (num) => {
    const array = new Array(num)
      .fill()
      .map(() => new Array(num).fill(null).map(() => new Block(probabilities)));
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        array[i][j].row = i;
        array[i][j].col = j;
      }
    }
    return array;
  };

  const collapseBlock = (block, imageNo) => {
    //console.log(block);

    block.collapsed = true;
    block.image = imageArray[imageNo];
    let startRow = Math.max(block.row - radius, 0);
    let endRow = Math.min(block.row + radius, grid - 1);
    let startCol = Math.max(block.col - radius, 0);
    let endCol = Math.min(block.col + radius, grid - 1);

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        if (gridArray[i][j].collapsed) continue;
        reduceProbability(gridArray[i][j], imageNo);
      }
    }

    // console.log("start row: " + startRow);
    // console.log("end row: " + endRow);
    // console.log("start col: " + startCol);
    // console.log("end col: " + endCol);

    // if (block.row > 0) {
    //   reduceProbability(gridArray[block.row - 1][block.col], imageNo);
    // }
    // if (block.row < grid - 1) {
    //   reduceProbability(gridArray[block.row + 1][block.col], imageNo);
    // }
    // if (block.col > 0) {
    //   reduceProbability(gridArray[block.row][block.col - 1], imageNo);
    // }
    // if (block.col < grid - 1) {
    //   reduceProbability(gridArray[block.row][block.col + 1], imageNo);
    // }

    setGridArray([...gridArray]);
  };

  const reduceProbability = (block, imageNo) => {
    let rem = 0;
    // let strictness = 5;
    let temp = 0;
    switch (imageNo) {
      case 1:
        rem = 0;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[1] += rem;
        //console.log(block.probabilities[1]);
        break;
      case 2:
        rem = 0;
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[2] += rem;
        //console.log(block.probabilities[2]);
        break;
      case 3:
        rem = 0;
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[3] += rem;
        //console.log(block.probabilities[3]);

        // rem += block.probabilities[1] / reducingFactor;
        // block.probabilities[1] -= block.probabilities[1] / reducingFactor;
        // rem += block.probabilities[3] / reducingFactor;
        // block.probabilities[3] -= block.probabilities[3] / reducingFactor;
        // block.probabilities[2] += rem / 3;
        // block.probabilities[3] += rem / 3;
        // block.probabilities[4] += rem / 3;
        break;
      case 4:
        rem = 0;
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        block.probabilities[4] += rem;
        //console.log(block.probabilities[4]);
        break;
    }
    if (rem >= 1) {
      console.log(rem, imageNo);
    }
  };

  const linearSearch = (probArray, num) => {
    let index = 0;
    while (index < probArray.length - 1) {
      if (probArray[index] >= num) break;
      index++;
    }
    // console.log(index);
    return index;
  };

  const binarySearch = (probArray, num) => {
    let left = 0,
      right = probArray.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (num > probArray[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    // console.log("left = " + left);
    return left;
  };

  const startCollapse = () => {
    if (gridArray) {
      let flatArray = gridArray.flat().filter((block) => !block.collapsed);
      if (flatArray.length == 0) {
        console.log("end");
        end = true;
        return;
      }
      let randNo = Math.floor(Math.random() * flatArray.length);
      // console.log(randNo);

      let block = flatArray[randNo];
      // console.log(block.probabilities);
      let probabilitiesSumArray = [];
      let sum = 0;
      for (let i = 1; i < block.probabilities.length; i++) {
        sum += block.probabilities[i];
        probabilitiesSumArray.push(sum);
      }
      // console.log(probabilitiesSumArray);
      randNo = Math.random();
      // console.log(randNo);
      let imageNo = linearSearch(probabilitiesSumArray, randNo) + 1;

      collapseBlock(block, imageNo);

      //console.log(flatArray);
    }
  };

  const restartGenerator = () => {
    if (!verifyForm()) {
      console.log("invalid probabilities.");
      return;
    }
    setGridArray(createGridArray(grid));
    clearInterval(timeInterval);
    end = false;
    createMyInterval();
  };

  const verifyForm = () => {
    let sum = 0.0;
    for (let i = 0; i < 4; i++) {
      sum += parseFloat(formInputRefs.current[i].value);
    }
    let lastProbability = parseFloat(formInputRefs.current[3].value);
    if (sum !== 1) {
      lastProbability = 1 - sum + parseFloat(formInputRefs.current[3].value);
    }
    if (lastProbability >= 0) {
      formInputRefs.current[3].value = lastProbability;
    } else {
      return false;
    }
    if (parseInt(formInputRefs.current[4].value) < 1) {
      formInputRefs.current[4].value = 1;
    } else {
      formInputRefs.current[4].value = parseInt(formInputRefs.current[4].value);
    }
    if (parseInt(formInputRefs.current[5].value) < 1) {
      formInputRefs.current[5].value = 1;
    } else {
      formInputRefs.current[5].value = parseInt(formInputRefs.current[5].value);
    }
    useFormValues();
    return true;
  };

  const useFormValues = () => {
    // let tempProbabilityArray = [];
    // for (let i = 0; i < 4; i++) {
    //   tempProbabilityArray.push(parseFloat(formInputRefs.current[i].value));
    // }
    // setProbabilities(tempProbabilityArray);
    for (let i = 0; i < 4; i++) {
      probabilities[i] = parseFloat(formInputRefs.current[i].value);
    }
    //console.log(probabilities);
    strictness = parseInt(formInputRefs.current[4].value);
    radius = parseInt(formInputRefs.current[5].value);
  };

  const startGenerator = () => {
    if (timeInterval == null) {
      createMyInterval();
    }
  };

  const stopGenerator = () => {
    clearInterval(timeInterval);
    timeInterval = null;
  };

  return (
    <div className="flex flex-col  gap-6 justify-center max-lg:flex-col max-lg:content-center bg-background1 p-6 rounded-xl shadow-lg">
      <div className="flex flex-row m-4 gap-6 justify-center max-lg:flex-col max-lg:content-center bg-gray-800 p-6 rounded-xl ">
        {/* Grid Container */}
        <div
          className={`h-[${viewPort}px] w-[${viewPort}px] lg:mr-6 max-lg:m-auto cursor-pointer border-2 border-gray-700 rounded-lg shadow-inner bg-gray-900`}
          ref={inputRef}
          onClick={startCollapse}
        >
          {gridArray?.map((row, rowNum) => (
            <div
              className={`flex w-full`}
              style={{ height: `${viewPort / grid}px` }}
              key={rowNum}
            >
              {row?.map((block, colNum) => (
                <div
                  className="flex items-center justify-center bg-black  text-white"
                  style={{
                    height: `${viewPort / grid}px`,
                    width: `${viewPort / grid}px`,
                  }}
                  key={colNum}
                >
                  {block.image ? (
                    <img
                      className="max-h-full max-w-full object-contain"
                      src={block.image}
                      alt=""
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="max-lg:justify-center mt-4 w-full max-w-lg bg-gray-900 p-6 rounded-xl shadow-lg">
          <div className="py-4 text-white w-full text-xl text-center">
            Adjust the Parameters:
          </div>

          {/* Probability Inputs */}
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex flex-row gap-4">
              {[
                { label: "Tree", src: image1, refIndex: 0, defaultValue: 0.25 },
                {
                  label: "Grass",
                  src: image2,
                  refIndex: 1,
                  defaultValue: 0.25,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex w-[50%] pl-[50px]  items-center gap-3"
                >
                  <img
                    className="w-12 h-12"
                    src={item.src}
                    alt={`${item.label} Icon`}
                  />
                  <input
                    name={`${item.label.toLowerCase()}-probability`}
                    className="px-3 py-2 ml-[15px] w-20 border-none outline-none rounded-lg bg-purple-200 text-center"
                    type="text"
                    ref={(el) => (formInputRefs.current[item.refIndex] = el)}
                    defaultValue={item.defaultValue}
                  />
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-row gap-4">
              {[
                { label: "Sand", src: image3, refIndex: 2, defaultValue: 0.25 },
                {
                  label: "Water",
                  src: image4,
                  refIndex: 3,
                  defaultValue: 0.25,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex w-[50%] pl-[50px] items-center gap-3"
                >
                  <img
                    className="w-12 h-12"
                    src={item.src}
                    alt={`${item.label} Icon`}
                  />
                  <input
                    name={`${item.label.toLowerCase()}-probability`}
                    className="px-3 py-2 ml-[15px] w-20 border-none outline-none rounded-lg bg-purple-200 text-center"
                    type="text"
                    ref={(el) => (formInputRefs.current[item.refIndex] = el)}
                    defaultValue={item.defaultValue}
                  />
                </div>
              ))}
            </div>

            {/* Strictness and Radius */}
            <div className="flex flex-row gap-4">
              {[
                { label: "Strictness", refIndex: 4, defaultValue: 5 },
                { label: "Radius", refIndex: 5, defaultValue: 5 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex w-[50%] justify-center items-center gap-3"
                >
                  <label
                    htmlFor={item.label.toLowerCase()}
                    className="text-white w-24 text-right"
                  >
                    {item.label}:
                  </label>
                  <input
                    name={item.label.toLowerCase()}
                    className="px-3 py-2 w-20 border-none outline-none rounded-[20px] bg-purple-200 text-center"
                    type="text"
                    ref={(el) => (formInputRefs.current[item.refIndex] = el)}
                    defaultValue={item.defaultValue}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-row gap-4">
              <input
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium  rounded-[20px] px-6 py-2 shadow-md hover:shadow-lg hover:from-green-500 hover:to-green-700 focus:outline-none "
                type="button"
                value={"Start"}
                onClick={() => startGenerator()}
              />

              <input
                className="w-full bg-yellow-400 text-gray-900 font-medium  border border-yellow-500 rounded-[20px] px-6 py-2 shadow-md hover:shadow-lg hover:bg-yellow-500 focus:outline-none  "
                type="button"
                value={"Stop"}
                onClick={() => stopGenerator()}
              />
            </div>
            <input
              className="w-full bg-gradient-to-r rounded-[20px] from-red-500 to-red-700 text-white font-medium  border border-red-700  px-6 py-2 shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-800"
              type="button"
              value={"Restart"}
              onClick={() => restartGenerator()}
            />
          </div>
        </div>
      </div>
      <div className="w-auto h-auto px-[60px] py-[40px] mx-[60px] bg-gray-900 text-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Input Parameters Description
        </h2>
        <ul className="space-y-4">
          <li>
            <strong>Tree Probability:</strong>
            <span className="ml-2 text-gray-200">
              This parameter controls the likelihood of generating trees in the
              grid. Enter a value between 0 and 1.
            </span>
          </li>
          <li>
            <strong>Grass Probability:</strong>
            <span className="ml-2 text-gray-200">
              Determines the probability of grass generation. Accepts values
              between 0 and 1.
            </span>
          </li>
          <li>
            <strong>Sand Probability:</strong>
            <span className="ml-2 text-gray-200">
              Sets the probability of sand tiles appearing in the grid. Provide
              a decimal value between 0 and 1.
            </span>
          </li>
          <li>
            <strong>Water Probability:</strong>
            <span className="ml-2 text-gray-200">
              Specifies how likely water tiles will be created. Enter a value
              ranging from 0 to 1.
            </span>
          </li>
          <li>
            <strong>Strictness:</strong>
            <span className="ml-2 text-gray-200">
              Controls the rigor of the collapse process. 1 for maximum
              strictness, 2 for half and so on.
            </span>
          </li>
          <li>
            <strong>Radius:</strong>
            <span className="ml-2 text-gray-200">
              Defines the area of effect around a point during collapse. Higher
              values expand the radius.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default TerrainGenerator;
