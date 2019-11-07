import axios from "./axios";

export async function findFriendsAndWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "GET_FRIENDS",
        users: data.friendWannabes,
        pending: data.rows
    };
}

export async function acceptFriendship(id) {
    await axios.post(`/accept-fr/${id}`);
    return {
        type: "ACCEPT_REQUEST",
        id
    };
}

export async function cancelFriendship(id) {
    await axios.post(`/cancel-fr/${id}`);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export async function getLastTenChatMessages(msgs) {
    return {
        type: "CHAT",
        messages: msgs
    };
}

export async function newMessage(msg) {
    return {
        type: "NEW",
        message: msg
    };
}

export async function onlineUsers(usr) {

    return {
        type: 'ONLINE_USERS',
        onlineUsers: usr
    };
} 


