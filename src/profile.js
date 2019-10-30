import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";
import FindPeople from "./find-people";

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
                <div className="profile">
                    <ProfilePic
                        showUploader={this.props.showUploader}
                        image={this.props.image}
                    />
                    <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
                    <FindPeople/> 
                </div>  
            </React.Fragment>
        );
    }
}
