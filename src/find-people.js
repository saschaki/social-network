import React, {useState, useEffect} from "react";
import axios from "./axios";

export default function FindPeople() {
    //image = image || "/img/default.png";
    const [userInput, setUserInput] = useState();
    const [users, setUsers] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const handleError = e => {
        e.target.setAttribute("src","/img/default.png");
        console.log("handle fired");
    };
    useEffect(()=>{
        // (1) useEffect will run when the component mounts and whenever we change state ( so whenever we change userInput or countries)
        // (2) with second argument [] acts like component mounts
        // (3) with second argument [countries] run when the component mounts AND when countries changes
        let ignore = false; //if ignore is false, that means the axios-response is good and i want top use it
        (async ()=> {     
            if (!userInput) {   const {data} = await axios.get("/users/recent").catch(error => {
                data.image="/img/default.png";
                console.log(error);
            });
        
            setRecentUsers(data);  
            } else {  const { data } = await axios.get(`/api/users/${userInput}`);
                !ignore ? setUsers(data) : console.log("ignored");   
            }
        }                               
        )();
        return ()=> {
            console.log("cleaning up!"); //clean-up function
            ignore = true;
        };
    }, [userInput]);

    return(
        <div>
            <h1>Find People</h1>
            <p>Checkout who just joined!</p>      
            {recentUsers.map(user=> (<a key={user.id} href={`/user/${user.id}`}> <img key={user.id} src={user.image} title={user.first+ " " + user.last} onError={e=>handleError(e)}/></a>) )}   
            <p>Are you looking for someone in particular ?</p>  
            <input
                name="user-input"
                type="text"
                onChange={e => setUserInput(e.target.value)}
            />
            {users.map(user => (                 
                (<a key={user.id} href={`/user/${user.id}`}> <img key={user.id} src={user.image} title={user.first+user.last} onError={e=>handleError(e)}/></a>  )                                    
            ))}
        </div>
    );
}