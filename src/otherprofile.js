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
                <div className="otherprofile">
                    <h1> {this.state.first} {this.state.last}</h1>             
                    <img className="otherprofileimg" src={this.state.image || "/img/default.png"} title={this.state.first+ " " +this.state.last}/>             
                    <p>{this.state.bio}</p>         
                    <FriendButton id={this.props.match.params.id}/> 
                </div>          
            </React.Fragment> 
               
        );
        
       
         
    
    } 
    

}
  


