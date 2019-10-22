//in src lives 100% of our react code
import React from "react";
import ReactDOM from "react-dom"; //method from react to inject react code into a dom element
//import HelloWorld from "./hello-world";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    <iframe
        src="https://giphy.com/gifs/film-cute-lol-26gs9ozI95iMvmbaE"
        width="auto"
        height="600px"
        frameBorder="0"
        className="giphy-embedded"
        allowFullScreen
    ></iframe>;
}

ReactDOM.render(elem, document.querySelector("main")); //points to <main> in index.html
