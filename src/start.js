//in src lives 100% of our react code
import React from "react";
import ReactDOM from "react-dom"; //method from react to inject react code into a dom element
import Welcome from "./welcome";
import App from "./app"; //curly braces if no default export

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main")); //points to <main> in index.html
