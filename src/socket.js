//import { chatMessages, chatMessage } from './actions';//onlineUSers,userjoined,userleft,newchatmessages
import { getLastTenChatMessages, newMessage, onlineUsers} from "./actions";

import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("getLastTenChatMessages", msgs => {
            store.dispatch(getLastTenChatMessages(msgs));
        });

        socket.on("newMessage", msg => {
            store.dispatch(newMessage(msg));
        });

        socket.on("onlineUsers", users => {store.dispatch(onlineUsers(users));
        });

    }
};