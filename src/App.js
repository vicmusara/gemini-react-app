import {useState} from 'react';

const App = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const surpriseOptions = [
        "Who won last year's Balon Dor?",
        "How many people live in India?",
        "How to make a cup of tea:",
    ]

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
        setValue(randomValue);
    }

    const getResponse = async () => {
       if (!value) {
           setError("Error! Please type something!");
           return;
       }
       try {
           const options = {
               method: "POST",
               body: JSON.stringify({
                   history: chatHistory,
                   message: value
               }),
               headers: {
                   "Content-Type": "application/json"
               }
           }
           const response = await fetch("http://localhost:3000/gemini", options);

           const data = await response.text();

       } catch (error){
           console.error(error);
           setError("Something went wrong! Please try again later.");
       }
    }
    return (

        <div className="app">
            <p> What do you want to search?
                <button className="suprise" onClick={surprise} disabled={!chatHistory}>Randomize</button>
            </p>
            <div className="input-container">
                <input
                    value={value}

                    placeholder="Search..."
                    onChange={(e) => setValue(e.target.value)}
                />
                {!error && <button>Ask me</button>}
                {error && <button>Clear</button>}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="search-result">
                <div key={""}>
                    <p className="answer"></p>
                </div>
            </div>

        </div>


    );
}

export default App;
