import React, {useState, useEffect} from "react";
import axios from "./axios";

const FriendButton = props =>{
    const [button, setButton] = useState("");
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                "/user/" + props.id + "/status"
            );
            if (!data.relation) {
                setButton("Send Friend Request");
            } else {
                if (data.friends) {
                    setButton("End Friendship");
                } else { //related
                    if (props.id == data.rows[0].receiver_id) {
                        setButton("Cancel Friendship Request");
                    } else {
                        setButton("Accept Friendship");
                    }
                }
            }
        })();
    }, [props, button]);

    function handleFriendBtnClick() {
        if (button == "Send Friend Request") {
            (async () => {
                const { data } = await axios.post("/send-fr/"+ props.id);
                setButton("Cancel Friendship Request");
            })();
        } else if (button == "Accept Friendship") {
            console.log("accept");
            (async () => {
                const { data } = await axios.post(
                    `/accept-fr/${props.id}`
                );
                setButton("End Friendship");
            })();
        } else if (
            button == "End Friendship" ||
        button == "Cancel Friendship Request"
        ) {
            (async () => {
                const { data } = await axios.post(`/cancel-fr/${props.id}`);
                setButton("Send Friend Request");
            })();
        }
    }

    return (
        <div className="">
            <button onClick={handleFriendBtnClick}>{button}</button>
        </div>
    );

};

export default FriendButton;