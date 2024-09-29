import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function BubbleSortVisualizer() {
    const [array, setArray] = useState<number[]>([5, 3, 8, 4, 2, 7, 1, 6]); // Sample array
    const [sorting, setSorting] = useState(false);
    const [comparingIndices, setComparingIndices] = useState<number[]>([-1, -1]); // To track the indices being compared
    const [sorted, setSorted] = useState(false);

    // Function to check if the array is sorted
    const isArraySorted = (arr: number[]): boolean => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
        }
        return true;
    };

    // Check if the array is sorted whenever the array changes
    useEffect(() => {
        if (isArraySorted(array)) {
            setSorted(true);
        } else {
            setSorted(false);
        }
    }, [array]);

    const bubbleSort = async () => {
        setSorting(true);
        let arr = [...array];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                setComparingIndices([j, j + 1]); // Set the indices being compared

                // If elements are out of order, animate their swap
                if (arr[j] > arr[j + 1]) {
                    // Animate the swapping
                    await animateSwap(j, j + 1);

                    // Swap the elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]); // Update the array state for re-rendering
                }

                await new Promise(resolve => setTimeout(resolve, 1000)); // Slower animation delay (1 second)
            }
        }
        setComparingIndices([-1, -1]); // Reset comparing indices
        setSorting(false);
        setSorted(true);
    };

    const animateSwap = async (index1: number, index2: number) => {
        const firstItem = document.querySelector(`.array-item:nth-child(${index1 + 1})`) as HTMLElement;
        const secondItem = document.querySelector(`.array-item:nth-child(${index2 + 1})`) as HTMLElement;

        if (firstItem && secondItem) {
            // Get the bounding rectangles for both items
            const firstItemRect = firstItem.getBoundingClientRect();
            const secondItemRect = secondItem.getBoundingClientRect();

            // Calculate the mid-point for the transform
            const midX = (firstItemRect.left + secondItemRect.left) / 2;
            const midY = (firstItemRect.top + secondItemRect.top) / 2;

            // Translate first item to the second item's position
            firstItem.style.transition = "transform 0.5s";
            secondItem.style.transition = "transform 0.5s";

            // Move the items to a mid-point and then swap
            firstItem.style.transform = `translate(${secondItemRect.left - firstItemRect.left}px, ${secondItemRect.top - firstItemRect.top}px)`;
            secondItem.style.transform = `translate(${firstItemRect.left - secondItemRect.left}px, ${firstItemRect.top - secondItemRect.top}px)`;

            // Wait for the animation to finish
            await new Promise(resolve => setTimeout(resolve, 500));

            // Reset transformations after animation
            firstItem.style.transition = ""; // Remove transition
            secondItem.style.transition = ""; // Remove transition
            firstItem.style.transform = ""; // Reset transform
            secondItem.style.transform = ""; // Reset transform
        }
    };

    const resetArray = () => {
        setArray([5, 3, 8, 4, 2, 7, 1, 6]); // Reset array to default unsorted state
        setSorted(false); // Reset sorted state
    };

    return (
        <>

<div className="search-container">
    <h1>Bubble Sort</h1>
    <p>
        Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted. Here’s how the algorithm works, step by step:
    </p>
    <p>
        1. **Initialization**: The algorithm begins by assuming the array is unsorted and sets a flag to indicate whether any swaps have been made.
    </p>
    <p>
        2. **First Pass**: The algorithm iterates through the array from the beginning to the end. For each pair of adjacent elements, it compares them:
        - If the first element is greater than the second, the two elements are swapped. 
        - This operation "bubbles" the largest unsorted element to its correct position at the end of the array.
    </p>
    <p>
        3. **Subsequent Passes**: After the first pass, the algorithm starts again from the beginning of the array. However, with each pass, the next largest element is correctly placed, reducing the number of comparisons needed for subsequent passes.
    </p>
    <p>
        4. **Early Termination**: If a complete pass through the array is made without any swaps, this indicates that the array is sorted, and the algorithm can terminate early. This optimization helps improve performance in the best-case scenario.
    </p>
  
</div>
        <div className="search-container">
            <h1>Bubble Sort Visualizer</h1>
            <div className="array-container">
                {array.map((item, index) => (
                    <motion.div
                        key={index}
                        className="array-item"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        style={{
                            border: comparingIndices.includes(index) ? '2px solid red' : '1px solid black', // Red border for compared items
                            position: 'relative', // Allow absolute positioning for children
                        }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
            <button 
                onClick={bubbleSort} 
                className="btn-search" 
                disabled={sorting || sorted} // Disable if sorting or already sorted
            >
                {sorting ? "Sorting..." : sorted ? "Already Sorted" : "Start Bubble Sort"}
            </button>
            <button 
                onClick={resetArray} 
                className="btn-search" 
                disabled={sorting} // Disable reset button while sorting
            >
                {sorting ? "Sorting..." : "Reset Array"}
            </button>
        </div>

        <div className="container">
    <div className="box">
        <h2>Time Complexity Analysis</h2>
        <p>
            The time complexity of bubble sort is O(n^2), where n is the number of elements in the array. This is because bubble sort requires nested loops: one for iterating through the entire array and another for comparing adjacent elements. In the worst case, where the array is sorted in reverse order, the algorithm must make n passes through the array, resulting in n * (n - 1) comparisons.
        </p>
    </div>

    <div className="box">
        <h2>Space Complexity Analysis</h2>
        <p>
            The space complexity of bubble sort is O(1) because it is an in-place sorting algorithm. This means that it only requires a constant amount of additional memory space for variables used during the sorting process (such as for swaps). No additional data structures are used that would grow with the input size.
        </p>
    </div>
</div>

        </>
    );
}

export default BubbleSortVisualizer;
