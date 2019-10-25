import React from "react";
import Uploader from "./uploader";
import axios from "./axios";
import ProfilePic from "./profile-pic";
//import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            image: "",
            bio: "",
            file: null,
            uploaderIsVisible: false
        };
        this.methodInApp = this.methodInApp.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
        console.log("state", this.state);
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInApp(newUrl) {
        this.setState({ image: newUrl });
    }

    setImage() {}

    setBio() {}

    render() {
        return (
            <React.Fragment>
                <div className="navbar">
                    <ProfilePic
                        toggleModal={() => this.toggleModal()}
                        firstName={this.state.first}
                        lastName={this.state.last}
                        image={this.state.image}
                    />
                    <h1 className="">Disconnect</h1>
                </div>
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </React.Fragment>
        );
    }
}
