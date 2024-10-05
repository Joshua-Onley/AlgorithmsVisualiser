import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

// Define the graph type
const graph: { [key: string]: string[] } = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F", "G"],
    D: [],
    E: [],
    F: [],
};

// Type for the props of TreeNode component
interface TreeNodeProps {
    node: string;
    graph: { [key: string]: string[] };
    visited: string[];
    currentNode: string | null;
}

const DepthFirstSearchVisualizer: React.FC = () => {
    const [visited, setVisited] = useState<string[]>([]);
    const [currentNode, setCurrentNode] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const dfs = (node: string, delay: number) => {
        if (!node || visited.includes(node)) return;

        // Update visited and current node states
        setVisited((prev) => [...prev, node]);
        setCurrentNode(node);

        // Call the next DFS step after the delay
        setTimeout(() => {
            graph[node].forEach((neighbor) => {
                dfs(neighbor, delay); // Pass the same delay
            });
        }, delay);
    };

    const startDFS = () => {
        setVisited([]);
        setCurrentNode(null);
        setIsSearching(true);
        dfs("A", 1000); // Call DFS starting from node A with a delay
        setTimeout(() => {
            setIsSearching(false); // Set searching to false after the entire DFS completes
        }, 1000 * (graph["A"].length + 1)); // Adjust timeout to end after processing all nodes
    };

    return (
        <div className="search-container">
            <h1>Depth First Search Visualizer</h1>
            <button onClick={startDFS} disabled={isSearching}>
                {isSearching ? "Searching..." : "Start DFS"}
            </button>
            <div className="tree-container">
                <TreeNode node="A" graph={graph} visited={visited} currentNode={currentNode} />
            </div>
        </div>
    );
};

// TreeNode component to render each tree node
const TreeNode: React.FC<TreeNodeProps> = ({ node, graph, visited, currentNode }) => {
    return (
        <div className="tree-node">
            <motion.div
                className="node"
                style={{
                    backgroundColor: visited.includes(node) ? "green" : "lightgray",
                    border: currentNode === node ? "2px solid red" : "none",
                }}
                initial={{ scale: 1 }}
                animate={{ scale: visited.includes(node) ? 1.1 : 1 }}
            >
                {node}
            </motion.div>
            {graph[node] && graph[node].length > 0 && (
                <div className="children">
                    {graph[node].map((child) => (
                        <TreeNode key={child} node={child} graph={graph} visited={visited} currentNode={currentNode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DepthFirstSearchVisualizer;
