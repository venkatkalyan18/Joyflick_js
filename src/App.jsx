import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"; // Use Routes and Route
import Drench from "./games/Drench";
import PatternGenrator from "./games/PatternGenerator";
import TerrainGenerator from "./games/TerrainGenerator";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {" "}
        {/* Wrap the routes inside Routes component */}
        <Route path="/drench" element={<Drench />} />
        <Route path="/Pattern-generator" element={<PatternGenrator />} />
        <Route path="/terrain-generator" element={<TerrainGenerator />} />
      </Routes>
    </div>
  );
}
