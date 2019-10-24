import React from "react";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Sascha",
            last: "Kiefer",
            img: "",
            uploaderIsVisible: false
        };
    }

    componentDidMount() {
        console.log("App mounted");
        // this is where we want to make an axios requests
        // a get request to a route called "/users"
        // when we get a response we want to put the inspect
        // into setState this.setState()
    }

    toggleModal() {
        console.log("i am toggle modal...");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInApp(muffin) {
        console.log("im a method in app");
        console.log("muffin", muffin);
        //this.setState({ muffin: muffin });
    }

    render() {
        return (
            <React.Fragment>
                <h1 onClick={this.toggleModal.bind(this)}>Hello from App</h1>
                <ProfilePic
                    firstName={this.state.first}
                    lastName={this.state.last}
                    imgUrl={this.state.img}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </React.Fragment>
        );
    }
}
