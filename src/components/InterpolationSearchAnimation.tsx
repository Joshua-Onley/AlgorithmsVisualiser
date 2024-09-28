import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../App.css";

function InterpolationSearchVisualizer() {
    const initialArray= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const [array, setArray] = useState(initialArray);
    const [target, setTarget] = useState(7);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(array.length - 1);
    const [currentIndex, setCurrentIndex] = useState<null | number>(null);
    const [found, setFound] = useState<boolean | null>(null);
    const [searching, setSearching] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const interpolationSearch = () => {
        let l = 0;
        let r = array.length - 1;

        setSearching(true);

        intervalRef.current = window.setInterval(() => {
            if (l <= r && array[l] !== array[r]) { // Prevent division by zero
                const probe = Math.floor((target - array[l]) * (r - l) / (array[r] - array[l]) + l);
                setCurrentIndex(probe);
                setLeft(l);
                setRight(r);

                if (array[probe] === target) {
                    setFound(true);
                    clearInterval(intervalRef.current!);
                    setSearching(false);
                } else if (array[probe] < target) {
                    l = probe + 1;
                } else {
                    r = probe - 1;
                }
            } else {
                setFound(false);
                clearInterval(intervalRef.current!);
                setSearching(false);
            }
        }, 2000); // Adjust this value for animation speed
    };

    const handleSearch = () => {
        setLeft(0);
        setRight(array.length - 1);
        setCurrentIndex(null);
        setFound(null);
        interpolationSearch();
    };

    const handleChangeToNonUniformArray = () => {
        // Change to a non-uniform array
        const nonUniformArray = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
        setArray(nonUniformArray);
        setLeft(0);
        setRight(nonUniformArray.length - 1);
        setCurrentIndex(null);
        setFound(null);
    };

    const handleChangeToUniformArray = () => {
        // Change to a non-uniform array
        const nonUniformArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        setArray(nonUniformArray);
        setLeft(0);
        setRight(nonUniformArray.length - 1);
        setCurrentIndex(null);
        setFound(null);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);

    return (
        <>
        <div className="search-container">
        <h1>Interpolation Search</h1>
        <p>
        Interpolation search is an improvement over binary search for instances 
        where the values in a sorted array are uniformly distributed. Unlike binary 
        search, which always divides the array in half, interpolation search estimates 
        the position of the target value based on the values of the elements at the 
        left and right boundaries. This can significantly reduce the number of 
        comparisons needed when the distribution of values is known.
    </p>
    <p>
        The algorithm uses the following formula to calculate the probe index:
    </p>
    <p>
        <strong>Probe Index (probe) = left + 
        <span style={{ fontFamily: "monospace" }}>
        Math.floor((target - array[left]) * (right - left) / (array[right] - array[left]))
        </span>
        </strong>
    </p>
    <p>
        In this formula:
        <ul>
            <li><strong>left:</strong> The left boundary of the current search space.</li>
            <li><strong>right:</strong> The right boundary of the current search space.</li>
            <li><strong>target:</strong> The value we are searching for.</li>
            <li><strong>array[left]:</strong> The value at the left boundary of the search space.</li>
            <li><strong>array[right]:</strong> The value at the right boundary of the search space.</li>
        </ul>
        By estimating the probe index using this formula, the algorithm can skip unnecessary comparisons and hone in on the target more quickly when the data is uniformly distributed.
    </p>
        </div>
        <div className="search-container">
            <h1>Interpolation Search Visualizer</h1>
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
                        {/* Render probe above the probe index */}
                        {index === currentIndex && (
                            <motion.div
                                style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", color: "blue" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                P
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
            <button onClick={handleChangeToNonUniformArray} className="btn-search">
                        Non-Uniform Array
            </button>
            <button onClick={handleChangeToUniformArray} className="btn-search">
                        Uniform Array
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
                <h4>Average Case</h4>
                <p>O(log log n), where n is the number of elements in the array. This is because interpolation search uses a formula to find the probe position, which reduces the search space more effectively than binary search when the data is uniformly distributed.</p>
                <h4>Worst Case</h4>
                <p>O(n), where n is the number of elements in the array. This occurs when the array is not uniformly distributed. The algorithm can end up performing a linear search, checking each element one by one until the target is found</p>
            </div>
            <div className="box">
                <h2>Space Complexity Analysis</h2>
                <p>The space complexity of interpolation search is O(1) since it only uses a constant amount of space regardless of the input size.</p>
            </div>
        </div>
        </>
    )
}

export default InterpolationSearchVisualizer;
