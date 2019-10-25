import React from "react";
export default function ProfilePic({
    firstName,
    lastName,
    image,
    toggleModal
}) {
    console.log("profilepic", firstName, lastName, image);
    image = image || "/img/default.png";
    return (
        <React.Fragment>
            <div className="profile-pic-container">
                <img
                    src={image}
                    alt={(firstName, lastName)}
                    className="profile-pic"
                    onClick={toggleModal}
                />
                <h2>{firstName}</h2>
            </div>
        </React.Fragment>
    );
}
