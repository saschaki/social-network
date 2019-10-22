//in src lives 100% of our react code
import React from "react";
import ReactDOM from "react-dom"; //method from react to inject react code into a dom element
import HelloWorld from "./hello-world";

ReactDOM.render(<HelloWorld />, document.querySelector("main")); //points to <main> in index.html
