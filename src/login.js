import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount() {
        console.log("login mounted");
    }

    handleChange({ target }) {
        //let target = e.target
        //this[target.name]= target.value
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        console.log("login submitted");
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                data.success ? location.replace("/") :  this.setState({error: true});
                /*
                if (data.success) {
                    location.replace("/"); //worked
                } else {
                    this.setState({
                        error: true
                    });
                } */
            });
    }

    render() {
        return (
            <div className="container">
                {this.state.error && (
                    <div className="error">You ruined everything ! !</div>
                )}
                <h1>Log in</h1>
                <div className="input-container">
                    <input
                        name="email"
                        placeholder="email"
                        type="email"
                        autoComplete="new-password"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        onClick={() => this.submit()}
                        className="register-button"
                    >
                        Log in
                    </button>
                </div>
            </div>
        );
    }
}
