import LinearSearchVisualizer from "./LinearSearchAnimation";
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


function ListGroup() {
  return (
    <>
    <h1>Data Structures & Algorithms Visualizer</h1>
    <ul className="list-group">
      <h2>Sorting Algorithms</h2>
      {/* Sorting Algorithms */}
      <li className="list-group-item">
        <Link to="/bubble-sort">Bubble Sort</Link></li>


      <h2>Searching Algorithms</h2>
        <li className="list-group-item">
          <Link to="/linear-search">Linear Search</Link> {/* Link added */}
        </li>

        <li className="list-group-item">
          <Link to="binary-search">Binary Search</Link>
          </li>


      <h2>Graph Algorithms</h2>
      {/* Graph Algorithms */}
      <li className="list-group-item">
        <Link to="breadth-first-search">Breadth-First Search</Link></li>
      <li className="list-group-item">
        <Link to="depth-first-search">Depth-First Search (DFS)</Link></li>



    </ul>

    </>
  );
}

export default ListGroup;
