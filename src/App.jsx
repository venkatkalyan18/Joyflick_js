import Navbar from "./components/Navbar";
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route
import Drench from "./games/Drench";
=======
import PatternGenrator from "./games/PatternGenerator";
>>>>>>> 48931816a1090cafb6a3959950f1a95d539438ce

export default function App() {
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
      <Routes> {/* Wrap the routes inside Routes component */}
        <Route path="/drench" element={<Drench />} />
      </Routes>
=======
>>>>>>> 48931816a1090cafb6a3959950f1a95d539438ce
    </div>
  );
}
