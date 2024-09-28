import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import LinearSearchVisualizer from "./components/LinearSearchAnimation"; // Import your visualizer component
import BinarySearchVisualizer from "./components/BinarySearchAnimation";
import InterpolationSearchVisualizer from "./components/InterpolationSearchAnimation";
import ExponentialSearchVisualizer from "./components/ExponentialSearchAnimation";
import "./App.css"


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ListGroup />} />
          <Route path="/linear-search" element={<LinearSearchVisualizer />} />
          <Route path="/binary-search" element={<BinarySearchVisualizer />} />
          <Route path="/interpolation-search" element={<InterpolationSearchVisualizer />} /> {/* Correct route */}
          <Route path="/exponential-search" element={<ExponentialSearchVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
