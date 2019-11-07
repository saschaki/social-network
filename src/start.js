//in src lives 100% of our react code
import React from "react";
import ReactDOM from "react-dom"; //method from react to inject react code into a dom element
import Welcome from "./welcome";
import App from "./app"; //curly braces if no default export
//Redux-Middleware
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducer';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {init} from "./socket";

//const socket = io.connect();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;
const userIsLoggedIn = location.pathname != "/welcome";
//if (location.pathname == "/welcome")
if (!userIsLoggedIn ||location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main")); //points to <main> in index.html
