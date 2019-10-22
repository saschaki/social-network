import React from "react";
import Register from "./register";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("welcome mounted");
        //good place for axios requests
        /*
        axios.get("/some-route-that-doesnt-exist").then(({data})=>{

        })*/
    }

    render() {
        return (
            <React.Fragment>
                <Register />
            </React.Fragment>
        );
    }
}
