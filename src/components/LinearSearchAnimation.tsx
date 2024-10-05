
// This line imports the react library, which is necessary to use JSX (the syntax used in React to define components)
// useState, useEffect, and useRef are React hooks
//useState: allows you to add state to functional components
//useEffect: allows you to perform sideaffects in your component (e.g., fetching data/subscriptions)
//useRef: Creates a mutable object that persists for the full lifetime of the component, often used to store a reference to a DOM element or to hold values across renders
import React, { useState, useEffect, useRef } from "react";

// imports the motion component from the framer-motion library, which is used for animations 
import { motion } from "framer-motion";

// imports CSS file for styling
import "../App.css";

// component definition: this defines a component called linear search visualizer. This is where the componnets logic and rendering is defined
function LinearSearchVisualizer() {
  const initialArray = [5, 3, 8, 2, 7, 9, 1]; // initialises an initial array to be used in the linear search
  const [array, setArray] = useState(initialArray); // array: state variable to hold array. setArray: function to update array state
  const [target, setTarget] = useState(7); // target: state variable to hold the current target value the user is searching for in the array. setTarget: function to update the target state 
  const [currentIndex, setCurrentIndex] = useState(-1); // currentIndex: state variable to keep track of the current index being searched 
  const [found, setFound] = useState<boolean | null>(null); // found: boolean value indicating whether the target value has been found or not. setFound: functon to update found variable.
  const [searching, setSearching] = useState(false); // searching: variable to indicate whether a search is currently taking place
  const intervalRef = useRef<number | null>(null); // intervalRef: variable to store the interval ID from setInterval, initialized to null

  const linearSearch = () => { // defines a function for performing the linear search algorithm
    let index = 0; // index variable to keep track of the current index in the array
    setSearching(true); // set searching variable to true; indicating a search is takng place

    intervalRef.current = window.setInterval(() => { // starts an interval that runs every second to animate the search process
      if (index < array.length) { // checks if the current index is within the bounds of the array 
        setCurrentIndex(index); // updates the currentIndex state
        if (array[index] === target) { // checks if the current element matches the target
          setFound(true); // sets the found variable to true
          clearInterval(intervalRef.current!); // stops the interval
          setSearching(false); // sets the searching variable to false
        } else {
          index++; // increments the index if the element in the current array index does not match the target
        }
      } else { // if the current index is outside the bounds of the array
        setFound(false); // sets the found variable to false
        clearInterval(intervalRef.current!); // stops the interval
        setSearching(false); // sets the searching variable to false
      }
    }, 900); // sets the interval to run every 1000 milliseconds 
  };

  const handleSearch = () => { // defines a function to handle the search button click
    setCurrentIndex(-1); // sets the current index to -1
    setFound(null); // sets the found variable to null
    setSearching(false); // sets the searching variable to false
    linearSearch(); // calls the linear search function
  };

  const randomizeArray = () => { // defines a function to create a random array 
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)); // creates a random array of size 7 containing random numbers ranging from 0-9
    setArray(newArray); // sets the array variable to the random arary that was just created
  };

  useEffect(() => { // defines a sideffect that runs on component mount and unmount
    return () => clearInterval(intervalRef.current!); // cleans up the interval when the component unmounts to prevent memory leaks
  }, []);

  return ( // render method: begins the JSX return statement that defines what the component will render
    <>
        <div className="search-container">
        <h1>Linear Search</h1>
        <p>The linear search algorithm is one of the simplest algorithms that can be used to find a specific element (the target) in a list/array. The algorithm works by sequentially checking each element in the list, starting from the first element and moving toward the last, until it finds the target or reaches the end of the list. If the algrotihm finds the target during the search, it returns the index of this element.</p>


    </div>
    <div className="search-container">
      <h1>Linear Search Visualizer</h1>
      <p>Input a target number:</p>
      <input
        type="number" 
        value={target} // binds the unput value to the target state
        onChange={(e) => setTarget(Number(e.target.value))} // updates the target state whenever the value in the input changes
        className="target-input"
      />
      

      <div className="array-container">
      <h3>Array:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
        {array.map((item, index) => (
          <motion.div
            key={index}
            className={`array-item ${index === currentIndex ? "highlight" : ""} ${
              found && index === currentIndex ? "found" : ""
            }`}
            initial={{ scale: 1 }}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
      
      <button onClick={handleSearch} className="btn-search" disabled={searching}>
        {searching ? "Searching..." : "Start Search"}
      </button>
      <button onClick={randomizeArray} className="btn-search">Randomize Array</button>

      {found !== null && (
        <>
          <p className="result">
            {found ? `Target value found at index ${currentIndex}` : `Element ${target} not found`}
          </p>

        </>
      )}
    </div>

    <div className="container">
  <div className="box">
    <h2>Time Complexity Analysis</h2>
    <h4>Best Case Scenario: O(1) (constant time)<br></br></h4>
    <p>This is the case where the target element is found in the first array index checked</p>
    <h4>Average Case Scenario: O(n) (linear time)</h4>
    <p>On average, the algorithm will have to search through half the array before finding the target. Therefore, it checks n/2 elements on average</p>
    <h4>Worst Case Scenario</h4>
    <p>In the worst case, the algorithm will have to search through every element in the array before finding the target. The algorithm must check n elements; therefore, the time complexity is O(n)</p>
    </div>

  <div className="box">
    <h2>Space Complexity Analysis</h2>
    <p>Linear search stores a few variables such as the index and the target value, but no additional memory is used relative to the size of the input array. Therefore, the space complexity is O(1)</p>


    
    
    </div>
</div>




    </>
  );
}

export default LinearSearchVisualizer;
