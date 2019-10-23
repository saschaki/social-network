import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount() {
        console.log("registration mounted");
    }

    handleChange({ target }) {
        //let target = e.target
        //this[target.name]= target.value
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        console.log("submitted");
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/"); //worked
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    /*
    login() {
        console.log("login");
        location.replace("/login"); //worked
    }
*/
    render() {
        return (
            <div className="container">
                {this.state.error && (
                    <div className="error">You ruined everything ! !</div>
                )}
                <h1>Welcome to the social Network </h1>
                <div className="input-container">
                    <input
                        name="first"
                        placeholder="first"
                        maxLength="255"
                        pattern="^[a-zA-Z ]+$"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="last"
                        maxLength="255"
                        pattern="^[a-zA-Z ]+$"
                        required
                        onChange={e => this.handleChange(e)}
                    />
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
                        Register
                    </button>
                    <p>
                        Already a member ? <Link to="/login">Log in!</Link>
                    </p>
                </div>
            </div>
        );
    }
}
