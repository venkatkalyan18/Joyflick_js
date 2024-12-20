import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route
import Drench from "./games/Drench";
import PatternGenrator from "./games/PatternGenerator";
import FlipFind from "./games/FlipFind"; 

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes> {/* Wrap the routes inside Routes component */}
        <Route path="/drench" element={<Drench />} />
        <Route path="/Pattern-genrator" element={<PatternGenrator/>}/>
        <Route path="/flip-find" element={<FlipFind/>}/>
      </Routes>
    </div>
  );
}
