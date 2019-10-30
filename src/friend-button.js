import React, {useState, useEffect} from "react";
import axios from "./axios";

const FriendButton = props => {
    const [friendButton, setFriendButton] = useState("Make Friend Request");
    const [profileState, setProfileState] = useState(props);
  
    useEffect(()=>{
        (async ()=> {     
            {   const {data} = await axios.get("/user/" + profileState.id + "/status").catch(error => {
                console.log(error);
            });
            console.log("useeffect.data",data.rows[0]);
            console.log("useeffect.data>>",data.relation);
            if(!data.relation){
                setFriendButton("Make Friend Request");
            } else if(data.friends) {
                console.log("friends!!")
                setFriendButton("End Friendship");
            } else if(data.relation){
              
                setFriendButton("Cancel");
            }
            }
                                    
        }          
                                      
        )();
        return ()=> {
            //clean-up function
        };
    }, [props, friendButton]);

    const handleButton = e => {
        console.log(e);
        if(friendButton =="Make Friend Request"){
            console.log("make");
            (async () => {
                const { data } = await axios.post("/send-fr/"+ profileState.id);
                setFriendButton("Cancel");
            })();
         
        }else if(friendButton == "Accept Friendship"){
            (async () => {
                const { data } = await axios.post(
                    `/accept-fr/${profileState.id}`
                );
                setFriendButton("End Friendship");
            })();
        }else if (
            friendButton == "End Friendship" ||
            friendButton == "Cancel"
        ){
            (async () => {
                const { data } = await axios.post(`/cancel-fr/${profileState.id}`);
                setFriendButton("Make Friend Request");
            })();
        }
    };

    return(
        <div>
            <h1>Friend-Button #{profileState.id}</h1>
            <button
                onClick={() => handleButton()
                }
            >
                {friendButton}    {profileState.id}              
            </button>     
        </div>
    );
};

export default FriendButton;