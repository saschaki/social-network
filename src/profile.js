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
   
    render() {
        return (
            <React.Fragment>
                <div className="profile">            
                    <ProfilePic
                        first={this.props.first}
                        last={this.props.last}
                        showUploader={this.props.showUploader}
                        image={this.props.image}                   
                    />
                    <BioEditor bio={this.props.bio} setBio={this.props.setBio} />                  
                </div>  
            </React.Fragment>
        );
    }
}
