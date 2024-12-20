import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"; // Use Routes and Route
import Drench from "./games/Drench";
import PatternGenrator from "./games/PatternGenerator";
import TerrainGenerator from "./games/TerrainGenerator";
import FlipFind from "./games/FlipFind";
import SandBox from "./games/SandSimulator";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="bg-background1">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/drench" element={<Drench />} />
        <Route path="/Pattern-generator" element={<PatternGenrator />} />
        <Route path="/terrain-generator" element={<TerrainGenerator />} />
        <Route path="/flip-find" element={<FlipFind />} />
        <Route path="/sand-box" element={<SandBox />} />
      </Routes>
    </div>
  );
}
