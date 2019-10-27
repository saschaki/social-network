import React from "react";
import axios from "./axios";

//needs to be a class because we need state
export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("Uploader mounted");
    }
    upload() {
        var fd = new FormData();
        fd.append("image", this.state.file);
        axios
            .post("/upload", fd)
            .then(({ data }) => {
                this.props.setImage(data[0].image);
            })
            .catch(err => console.log("uploaderror", err));
    }
    //

    render() {
        return (
            <React.Fragment>
                <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        this.setState({ file: e.target.files[0] });
                    }}
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
