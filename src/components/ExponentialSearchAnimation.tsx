import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function ExponentialSearchVisualizer() {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [array, setArray] = useState(initialArray);
    const [target, setTarget] = useState(7);
    const [found, setFound] = useState<boolean | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [rangeLeft, setRangeLeft] = useState<number | null>(0);
    const [rangeRight, setRangeRight] = useState<number | null>(null);
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [searchSteps, setSearchSteps] = useState<number[]>([]);
    const intervalRef = useRef<number | null>(null);

    const prepareSearch = () => {
        setFound(null);
        setCurrentIndex(null);
        setRangeLeft(null);
        setRangeRight(null);
        setStepIndex(0);
        setSearchSteps([]);
        
        // Initialize search steps
        const steps: number[] = [];
        const n = array.length;

        // Handle case for the first index
        if (array[0] === target) {
            setFound(true);
            setCurrentIndex(0);
            return;
        }

        // Finding range for binary search
        let index = 1;

        while (index < n && array[index] <= target) {
            steps.push(index); // Store current index for visualization
            index *= 2;
        }

        // Store range for binary search
        const left = Math.floor(index / 2);
        const right = Math.min(index, n - 1);
        setRangeLeft(left);
        setRangeRight(right);
        setSearchSteps(steps);
    };

    const handleNextStep = () => {
        if (stepIndex < searchSteps.length) {
            const current = searchSteps[stepIndex];
            setCurrentIndex(current);
            if (array[current] === target) {
                setFound(true);
            } else {
                const left = Math.floor(current / 2);
                const right = Math.min(current, array.length - 1);
                const result = binarySearch(left, right);
                if (result !== -1) {
                    setFound(true);
                    setCurrentIndex(result);
                }
            }
            setStepIndex((prev) => prev + 1); // Move to the next step
        } else {
            setSearching(false);
        }
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
        prepareSearch();
    };

    const handleReset = () => {
        setCurrentIndex(null);
        setFound(null);
        setRangeLeft(null);
        setRangeRight(null);
        setStepIndex(0);
        setSearchSteps([]);
    };

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
                            visibility: "visible"
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
            <button onClick={handleSearch} className="btn-search">
                Start Search
            </button>
            <button onClick={handleNextStep} className="btn-next" disabled={searchSteps.length === 0}>
                Next Step
            </button>
            <button onClick={handleReset} className="btn-reset">
                Reset
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
