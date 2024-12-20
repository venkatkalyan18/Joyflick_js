import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route
import Drench from "./games/Drench";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes> {/* Wrap the routes inside Routes component */}
        <Route path="/drench" element={<Drench />} />
      </Routes>
    </div>
  );
}
