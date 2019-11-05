  
import axios from "./axios";

export async function findFriendsAndWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "GET_FRIENDS",
        users: data
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
