import React from "react";
export default function ProfilePic({ image, showUploader }) {
    image = image || "/img/default.png";
    return (
        <React.Fragment>
            <div className="profile-pic-container">
                <img
                    src={image}
                    className="profile-pic"
                    onClick={showUploader}
                />
            </div>
        </React.Fragment>
    );
}
