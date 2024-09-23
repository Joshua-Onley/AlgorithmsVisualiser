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
      <li className="list-group-item">Bubble Sort</li>
      <li className="list-group-item">Selection Sort</li>
      <li className="list-group-item">Insertion Sort</li>
      <li className="list-group-item">Merge Sort</li>
      <li className="list-group-item">Quick Sort</li>
      <li className="list-group-item">Heap Sort</li>
      <li className="list-group-item">Counting Sort</li>
      <li className="list-group-item">Radix Sort</li>
      <li className="list-group-item">Bucket Sort</li>

      <h2>Searching Algorithms</h2>
        <li className="list-group-item">
          <Link to="/linear-search">Linear Search</Link> {/* Link added */}
        </li>
        <li className="list-group-item">Binary Search</li>
        <li className="list-group-item">Interpolation Search</li>
        <li className="list-group-item">Exponential Search</li>


      <h2>Graph Algorithms</h2>
      {/* Graph Algorithms */}
      <li className="list-group-item">Breadth-First Search (BFS)</li>
      <li className="list-group-item">Depth-First Search (DFS)</li>
      <li className="list-group-item">Dijkstra's Algorithm</li>
      <li className="list-group-item">A* Algorithm</li>
      <li className="list-group-item">Bellman-Ford Algorithm</li>
      <li className="list-group-item">Floyd-Warshall Algorithm</li>
      <li className="list-group-item">Kruskal's Algorithm</li>
      <li className="list-group-item">Prim's Algorithm</li>
      <li className="list-group-item">Topological Sort</li>
      <li className="list-group-item">Tarjan’s Algorithm</li>

      <h2>Tree Algorithms</h2>
      {/* Tree Algorithms */}
      <li className="list-group-item">Binary Search Tree (BST)</li>
      <li className="list-group-item">AVL Tree</li>
      <li className="list-group-item">Red-Black Tree</li>
      <li className="list-group-item">Trie</li>
      <li className="list-group-item">Segment Tree</li>
      <li className="list-group-item">Fenwick Tree (Binary Indexed Tree)</li>

      <h2>Dynamic Programming Algorithms</h2>
      {/* Dynamic Programming Algorithms */}
      <li className="list-group-item">0/1 Knapsack</li>
      <li className="list-group-item">Longest Common Subsequence (LCS)</li>
      <li className="list-group-item">Longest Increasing Subsequence (LIS)</li>
      <li className="list-group-item">Matrix Chain Multiplication</li>
      <li className="list-group-item">Coin Change Problem</li>
      <li className="list-group-item">Rod Cutting Problem</li>

      <h2>Greedy Algorithms</h2>
      {/* Greedy Algorithms */}
      <li className="list-group-item">Huffman Coding</li>
      <li className="list-group-item">Activity Selection</li>
      <li className="list-group-item">Fractional Knapsack</li>
      <li className="list-group-item">Job Scheduling Problem</li>

      
      <h2>Backtracking Algorithms</h2>
      {/* Backtracking Algorithms */}
      <li className="list-group-item">N-Queens Problem</li>
      <li className="list-group-item">Sudoku Solver</li>
      <li className="list-group-item">Rat in a Maze</li>
      <li className="list-group-item">Knight's Tour</li>
      <li className="list-group-item">Subset Sum Problem</li>


      <h2>Divide and Conquer Algorithms</h2>
      {/* Divide and Conquer Algorithms */}
      <li className="list-group-item">Binary Search</li>
      <li className="list-group-item">Strassen’s Matrix Multiplication</li>


      <h2>Miscellaneous Algorithms</h2>
      {/* Miscellaneous Algorithms */}
      <li className="list-group-item">Floyd’s Tortoise and Hare</li>
      <li className="list-group-item">Union-Find</li>
      <li className="list-group-item">KMP Algorithm</li>
      <li className="list-group-item">Rabin-Karp Algorithm</li>
      <li className="list-group-item">Manacher's Algorithm</li>
      <li className="list-group-item">Z Algorithm</li>


      <h2>Basic Data Structure Operations</h2>
      {/* Basic Data Structure Operations */}
      <li className="list-group-item">Array Operations</li>
      <li className="list-group-item">Linked List Operations</li>
      <li className="list-group-item">Stack Operations</li>
      <li className="list-group-item">Queue Operations</li>
      <li className="list-group-item">Priority Queue</li>


      <h2>Advanced Data Structures</h2>
      {/* Advanced Data Structures */}
      <li className="list-group-item">Hash Tables</li>
      <li className="list-group-item">B-Trees and B+ Trees</li>
      <li className="list-group-item">Splay Trees</li>
      <li className="list-group-item">Skip Lists</li>
    </ul>

    </>
  );
}

export default ListGroup;
