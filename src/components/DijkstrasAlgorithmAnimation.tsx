import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

// Node class representing each node in the graph
class Node {
    id: number;
    neighbors: { node: Node; weight: number }[];
    x: number;
    y: number;

    constructor(id: number, x: number, y: number, neighbors: { node: Node; weight: number }[] = []) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.neighbors = neighbors;
    }
}

// Simplified graph structure with manual positioning
const nodeA = new Node(1, 400, 100);  // Example: node positioned at (400, 100)
const nodeB = new Node(6, 700, 300);  // Example: node positioned at (700, 300)
const nodeC = new Node(3, 400, 300);  // Updated from 9 to 3
const nodeD = new Node(4, 700, 100);
const nodeE = new Node(5, 800, 200);  // Updated from 6 to 5
const nodeF = new Node(2, 550, 200);  // Updated from 7 to 6

nodeA.neighbors = [{node: nodeF, weight: 5}, { node: nodeC, weight: 4 }, { node: nodeD, weight: 3 }];
nodeB.neighbors = [{ node: nodeE, weight: 2 }];
nodeC.neighbors = [{ node: nodeB, weight: 3 }, {node: nodeF, weight: 4}];
nodeD.neighbors = [{ node: nodeE, weight: 6 }];
nodeE.neighbors = [{ node: nodeF, weight: 2 }];
nodeF.neighbors = [];

// The graph nodes can be an array of all nodes
const graphNodes = [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF];

// Dijkstra's Algorithm Visualizer Component
const DijkstrasAlgorithmVisualizer: React.FC = () => {
    const [visited, setVisited] = useState<Set<number>>(new Set());
    const [isSearching, setIsSearching] = useState(false);
    const [startNode, setStartNode] = useState<number>(1);  // Start node ID 1
    const [targetNode, setTargetNode] = useState<number>(2); // Target node ID 2

    const dijkstra = async (start: Node, target: number) => {
        const newDistances = Array(graphNodes.length).fill(Infinity);
        newDistances[start.id - 1] = 0;
        const unvisited = [...graphNodes];
        setVisited(new Set());

        while (unvisited.length > 0) {
            const currentNode = unvisited.reduce((minNode, node) =>
                newDistances[node.id - 1] < newDistances[minNode.id - 1] ? node : minNode
            );

            setVisited((prev) => new Set([...prev, currentNode.id]));

            if (currentNode.id === target) {
                setIsSearching(false);
                return;
            }

            for (const { node, weight } of currentNode.neighbors) {
                const newDist = newDistances[currentNode.id - 1] + weight;
                if (newDist < newDistances[node.id - 1]) {
                    newDistances[node.id - 1] = newDist;
                }
            }

            unvisited.splice(unvisited.indexOf(currentNode), 1);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        }

        setIsSearching(false);
    };

    const startSearch = () => {
        setIsSearching(true);
        dijkstra(graphNodes[startNode - 1], targetNode);
    };

    const reset = () => {
        setVisited(new Set());
        setIsSearching(false);
    };

    return (
        <div className="dijkstras-search-container">
            <h1>Dijkstra's Algorithm Visualizer</h1>
            <div>
                <label>Start Node: </label>
                <input
                    type="number"
                    value={startNode}
                    onChange={(e) => setStartNode(Number(e.target.value))}
                    disabled={isSearching}
                    className="target-input"
                />
            </div>
            <div>
                <label>Target Node: </label>
                <input
                    type="number"
                    value={targetNode}
                    onChange={(e) => setTargetNode(Number(e.target.value))}
                    disabled={isSearching}
                    className="target-input"
                />
            </div>
            <button className="btn-search" onClick={startSearch} disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Start Search'}
            </button>
            <button className="btn-search" onClick={reset} disabled={isSearching}>
                Reset
            </button>
            <div className="dijkstras-graph-container">
                {/* Render SVG lines between nodes */}
                <svg className="graph-svg">
                    {graphNodes.map((node) =>
                        node.neighbors.map((neighbor) => {
                            // Calculate midpoints for positioning the weights
                            const midX = (node.x + neighbor.node.x) / 2;
                            const midY = (node.y + neighbor.node.y) / 2;
                            return (
                                <g key={`${node.id}-${neighbor.node.id}`}>
                                    <line
                                        x1={node.x}
                                        y1={node.y}
                                        x2={neighbor.node.x}
                                        y2={neighbor.node.y}
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={midX - 10}
                                        y={midY - 10}
                                        fill="black"
                                        fontSize="14"
                                        textAnchor="middle"  // Center the text
                                        alignmentBaseline="middle"  // Vertically center the text
                                    >
                                        {neighbor.weight}
                                    </text>
                                </g>
                            );
                        })
                    )}
                </svg>
                {/* Render the nodes */}
                {graphNodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className="dijkstras-node"
                        style={{
                            backgroundColor: visited.has(node.id) ? 'yellow' : 'lightgray',
                            left: `${node.x}px`,
                            top: `${node.y}px`,
                        }}
                    >
                        {node.id}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DijkstrasAlgorithmVisualizer;
