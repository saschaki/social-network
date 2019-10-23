import React from "react";
//import Register from "./register";
import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="../public/assets/icon.jpg" alt="logo" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

/*
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("welcome is mounted");
        //good place for axios requests

        axios.get("/some-route-that-doesnt-exist").then(({data})=>{

        })
    }

    render() {
        return (
            <React.Fragment>
                <Registration />
            </React.Fragment>
        );
    }
}
*/
