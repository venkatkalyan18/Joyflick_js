
import React, { useEffect, useRef, useState } from "react";
import DialogBox from "../components/DialogBox.jsx";




const Drench = () => {
  const [noofMoves, setNoOfMoves] = useState(30);
  const rows = 14;
  const cols = 14;

  const [array, setArray] = useState([]);
  const [isVisited, setIsVisited] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [drenchInfo, setDrenchInfo] = useState(null);
  const [isOpen2, setIsOpen2] = useState(null);
  const [recordMoves, setRecordMovers] = useState(null);

  const gameOverAudio = new Audio("/273569-Game-over2.wav");
  const gameWonAudio = new Audio(
    "/403300-Fast_Orchestral_WIN_Celebration_or_Reveal_Sting_02_003878_.wav"
  );

  const getRandomNumbers = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  // const getDenchInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://drench-n0ssh9k1a-venkats-projects-1c72d502.vercel.app"
  //     );
  //     setDrenchInfo(response.data[0]);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const incrementDrenchCount = async () => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/v1/incDrenchCount`);
  //     setDrenchInfo(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getDenchInfo();
  // }, []);

  const fillRandomNumbersInArray = () => {
    const tempArray = [];
    const isVisitedTempArray = [];
    for (let i = 0; i < rows; i++) {
      tempArray[i] = [];
      isVisitedTempArray[i] = [];
      for (let j = 0; j < cols; j++) {
        tempArray[i][j] = getRandomNumbers();
        isVisitedTempArray[i][j] = 0;
      }
    }
    isVisitedTempArray[0][0] = 1;
    setArray(tempArray);
    setIsVisited(isVisitedTempArray);
  };

  const handleChangedfs = (colorChoosed) => {
    const audio = new Audio("/mixkit-modern-technology-select-3124.wav");
    audio.play();
    let visitedArray = [...isVisited];
    let boardArray = [...array];
    let queue = [];
    let directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];

    let isVisitedArray = [];
    for (let i = 0; i < 14; i++) {
      isVisitedArray[i] = [];
      for (let j = 0; j < 14; j++) {
        isVisitedArray[i][j] = 0;
      }
    }

    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        if (visitedArray[i][j] === 1) {
          boardArray[i][j] = colorChoosed;
        }
      }
    }

    helper(visitedArray, boardArray, isVisitedArray, 0, 0, colorChoosed);
    if (isWin(boardArray, colorChoosed)) {
      setGameWon(true);
      gameWonAudio.play();
    }
    setIsVisited(visitedArray);
    setArray(boardArray);
    setNoOfMoves((prev) => prev - 1);
  };

  useEffect(() => {
    if (noofMoves == 0 && !gameWon) {
      gameOverAudio.play();
    }
  }, [noofMoves]);

  useEffect(() => {
    if (!gameWon) {
      return;
    }
    // if (drenchInfo.leastMovesTaken > 30 - noofMoves) {
    //   setRecordMovers(30 - noofMoves);
    //   setIsOpen2(true);
    // }
    // incrementDrenchCount();
  }, [gameWon]);

  const isWin = (boardArray, colorChoosed) => {
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        if (boardArray[i][j] != colorChoosed) {
          return false;
        }
      }
    }
    return true;
  };

  const helper = (
    visitedArray,
    boardArray,
    isVisitedArray,
    row,
    col,
    colorChoosed
  ) => {
    isVisitedArray[row][col] = 1;
    visitedArray[row][col] = 1;
    let directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];
    for (let direction = 0; direction < directions.length; direction++) {
      let r = row + directions[direction][0];
      let c = col + directions[direction][1];
      if (
        r >= 0 &&
        c >= 0 &&
        r < 14 &&
        c < 14 &&
        isVisitedArray[r][c] === 0 &&
        boardArray[r][c] === colorChoosed
      ) {
        helper(visitedArray, boardArray, isVisitedArray, r, c, colorChoosed);
      }
    }
  };

  const reset = () => {
    gameOverAudio.pause();
    gameWonAudio.pause();
    fillRandomNumbersInArray();
    setGameWon(false);
    setNoOfMoves(30);
  };

  useEffect(() => {
    gameOverAudio.pause();
    gameWonAudio.pause();
    fillRandomNumbersInArray();
  }, []);

  return (
    <section className="min-h-[92vh] min-screen flex justify-center items-center overflow-x-hidden bg-gray-200 p-2">
      <div className="flex justify-center items-center gap-4  max-md:flex-col">
        <div className="grid  grid-rows-14 grid-cols-14 w-fit shadow-2xl relative">
          {gameWon ? (
            <div
              className="w-[350px] h-[350px] max-sm:w-[300px] max-sm:h-[300px] bg-orange-600 absolute bottom-5 right-5 text-center flex flex-col gap-4 justify-center items-center cursor-pointer"
              onClick={() => reset()}
            >
              <h1 className="text-6xl text-white font-bold">
                Game <br /> Won
              </h1>
              <p className="text-xl text-white font-bold">
                Click this box <br /> to try again!
              </p>
            </div>
          ) : noofMoves <= 0 ? (
            <div
              className="w-[350px] h-[350px] max-sm:w-[300px] max-sm:h-[300px] bg-orange-600 absolute bottom-5 right-5 text-center flex flex-col gap-4 justify-center items-center cursor-pointer"
              onClick={() => reset()}
            >
              <h1 className="text-6xl text-white font-bold">
                Game <br /> Over
              </h1>
              <p className="text-xl text-white font-bold">
                Click this box <br /> to try again!
              </p>
            </div>
          ) : (
            <></>
          )}
          {array.map((numsArray, rowIndex) =>
            numsArray.map((nums, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-7 h-7  max-sm:w-6 max-sm:h-6 ${
                  nums === 1
                    ? "bg-green-600"
                    : nums === 2
                    ? "bg-pink-600"
                    : nums === 3
                    ? "bg-violet-600"
                    : nums === 4
                    ? "bg-green-200"
                    : nums === 5
                    ? "bg-red-600"
                    : "bg-yellow-400"
                }   `}
              ></div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-4 p-5 h-full bg-black bg-opacity-20 shadow-2xl w-[300px] max-sm:w-[280px]">
          {/* <div className="flex flex-col gap-1 w-full max-sm:text-sm">
            <div className="flex gap-1">
              <p className="">
                Least moves
                <span className="font-bold">
                  ({drenchInfo?.leastMovesTaken})
                </span>{" "}
                taken by
              </p>
              <div className=" relative">
                <Image
                  src={crownImage}
                  width={20}
                  className=" absolute bottom-4 -left-1 animate-bounce"
                />
                <span className=" font-bold">
                  {drenchInfo?.leastMovesTakenBy}
                </span>
              </div>
            </div>
            <p className="text-md max-sm:text-sm shadow-2xl">
              Total Number of Drenches:{" "}
              <span className="font-bold">{drenchInfo?.drenchCount}</span>
            </p>
          </div> */}
          <div className="flex gap-5 ml-4 max-sm:gap-4">
            <div className="text-6xl max-sm:text-5xl  bg-black text-white p-4  min-w-20 text-center min-h-20">
              {noofMoves}
            </div>
            <p className="text-xl max-sm:text-lg font-bold">
              Moves to <br /> Drench the <br />
              board
            </p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-4 ml-7 max-sm:ml-4">
            <div
              className={`bg-green-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(1)}
            ></div>
            <div
              className={`bg-pink-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(2)}
            ></div>
            <div
              className={`bg-violet-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(3)}
            ></div>
            <div
              className={`bg-green-200 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(4)}
            ></div>
            <div
              className={`bg-red-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(5)}
            ></div>
            <div
              className={`bg-yellow-400 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(6)}
            ></div>
          </div>
          <button
            className="px-4 py-2 bg-yellow-600 w-36 ml-14 font-bold hover:bg-yellow-500 transition-all duration-75 text-xl max-sm:ml-11"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </div>
      {true && (
        <DialogBox
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          className="hidden invisible bg-white"
        />
      )}
    </section>
  );
};

export default  Drench ;