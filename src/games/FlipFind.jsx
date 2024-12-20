
import { useState,useEffect } from "react";
 
 export default function FlipFind() {

  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [gridMap, setGridMap] = useState([]);
  const [currBoxOpen, setCurrBoxOpen] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currOpenBoxes, setCurrOpenBoxes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSizeExceed, setIsSizeExceed] = useState(false)

  const generateGrid = () => {
    let map =[];
    for(let i=0;i<((gridSize * gridSize) / 2) + 1;i++){
      map.push(0);
    }

    let gridArr = [];
    let gridMapArr = [];
    for(let i=0;i<gridSize;i++){
      let tempArray = [];
      let tempGridArray = [];
      for(let j=0;j<gridSize;j++){
        let randomNumber = generateRandom(1,(gridSize * gridSize) / 2);
        while(map[randomNumber] > 1){
          randomNumber = generateRandom(1,(gridSize * gridSize) / 2);
        }
        map[randomNumber]++;
        tempArray.push(randomNumber);
        tempGridArray.push(false);
      }
      gridArr.push(tempArray);
      gridMapArr.push(tempGridArray);
    }
    setGrid(gridArr);
    setGridMap(gridMapArr);
    setCurrBoxOpen([]);
    setIsProcessing(false);
    setCurrOpenBoxes(0);
    setIsGameOver(false);
  }

  const handleSizeChange = (e) => {
    if(e.target.value < 4 || e.target.value > 6){
        setIsSizeExceed(true);
        return;
    }
    setIsSizeExceed(false);
    setGridSize(e.target.value);
  }


  const handleClick = (row, col) => {
    let tempArray = [...gridMap];
  
    if (currBoxOpen.length === 0) {
      let temp = [row, col];
      
      setCurrBoxOpen([temp]);
      
      tempArray[row][col] = true;
      setGridMap(tempArray);
      return;
    }
  
    let prevRow = currBoxOpen[0][0];
    let prevCol = currBoxOpen[0][1];
    let prev = grid[prevRow][prevCol];
    let curr = grid[row][col];
  
    if (prev === curr) {
      tempArray[row][col] = true;
      setCurrOpenBoxes((prev) => prev + 2);
      console.log(currOpenBoxes);
      if((currOpenBoxes + 2) === (gridSize * gridSize)){
        setIsGameOver(true);
        return;
      }

      setGridMap(tempArray);
      setCurrBoxOpen([]); 
      return;
    }
    
    setIsProcessing(true);
    tempArray[row][col] = true;
    setGridMap(tempArray);
    
    setTimeout(() => {
      let resetArray = [...tempArray]; 
      resetArray[row][col] = false;
      resetArray[prevRow][prevCol] = false;
      setGridMap(resetArray);
      setIsProcessing(false);
    }, 1000);

    setCurrBoxOpen([]);
  };
  

  useEffect(()=>{
    generateGrid();
  },[])

  useEffect(()=>{
    generateGrid();
  },[gridSize])

  

  const generateRandom = (min,max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

    return (
      <main className="w-full  flex items-center p-8 flex-col font-thin">
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-5xl font-bold font-mono max-sm:text-3xl">
            Flip & Find
          </h1>
          <div>
            <label className="text-xl">set the size of the grid : </label>
            <input type="number" defaultValue="4" min="4" max="6" className="border-2 border-black text-center min-w-10" onChange={(e) => handleSizeChange(e)}/>
        </div>
        {
          isSizeExceed && <h1 className="text-red-500">Grid size should be between 4 - 6</h1>
        }
        </div>
        <section className="flex w-fit p-10 mt-4 max-sm:mt-4 h-[76vh] justify-center items-center flex-col gap-3 ">
        <div className={`grid grid-cols-${gridSize} gap-3  bg-blue-500 p-8 max-sm:p-5 `}>
          {isGameOver ? <div className="w-full h-full text-3xl text-white font-bold rounded-lg">Game Won! </div> :grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 text-center justify-center ">
              {row.map((col, colIndex) => (
                <div className="relative">
                <div
                  className={`bg-pink-300 w-16 h-16 absolute ${!gridMap[rowIndex][colIndex] ? "block" : "hidden"} ${gridSize == 6 ? "max-md:w-10 max-md:h-12" : "max-md:w-12 max-md:h-14"} cursor-pointer`}
                  onClick={() => !isProcessing && handleClick(rowIndex, colIndex)}
                ></div>
                
                <p
                  className={`w-16 h-16 flex justify-center items-center bg-slate-300 ${gridSize == 6 ? "max-md:w-10 max-md:h-12" : "max-md:w-12 max-md:h-14"} font-bold`}
                >
                  {col}
                </p>
              </div>
              ))}
            </div>
          ))}
        </div>
        <button className=" bg-black text-white rounded-lg px-6 py-3 text-lg font-bold w-full" onClick={generateGrid}>Reset</button>
        </section>
      </main>
    )
  }