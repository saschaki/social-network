import React from "react";
import Uploader from "./uploader";
import { BrowserRouter, Route} from "react-router-dom";
import axios from "./axios";
import Profile from "./profile";
import {OtherProfile} from "./otherprofile";
import Header from "./header";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            image: "",
            bio: "",
            file: null,
            uploaderIsVisible: false,
        };
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showUploader = this.showUploader.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
    }

    showUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    setImage(newUrl) {
        this.setState({ image: newUrl });
    }

    setBio(newBio) {
        this.setState({ bio: newBio });
    }

    render() {
     
        return (   
            <BrowserRouter>
                <div>
                    <Header
                        image={this.state.image}/>        
                    <Route exact path="/" render={
                         props=>(  <div>
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                showUploader={this.showUploader}
                                bio={this.state.bio}
                                setBio={this.setBio}
                            />
                        </div>)
                      
                    } 
                    />
                    <Route 
                        exact path="/user/:id"
                        render={props => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />                             
                    {this.state.uploaderIsVisible && 
                    <Uploader setImage={this.setImage} />
                    }
                </div>
            </BrowserRouter>
        );
    }
}
