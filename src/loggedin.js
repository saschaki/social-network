import React from "react";

export default class Loggedin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    render() {
        return (
            <div className="container">
                {this.state.error && (
                    <div className="error">
                        Pathetic! You messed up, stupid!
                    </div>
                )}
                <h1>Logged IN!</h1>
            </div>
        );
    }
}
