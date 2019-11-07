import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.messages);
    const onlineUsers = useSelector(state => state.onlineUsers && state.onlineUsers);
    // const onlineUsers = useSelector(state => state && state.usersOnline);
    const elemRef = useRef();
   
    useEffect(() => {
        if (!elemRef.current) {
            return;
        }
        console.log("current: ", elemRef.current);
        console.log("chat mounted: ");
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);
    
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("keycheck: ", e.target.value);
            console.log("keycode: ", e.key);
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }   
    return (
        <div className="chat">
            <h1>CHAT ROOM</h1> 
            <div className="online">
                {onlineUsers.length >0 &&(<h3>others online:</h3>)}
                {onlineUsers.map(usr => (
                    <span key={usr.id}> <a key={usr.id} href={`/user/${usr.id}`}> <img src={usr.image} title={usr.first+ " "+ usr.last} className="chat-img"/></a></span>        
                ))}  
            </div>
            <div className="chat-container" ref={elemRef}>
                {!!chatMessages && chatMessages.length == 0 && (
                    <p>No messages</p>
                )}
                {!!chatMessages &&
                        chatMessages.length > 0 &&
                        chatMessages.map(msg => (
                            <div key={msg.created_at} className="chat-message-container">
                                <a key={msg.id} href={`/user/${msg.id}`}>  
                                    <img src={msg.image} className="chat-img"/>
                                </a>
                                <div className="chat-message-column">
                                    <span>
                                        {msg.first} {msg.last} , {(msg.created_at).slice(11,16)}
                                    </span>
                                    <p>{msg.message}</p>  
                                </div>                      
                            </div>
                        ))}
            </div>                                                   
            <textarea 
                className="inputMessage"
                placeholder="Type a message..."             
                onKeyDown={keyCheck}>
            </textarea>
        </div>
    );
}
