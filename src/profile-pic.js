import React from "react";
export default function ProfilePic({ image, showUploader }) {
    // image = image || "/img/default.png";
    const handleError = e => {
        e.target.setAttribute("src","/img/default.png");
        console.log("handle fired");
    };
    return (
        <React.Fragment>
            <div className="profile-pic-container">
                <img
                    src={image}
                    className="profile-pic"
                    onClick={showUploader}
                    onError={e=>handleError(e)}
                />
            </div>
        </React.Fragment>
    );
}
