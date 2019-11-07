import React from "react";

export default function ProfilePic({ image, showUploader, first, last }) {
    image = image || "/img/default.png";
    const handleError = e => {
        e.target.setAttribute("src","/img/default.png");
    };

    return (
        <React.Fragment>
            <div className="profile-pic-container">  
                <h1>{first} {last}</h1>          
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
