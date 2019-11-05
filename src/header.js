import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
        };        
    }

    componentDidMount(){
        console.log("Header mounted");
    }

    render(){
        return(
            <div className="header"> 
                <div className="headerlogoleft">    {" "}
                    <img id="logo" src="/assets/disconnect.jpg"/> </div>                   
                <div className="headerlinks" id="links">
                    <Link to="/chat">Chat</Link>                                    
                    <Link to="/friends">Friends</Link>
                    <Link to="/discover">Discover</Link>        
                    <a href="/logout">Logout</a>
                </div> 
                <div className="headerlogoright">  <a href="/">
                    <img id="self" src={this.props.image}/> 
                </a></div>
                                 
            </div>
        );
    }
}
