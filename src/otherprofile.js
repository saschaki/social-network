import React from "react";
import axios from "./axios";
import FriendButton from "./friend-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            image: "",
            bio: "",
            equal: false
        };
    }

    async componentDidMount() {
        console.log("OtherProfile mounted");
        //console.log("id", this.props.match.params.id);
        //console.log("history",this.props.history); 
        const { data } = await axios.get(
            "/api/user/" + this.props.match.params.id
        );
     
        this.setState({
            image: data.image,
            first: data.first,
            last: data.last,
            bio: data.bio,
            equal: data.data
        });

        if(this.state.equal !=undefined || !Object.keys(data).length) 
        {
            this.props.history.push("/");   
        }
    }
    
    render() {    
        return (               
            <React.Fragment>
                <h1>Other Profile</h1>
                <div className="otherprofile">
                    <img className="otherprofileimg" src={this.state.image} title={this.state.first+ " " +this.state.last}/>
                </div>
                <p>Name: {this.state.first} {this.state.last}</p>
                <p>{this.state.bio}</p> 
                <FriendButton id={this.props.match.params.id}/>           
            </React.Fragment> 
               
        );
        
       
         
    
    } 
    

}
  


