import React, { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [author, setAuthor] = useState();
  const [text, setText] = useState();
  const [color, setColor] = useState()

  function getQuote() {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((response) => {
        const data = response.data.quotes;
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        const randomColor = '#'+ Math.floor(Math.random() * 19777215).toString(16);
        setAuthor(randomQuote.author);
        setText(randomQuote.quote);
        setColor(randomColor)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getQuote();
  }, []);
  

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: color}}>
        <div id="quote-box" style={{color: color}}>
          <h1 id="text">"{text}"</h1>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a
              id="tweet-quote"
              href={encodeURI(
                `https://www.twitter.com/intent/tweet?text=${text} -${author}`
              )} style={{color: color}}
            >
            <FontAwesomeIcon icon="fa-brands fa-twitter-square" size="xl"/>
            </a>
            <button id="new-quote" onClick={() => getQuote()} style={{backgroundColor: color}}>
              Another?
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
