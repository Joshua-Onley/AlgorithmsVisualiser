import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import LinearSearchVisualizer from "./components/LinearSearchAnimation"; // Import your visualizer component
import BinarySearchVisualizer from "./components/BinarySearchAnimation";
import "./App.css"


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ListGroup />} />
          <Route path="/linear-search" element={<LinearSearchVisualizer />} />
          <Route path="/binary-search" element={<BinarySearchVisualizer />} /> {/* Add the binary search route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
