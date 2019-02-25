import React from 'react';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        
        try {
            console.log(props.location.state["register_show"]);
        }
        catch (e) {
            props.location.state = {"register_show": false}
        }

        console.log("Props: ", props);
        console.log(props.location);
        // props.location.state = {register_show: false}
        // console.log(props.location);

        this.state = {
            username: 'cardy',
            password: 'cheese123',
            failed_login: false,
            message: this.props.message,
            register_show: this.props.location.state.register_show
        };
        console.log(this.props)
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    handle_login = (e, data) => {
        e.preventDefault();
        let body = {
            'username': this.state["username"],
            'password': this.state["password"]
        };
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(json => {
                if (!json.hasOwnProperty('token')){
                    // Record that the Login failed
                    this.setState({"failed_login": true});
                    return false
                }
                localStorage.setItem('token', json["token"]);
                // Get user details
                fetch('http://localhost:8000/user/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    },
                })
                    .then(res => res.json())
                    .then(json => {
                        localStorage.setItem('user_id', json[0]['id']);
                        let url = 'http://localhost:8000/profile/' + localStorage.getItem("user_id") + '/';
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                Authorization: `Token ${localStorage.getItem('token')}`
                            },
                        })
                            .then(res => res.json())
                            .then(json => {
                                localStorage.setItem('is_goalie', json['is_goalie']);
                                console.log(localStorage.getItem('is_goalie'));
                                if (localStorage.getItem("is_goalie") === "true") {
                                    this.props.history.push("/availablegames")
                                } else {
                                    this.props.history.push("/postagame")
                                }
                            });
                    })
            })
    }; // End handle_login

    setLoginClass() {
        if (this.state["failed_login"] === true) {
            console.log("setting", this.state["failed_login"] === true);
            return "is-invalid"
        }
        return ""
    }

    setRegisterAlert() {
        console.log('State: ', this.state);
        if (this.state["register_show"] === true) {
            return <div className="alert alert-success" role="alert">
                Registration successful! Please activate your account using the link we emailed you, then login here.
            </div>
        }
        return <div> </div>
    }

    render() {
        // This is only rendered by bootstrap if it follows an input using the "is-invalid" class
        const login_error = <div className="invalid-feedback">
                    Sorry, those credentials didn't work. If you just registered, have you activated your account yet?
                </div>;

        return (
            <div>
                {this.props.nav}

                <div className="container">
                    {this.setRegisterAlert()}
                <form onSubmit={e => this.handle_login(e, this.state)}>
                    <h1>Login</h1>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                            placeholder="Username"
                            className={"form-control col-md-3 " + this.setLoginClass()}
                        />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handle_change}
                            placeholder="Password"
                            className={"form-control col-md-3 " + this.setLoginClass()}
                        />
                        {login_error}
                    </div>
                    <input className="btn btn-primary" type="submit" />
                </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    nav: PropTypes.func.isRequired
};

export default withRouter(LoginForm);

