import React, { createContext, useState } from "react";
import run from "../config/gemini"; // Ensure the correct path to gemini.js

// Create the context
export const Context = createContext();

// Context provider component
const ContextProvider = (props) => {
    // State variables
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }


    // Function to handle sending prompts
    const onSent = async (prompt) => {
        try {
            // Reset states before sending the prompt
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let answer;
            if (prompt !== undefined) {
                answer = await run(prompt);
                setRecentPrompt(prompt)
            }
            else {
                setPrevPrompts(prev => [...prev, input])
                setRecentPrompt(input)
                answer = await run(input)
            }

            // Call the `run` function from gemini.js with the input prompt
            const response = await run(prompt);

            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i == 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>");

            // If response exists, update context values
            if (response) {
                let newResponseArray = newResponse2.split(" ");
                for (let i = 0; i < newResponseArray.length; i++) {
                    const nextWord = newResponseArray[i];
                    delayPara(i, nextWord + " ");
                }
                setPrevPrompts((prev) => [...prev, prompt]); // Add to previous prompts
                setRecentPrompt(input); // Set the recent prompt
            }
        } finally {
            setLoading(false); // Ensure loading is stopped
            setInput("")
        }
    };

    // Context value to provide to consumers
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
