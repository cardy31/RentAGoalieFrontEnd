import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {
    // BrowserRouter as Router,
    // Route,
    // Link,
    Redirect,
    // withRouter
} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {username: 'cardy',
            password: 'cheese123',
            token: ''};

        console.log(props.history.location.state);

        // binding 'this'
        // this.login = this.login.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(this.props.history)
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
        // console.log('Token: ' + this.state['token']);
        // console.log(this.props.history)
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let self = this;

        let data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);

        axios({
            method: 'post',
            url: 'http://localhost:8000/api-token-auth/',
            data: data,
            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        })
            .then(function (response) {
                //handle success
                if (response.data['token'] !== undefined && response.data['token'].length > 0) {
                    // TODO: Load user home page
                    console.log("Yeah that worked: " + response.data['token']);

                    self.setState({token: response.data['token']});
                    self.props.history.location.state = {token: response.data['token']};

                    console.log('Redirecting to homepage');
                    console.log(self.props.history.location.state);

                    localStorage.setItem('token', response.data['token'])
                }
            })
            .catch(function (response) {
                // TODO: Handle a login failure properly
                console.log(response);
            });

    }

    render() {

        if (this.state['token'].length > 0) {
            return <Redirect to={{
                pathname: '/homepage',
                state: {token: this.state }
            }}/>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                    <h2>
                        Login
                    </h2>
                    <p>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    </label>
                    </p>
                    <p>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="button" value="Submit" onClick={this.handleSubmit}/>
                    </label>
                    </p>
            </form>
        );
    }


}

export default Login;
