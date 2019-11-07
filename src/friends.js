import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    findFriendsAndWannabes,
    acceptFriendship,
    cancelFriendship
} from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state => state.users && state.users.filter(user => user.accepted)
    );
    const wannabees = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted === false)
    );

    const pending = useSelector(
        state =>
            state.pending && state.pending.filter(user => user.accepted === false)
    );

    console.log("this is pending", pending);

    useEffect(() => {
        dispatch(findFriendsAndWannabes());
    }, []);

    if (!friends || !wannabees) {
        return null;
    }

    return (
        <div className="friends-container">  
            <div className="friends">                    
                {friends.length >0 &&   <h2>Friends</h2> }  
                {friends.length == 0 && <Link to="/member">Make some friends!</Link>}
                {friends.length > 0 &&
                            friends.map(user => (
                                <div key={user.id}>
                                    <a key={user.id} href={`/user/${user.id}`}>
                                        <img src={user.image || "/img/default.png"} />
                                 
                                        <h3>
                                            {user.first} {user.last}
                                        </h3>
                             
                                    </a>
                                    <div className="buttons">
                                        <button
                                            onClick={e =>
                                                dispatch(cancelFriendship(user.id))
                                            }
                                        >
                                            End Friendship
                                        </button>
                                    </div>
                                </div>
                            ))} 
            </div>  
            <div className="wannabe">                                                     
                {wannabees.length >0 &&  <h2>Want to be friends</h2>  }
                {wannabees.length > 0 &&
                            wannabees.map(user => (
                                <div key={user.id}>
                                    <a key={user.id} href={`/user/${user.id}`}>
                                        <img src={user.image || "/img/default.png"} />                               
                                        <h3>
                                            {user.first} {user.last}
                                        </h3>
                                    </a>
                                    <div className="buttons">
                                        <button
                                            onClick={e =>
                                                dispatch(
                                                    acceptFriendship(user.id)
                                                )
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={e =>
                                                dispatch(cancelFriendship(user.id))
                                            }
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
            </div>     
      
            <div className="pending-container"> 
                {pending.length >0 &&  <h2>Waiting for their answer</h2> }          
                {pending.length > 0 &&
                            pending.map(user => (
                                <div key={user.id}>
                                    <a key={user.id} href={`/user/${user.id}`}>
                                        <img src={user.image || "/img/default.png"} />                               
                                        <h3>
                                            {user.first} {user.last}
                                        </h3>
                                    </a>
                                    <button
                                        onClick={e =>
                                            dispatch(cancelFriendship(user.id))
                                        }
                                    >
                                        Cancel friend request
                                    </button>{" "}
                                </div>
                            ))}
            </div>               
        </div>  
    );
}
