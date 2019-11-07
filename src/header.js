import React from "react";
import { NavLink } from "react-router-dom";

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
                    <div><NavLink exact activeClassName="active" to="/">Home</NavLink></div>
                    <div><NavLink activeClassName="active" to="/chat">Chat</NavLink></div>
                    <div><NavLink activeClassName="active" to="/friends">Friends</NavLink></div>                          
                    <div><NavLink activeClassName="active" to="/member">Member</NavLink></div>
                    <div><a href="/logout">Logout</a></div>             
                </div> 
                <div className="headerlogoright">  <a href="/">
                    <img id="self" src={this.props.image}/> 
                </a></div>
                                 
            </div>
        );
    }
}
