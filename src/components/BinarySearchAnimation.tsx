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

function BinarySearchVisualizer() {
    const initialArray = [5, 3, 8, 2, 7, 9, 1];
    const [array, setArray] = useState(initialArray);
    const [target, setTarget] = useState(7);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [found, setFound] = useState<boolean | null>(null);
    const [searching, setSearching] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const binarySearch = () => {
        
    }

}