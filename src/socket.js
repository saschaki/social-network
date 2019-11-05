import * as io from "socket.io-client";
import { chatMessages, chatMessage } from './actions';//onlineUSers,userjoined,userleft,newchatmessages

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("new chat message from the server", msg =>{
            console.log("this is from the server", msg);
        });

        socket.on(
            'chatMessages',
            msgs => store.dispatch(
                chatMessages(msgs)
            )
        );

        socket.on(
            'chatMessage',
            msg => store.dispatch(
                chatMessage(msg)
            )
        );
    }
};