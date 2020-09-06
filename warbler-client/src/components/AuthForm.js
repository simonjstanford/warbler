import React, {Component } from "react";

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        }
    }

    render() {
        const {email, username, password, profileImageUrl} = this.state;
        const {heading, buttonText} = this.props;
        return (
            <div>
                <div className="row justify-content-md-centre text-centre">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor="email">Email:</label>
                            <input className="form-control" id="email" name="email" onChange={this.handleSubmit} value={email} type="email"/>
                            <label htmlFor="password">Password:</label>
                            <input className="form-control" id="password" name="password" onChange={this.handleSubmit} value={password} type="password"/>
                        </form>
                    </div>   
                </div>
            </div>
        );
    }
}
