import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

// Define the graph type
const graph: { [key: string]: string[] } = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
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

    const dfs = (node: string) => {
        if (!node || visited.includes(node)) return;
        setVisited((prev) => [...prev, node]);
        setCurrentNode(node);

        setTimeout(() => {
            graph[node].forEach((neighbor) => {
                dfs(neighbor);
            });
        }, 1000);
    };

    const startDFS = () => {
        setVisited([]);
        setCurrentNode(null);
        setIsSearching(true);
        dfs("A");
        setIsSearching(false);
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
