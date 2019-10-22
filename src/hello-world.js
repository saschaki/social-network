import React from "react";
import CuteAnimals from "./cute-animals";

export default function HelloWorld() {
    let myFavouriteAnimal = "puppy";
    return (
        <React.Fragment>
            <div>
                Hello World!
                <CuteAnimals cuteAnimal={myFavouriteAnimal} />
            </div>
            {/* this is a comment inside of JSX*/}
        </React.Fragment>
    );
}
