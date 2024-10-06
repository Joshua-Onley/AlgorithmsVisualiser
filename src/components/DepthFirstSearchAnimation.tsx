import React, { useState } from "react"; 
import { motion } from "framer-motion"; 
import "../App.css"; 

// TreeNode class to represent each node in the tree
class TreeNode {
    value: number; 
    children: TreeNode[]; 

    constructor(value: number, children: TreeNode[] = []) {
        this.value = value; 
        this.children = children; 
    }
}

// Create a tree structure
const rootNode = new TreeNode(1, [ 
    new TreeNode(2, [new TreeNode(4), new TreeNode(5)]), 
    new TreeNode(3, [new TreeNode(6), new TreeNode(7)]) 
]);

const DepthFirstSearchVisualizer: React.FC = () => {
    const [visited, setVisited] = useState<number[]>([]); 
    const [isSearching, setIsSearching] = useState(false);
    const [target, setTarget] = useState(7); 
    const [found, setFound] = useState(false);
    const [search, setSearch] = useState(false);

    const dfs = async (node: TreeNode | null, targetValue: number) => {
        if (node === null || found) return; // Stop if the target is found or node is null

        const stack: TreeNode[] = [node]; // Start with the root node

        while (stack.length > 0) {
            const current = stack.pop(); // Get the current node
            if (!current) continue; // Check if current is valid

            // Highlight the current node
            setVisited((prev) => [...prev, current.value]); 

            // Check if the current node is the target
            if (current.value === targetValue) {
                setIsSearching(false); // Stop searching
                setFound(true); // Mark the target as found
                setSearch(true);
                return; // Return to stop processing further
            }

            // Push children onto the stack in reverse order for depth-first traversal
            for (let i = current.children.length - 1; i >= 0; i--) {
                stack.push(current.children[i]);
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Small delay
        }

        setIsSearching(false); // Stop searching after the loop
        setSearch(true);
    };

    const startSearch = () => {
        // Reset variables for a new search
        setVisited([]); // Reset visited nodes
        setIsSearching(true); // Indicate that the search is in progress
        setFound(false); // Reset found state
        dfs(rootNode, target); // Start DFS searching for the target value
    };

    const resetVariables = () => {
        setVisited([]); // Reset visited nodes
        setIsSearching(false); // Reset searching state
        setFound(false); // Reset found state
        setSearch(false);
    };

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarget(Number(e.target.value)); // Update target state based on input
    };

    return (
        <div className="search-container"> 
            <h1>Depth First Search Visualizer</h1>

            <div>
                <label>Set Target Value: </label>
                <input 
                    type="number" 
                    value={target} 
                    onChange={handleTargetChange} 
                    disabled={search} 
                    className="target-input" 
                />
            </div>

            <button className="btn-search" onClick={startSearch} disabled={search}>
                {isSearching ? "Searching..." : "Start DFS"}
            </button>

            <button className="btn-search" onClick={resetVariables} disabled={isSearching}>
                Reset DFS
            </button>

            <div className="tree-container">
                <RenderTree node={rootNode} visited={visited} found={found} target={target} />
            </div>
        </div>
    );
};

const RenderTree: React.FC<{ node: TreeNode; visited: number[]; found: boolean; target: number; level?: number }> = ({ node, visited, found, target, level = 0 }) => {
    return (
        <div className="tree-node">
            <motion.div className="node" style={{ backgroundColor: node.value === target && found ? "green" : visited.includes(node.value) ? "yellow" : "lightgray" }}>
                {node.value}
            </motion.div>
            {node.children.length > 0 && (
                <div className="children">
                    {node.children.map((child, index) => (
                        <div key={`child-${index}`} className="child-container">
                            <div className={`line line-level-${level} line-${index}`} />
                            <RenderTree key={child.value} node={child} visited={visited} found={found} target={target} level={level + 1} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DepthFirstSearchVisualizer;
