import { Link } from "react-router-dom";
import Card from "./Card";
import drenchImage from "../assets/drenchImage.png";
import patternGeneratorImage from "../assets/patternGeneratorImage.png";
import terrainGenerator from "../assets/terrainGenerator.png";
import flipAndFind from "../assets/flipAndFind.png";
import sandSimulatorImage from "../assets/sandSimulatorImage.png";
const Hero = () => {
  return (
    <div className="bg-background1 background-image-1 h-[100vh] ">
      <div className=" flex justify-center">
        <div className="hidden md:block">
          <ul className="flex flex-row mt-[200px] items-center gap-[30px] text-xl text-white mr-14">
            <li>
              <Link to="/drench">
                <Card image={drenchImage}>Drench Game</Card>
              </Link>
            </li>
            <li>
              <Link to="/pattern-generator">
                <Card image={patternGeneratorImage}>Pattern Generator</Card>
              </Link>
            </li>
            <li>
              <Link to="/terrain-generator">
                <Card image={terrainGenerator}>Terrain Generator</Card>
              </Link>
            </li>
            <li>
              <Link to="/flip-find">
                <Card image={flipAndFind}>Flip and find</Card>
              </Link>
            </li>
            <li>
              <Link to="/sand-box">
                <Card image={sandSimulatorImage}>Sandbox</Card>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
