import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function ExponentialSearchVisualizer() {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [array, setArray] = useState(initialArray);
    const [target, setTarget] = useState(7);
    const [found, setFound] = useState<boolean | null>(null);
    const [searching, setSearching] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [rangeLeft, setRangeLeft] = useState(0);
    const [rangeRight, setRangeRight] = useState(initialArray.length - 1);
    const intervalRef = useRef<number | null>(null);

    const exponentialSearch = () => {
        setSearching(true);
        setFound(null); // Reset found state
        setCurrentIndex(null); // Reset current index
        setRangeLeft(0); // Reset range
        setRangeRight(initialArray.length - 1); // Reset range

        intervalRef.current = window.setInterval(() => {
            const n = array.length;

            // Step 1: Check if target is at the first index
            if (array[0] === target) {
                setFound(true);
                clearInterval(intervalRef.current!);
                setSearching(false);
                return;
            }

            // Step 2: Find the range for binary search
            let index = 1;

            while (index < n && array[index] <= target) {
                setCurrentIndex(index); // Highlight current index
                setRangeLeft(Math.floor(index / 2)); // Update left range
                setRangeRight(Math.min(index, n - 1)); // Update right range

                if (array[index] === target) {
                    setFound(true);
                    clearInterval(intervalRef.current!);
                    setSearching(false);
                    return;
                }
                
                index *= 2; // Exponentially increase index
            }

            // Step 3: Call binary search for the identified range
            const left = Math.floor(index / 2);
            const right = Math.min(index, n - 1);
            setRangeLeft(left);
            setRangeRight(right);

            const result = binarySearch(left, right);
            if (result !== -1) {
                setFound(true);
                setCurrentIndex(result); // Highlight the found index
            } else {
                setFound(false);
            }

            clearInterval(intervalRef.current!);
            setSearching(false);
        }, 2000); // Adjust delay for animation speed
    };

    const binarySearch = (left: number, right: number) => {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            setCurrentIndex(mid); // Highlight current index

            if (array[mid] === target) {
                return mid; // Target found
            }

            if (array[mid] < target) {
                left = mid + 1; // Search right
            } else {
                right = mid - 1; // Search left
            }
        }
        return -1; // Target not found
    };

    const handleSearch = () => {
        exponentialSearch();
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current!); // Clean up interval
    }, []);

    return (
        <div className="search-container">
            <h1>Exponential Search Visualizer</h1>
            <p>Input a target number:</p>
            <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="target-input"
            />
            <div className="array-container">
                {array.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            visibility: index >= rangeLeft && index <= rangeRight ? "visible" : "hidden", // Hide items outside of L and R
                        }}
                    >
                        {/* Render L pointer */}
                        {index === rangeLeft && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                L
                            </motion.div>
                        )}
                        {/* Render R pointer */}
                        {index === rangeRight && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                R
                            </motion.div>
                        )}
                        {/* Render current index */}
                        <motion.div
                            className={`array-item ${index === currentIndex ? "highlight" : ""} ${found && index === currentIndex ? "found" : ""}`}
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
    );
}

export default ExponentialSearchVisualizer;
