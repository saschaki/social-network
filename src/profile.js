import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default class Profile extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log("Profile mounted");
    }
    //here uploader
    render() {
        return (
            <React.Fragment>
                <ProfilePic
                    showUploader={this.props.showUploader}
                    image={this.props.image}
                />
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
            </React.Fragment>
        );
    }
}
