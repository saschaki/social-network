import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";
import FindPeople from "./find-people";
import Friends from "./friends";


export default class Profile extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        console.log("Profile mounted");
    }
   
    render() {
        return (
            <React.Fragment>
                <div className="profile">
                    <div className="innerprofile">
                        <ProfilePic
                            showUploader={this.props.showUploader}
                            image={this.props.image}
                            first={this.props.first}
                            last={this.props.last}
                        />
                        <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
                    </div>
                </div>  
            </React.Fragment>
        );
    }
}
