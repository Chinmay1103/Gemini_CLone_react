import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";


const Main = () => {
    const {
        onSent,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        recentPrompt,
    } = useContext(Context);

    // Handle Enter Key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents form submission or page reload if inside a form
            if (input.trim() !== "") {
                onSent(input); // Call the onSent function with the current input
            }
        }
    };

    return (
        <div className="main">
            {/* Navigation Section */}
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>

            {/* Main Container */}
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello, Chinmay.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>

                        {/* Cards Section */}
                        <div className="cards">
                            <div className="card"
                                onClick={() => {
                                    setInput("Suggest beautiful places to see on an upcoming road trip");
                                    setTimeout(() => onSent("Suggest beautiful places to see on an upcoming road trip"), 0);
                                }}
                            >
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card"
                                onClick={() => {
                                    setInput("Summarize this topic for me: Urban Planning");
                                    setTimeout(() => onSent("Summarize this topic for me: Urban Planning"), 0);
                                }}
                            >
                                <p>Summarize this topic for me: Urban Planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card"
                                onClick={() => {
                                    setInput("What can you do for me?");
                                    setTimeout(() => onSent("What can you do for me?"), 0);
                                }}
                            >
                                <p>What can you do for me?</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card"
                                onClick={() => {
                                    setInput("Improve the readability of the code.");
                                    setTimeout(() => onSent("Improve the readability of the code."), 0);
                                }}
                            >
                                <p>Improve the readability of the code.</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <div className="user-and-prompt">
                                <img src={assets.user_icon} alt="User Icon" className="user-icon" />
                                <p className="user-prompt">{recentPrompt}</p>
                            </div>
                        </div>
                        <div className="result-data">
                            <img className="gemini-icon" src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <div className="result-html" dangerouslySetInnerHTML={{ __html: resultData }} />
                            )}
                        </div>
                    </div>
                )}

                {/* Input and Result Section */}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                            disabled={loading} // Disable input while loading
                            onKeyDown={handleKeyDown} // Handle Enter key press
                        />
                        <div>
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img
                                onClick={() => onSent(input)} // Pass `input` to `onSent`
                                src={assets.send_icon}
                                alt="Send Icon"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check
                        its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
