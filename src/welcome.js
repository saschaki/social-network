import React from "react";
import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome" className="outer-container">
            <h1 className="title">Disconnect</h1>
            <img src="/assets/disconnect.jpg" alt="logo" className="logo" />
            <HashRouter>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
            </HashRouter>
        </div>
    );
}
