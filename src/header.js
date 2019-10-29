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
                <img src="/assets/disconnect.jpg"/>
                <img src={this.props.image}/>       
            </div>
        );
    }
}