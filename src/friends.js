import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    findFriendsAndWannabes,
    acceptFriendship,
    cancelFriendship
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state => state.users && state.users.filter(user => user.accepted)
    );
    const wannabees = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted === false)
    );

    useEffect(() => {
        dispatch(findFriendsAndWannabes());
    }, []);

    if (!friends || !wannabees) {
        return null;
    }

    return (
        <div className="friends-container">           
            <h3>Friends</h3>
            {friends.length == 0 && <p>You don´t have friends yet</p>}
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
           
              
                
                        
            {wannabees.length == 0 && (
                <p>No pending friend requests</p>
            )}
            
            {wannabees.length >0 &&  <h2>People who want to be friends</h2>  }
            {wannabees.length > 0 &&
                            wannabees.map(user => (
                                <div key={user.id} className="user">
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
    );
}
