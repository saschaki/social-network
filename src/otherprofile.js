import React from "react";
import axios from "./axios";

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
        console.log("id", this.props.match.params.id);
        console.log("history",this.props.history);
      
        const { data } = await axios.get(
            "/api/user/" + this.props.match.params.id
        );

       
       
        console.log("otherprofile data: ", data);
        console.log("equal?",data.data);
     
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

       
     
        //make an axios req to server asking for info about this.props.match.params.id
        // if there's no user with that id, redirect back to /
        // if the user is trying to visit their own page redirect them back to /
        //if (this.props.match.params.id == 1) {
            // imagine i'm logged in as user 6
         //   this.props.history.push("/");
       // }
    }
    render() {  
      
            return (               
                <React.Fragment>
                    <h1>Other Profile</h1>
                  <img src={this.state.image}/>
                  <p>Name: {this.state.first} {this.state.last}</p>
                  <p>{this.state.bio}</p>            
            </React.Fragment> 
               
            );
        
       
         
    
    } 
    

}
  


