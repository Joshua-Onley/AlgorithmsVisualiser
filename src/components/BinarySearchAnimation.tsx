import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../App.css";

function BinarySearchVisualizer() {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // Initial array for binary search (sorted)
    const [array, setArray] = useState(initialArray); // State to manage the array
    const [target, setTarget] = useState(7); // Default target value
    const [left, setLeft] = useState(0); // Left boundary of the array
    const [right, setRight] = useState(array.length - 1); // Right boundary of the array
    const [mid, setMid] = useState((left + right) / 2); // Mid point of the array
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // state variable to keep track of the current index being searched
    const [found, setFound] = useState<boolean | null>(null); // variable to determine if the target has been found
    const [searching, setSearching] = useState(false); // variable to indicate if the search is in progress
    const intervalRef = useRef<number | null>(null); // reference to store the interval ID for clearing it later

    // Binary Search function with animation
    const binarySearch = () => {
        let l = 0; // left pointer initially set to 0
        let r = array.length - 1; // right pointer initially set to the last index of the array

        setSearching(true);

        intervalRef.current = window.setInterval(() => {
            if (l <= r) {
                const mid = Math.floor((l + r) / 2); // Find the middle index
                setCurrentIndex(mid); // Highlight the current mid index
                setLeft(l); // Set left pointer
                setRight(r); // Set right pointer
                setMid(mid); // set mid pointer

                if (array[mid] === target) {
                    setFound(true); // If the element is found
                    clearInterval(intervalRef.current!);
                    setSearching(false);
                } else if (array[mid] < target) {
                    l = mid + 1; // Search the right half
                } else {
                    r = mid - 1; // Search the left half
                }
            } else {
                setFound(false); // If target is not found
                clearInterval(intervalRef.current!);
                setSearching(false);
            }
        }, 2000); // Adjust the delay to control animation speed
    };

    // Handle search button click
    const handleSearch = () => {
        setLeft(0);
        setRight(array.length - 1);
        setCurrentIndex(null);
        setFound(null);
        setMid(Math.floor((0 + (array.length - 1)) / 2));
        binarySearch();

    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);

    return (
        <>
        <div className="search-container">
        <h1>Binary Search</h1>
        <p>Binary search is a searching algorithm that only works with ordered arrays. The algorithm repeatedly divides the search space in half, which significantly reduces the number of steps required compared to linear search. During the execution of the algorithm three pointers are used (L, R, and M). L represents the left pointer which starts at the first element in the array; R represents the right pointer which starts at the last element in the array; and M represents the midpoint of the array ((L + R) // 2 ). Initially the algorithm compares the element pointed to by M with the target value. If the element at index M is smaller than the target, L is updated to equal M + 1. If the elemnet at index M is larger than the target, R is updated to equal M - 1. On the next iteration M is recalculated based on the new values of L and R and the process is repeated until the target is found.</p>
        </div>

        <div className="search-container">
            {/*Heading for the visualizer */}
            <h1>Binary Search Visualizer</h1>

            {/*Input field for a target number*/}
            <p>Input a target number:</p>
            <input
                type="number" 
                value={target}// contrlled input for setting the target value
                onChange={(e) => setTarget(Number(e.target.value))} // update the state when the user enters a value
                className="target-input"
            />
            {/*Container for the array*/}
            <div className="array-container">
                {array.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            visibility: index >= left && index <= right ? "visible" : "hidden", // Hide items outside of L and R
                        }}
                    >
                        {/* Render L above the left pointer index */}
                        {index === left && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                L
                            </motion.div>
                        )}
                        {/* Render R above the right pointer index */}
                        {index === right && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                R
                            </motion.div>
                        )}
                        {/* Render M above the mid pointer index */}
                        {index === mid && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                M
                            </motion.div>
                        )}
                        {/* Render array item */}
                        <motion.div
                            className={`array-item ${index === currentIndex ? "highlight" : ""} ${
                                found && index === currentIndex ? "found" : ""
                            }`}
                            initial={{ scale: 1 }}
                            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item}
                        </motion.div>
                    </div>
                ))}
            </div>
            <button onClick={handleSearch} className="btn-search" disabled={searching}>
                {searching ? "Searching..." : "Start Search"}
            </button>
            {found !== null && (
                <p className="result">
                    {found ? `Element ${target} found at index ${currentIndex}` : `Element ${target} not found`}
                </p>
            )}
        </div>

        <div className="container">
  <div className="box">
    <h2>Time Complexity Analysis</h2>
    <p>O(log n), where n is the number of elements in the array. This is because binary search cuts the search space in half at the start of each iteration.</p>
    </div>

  <div className="box">
    <h2>Space Complexity Analysis</h2>
    <p>The space complexity of binary search depends on its specific implementation. If the algorithm is implemented using recursion the space complexity is O(log n) because of the recursive calls. Each call adds a new frame to the call stack and since the depth of the recursion is log n, the space complexity grows with the recursion depth. If the algorithm is implemented using the iterative approach the space complexity is O(1) because a constant number of variables are used (L, R + M) no matter how large the input size is.</p>


    
    
    </div>
</div>
        </>
    );
}

export default BinarySearchVisualizer;
