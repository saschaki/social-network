import React from "react";
//import axios from "./axios";

//needs to be a class because we need state
export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            url: this.selectedImage
        };
    }
    componentDidMount() {
        console.log("Uploader mounted");
        console.log("this.props", this.props);
    }

    muffinMaker() {
        this.props.methodInApp("lots of muffins");
    }

    upload() {
        console.log(this.selectedImage);
    }
    /*
    render() {
        return (
            <React.Fragment>
                <h3 onClick={() => this.muffinMaker()}>
                    This is my uploader component
                </h3>
            </React.Fragment>
        );
    }
*/
    render() {
        return (
            <React.Fragment>
                <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={this.selectImages}
                    className="chose-file-btn"
                />
                <button
                    onClick={() => this.upload()}
                    type="submit"
                    name="upload-btn"
                    className="uploadbtn"
                >
                    Upload
                </button>
            </React.Fragment>
        );
    }
}
