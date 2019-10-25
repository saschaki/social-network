import React from "react";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            image: "",
            file: null,
            uploaderIsVisible: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
        console.log("state", this.state);
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    render() {
        return (
            <React.Fragment>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={
                        <ProfilePic
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            image={this.state.image}
                            onClick={this.showUploader}
                        />
                    }
                    bioEditor={
                        <BioEditor bio={this.state.bio} setBio={this.setBio} />
                    }
                />
            </React.Fragment>
        );
    }
}
