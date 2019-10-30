import React from "react";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
        };        
    }

    componentDidMount(){
        console.log("Header mounted")
    }

    render(){
        return(
            <div className="header">                  
                <img id="logo" src="/assets/disconnect.jpg"/>
                <a href="">find People</a>
                <img id="self" src={this.props.image}/>       
            </div>
        );
    }
}