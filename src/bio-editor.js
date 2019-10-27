import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            bioEditorIsVisible: false,
            bio: ""
        };
    }

    componentDidMount() {}

    editBio() {
        axios
            .post("/editbio", { bio: this.state.bio })
            .then(({ data }) => {
                this.props.setBio(data.bio);
                this.setState({ bioEditorIsVisible: false });
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="bio">
                <h1>
                    {this.props.first} {""}
                    {this.props.last}
                </h1>
                <p>{this.props.bio}</p>
                {!this.props.bio && !this.state.bioEditorIsVisible && (
                    <button
                        onClick={() =>
                            this.setState({
                                bioEditorIsVisible: !this.state
                                    .bioEditorIsVisible
                            })
                        }
                    >
                        {" "}
                        Add your bio now
                    </button>
                )}
                {this.props.bio && !this.state.bioEditorIsVisible && (
                    <button
                        onClick={() =>
                            this.setState({
                                bioEditorIsVisible: !this.state
                                    .bioEditorIsVisible
                            })
                        }
                    >
                        Edit Bio
                    </button>
                )}
                {this.state.bioEditorIsVisible && (
                    <div className="edit">
                        <textarea
                            defaultValue={this.props.bio}
                            name="bio"
                            onChange={e => {
                                this.setState({ bio: e.target.value });
                            }}
                        />
                        <button onClick={() => this.editBio()}>Save</button>
                    </div>
                )}
            </div>
        );
    }
}
