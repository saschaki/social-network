import React from "react";
//props now destructured
export function ProfilePic({ firstName, lastName, imgUrl }) {
    console.log(firstName, lastName, imgUrl);
    imgUrl = imgUrl || "/img/default.png";
    return (
        <React.Fragment>
            <div className="profile-pic-container">
                <img src={imgUrl} alt={lastName} className="profile-pic" />
                <h2>{firstName}</h2>
            </div>
        </React.Fragment>
    );
}
