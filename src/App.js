import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import React from 'react';
import RegistrationForm from "./RegistrationForm";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Home from "./Home";
import Goalie from "./Goalie";
import Renter from "./Renter";


const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

/* App component */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: '',
            user_id: -1,
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired
        };
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_goalie');
        localStorage.removeItem('user_id');
        this.setState({ logged_in: false, username: '' });
    };

    handle_login = (e, data) => {
        e.preventDefault();
        let username = data.username;
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                console.log(json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: username
                });
                fetch('http://localhost:8000/user/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    },
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json[0]);
                        this.setState({user_id: json[0]['id']});
                        localStorage.setItem('user_id', json[0]['id']);
                        let url = 'http://localhost:8000/game/';
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                Authorization: `Token ${localStorage.getItem('token')}`
                            },
                        })
                            .then(res => res.json())
                            .then(json => {
                                localStorage.setItem('games', json);
                                let url = 'http://localhost:8000/profile/' + json[0]['id'] + '/';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        Authorization: `Token ${localStorage.getItem('token')}`
                                    },
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        localStorage.setItem('is_goalie', json['is_goalie']);
                                        console.log(json['is_goalie']);
                                        console.log(json);
                                        this.render()
                                    });
                            })
                    })
            })
    }; // End handle_login


    render() {
        console.log(this.state);
        console.log(localStorage.getItem("token"));

        if (this.state['logged_in'] === true) {
            if (localStorage.getItem('is_goalie') === 'true'){
                return (
                    <div>
                        <Goalie handle_logout={this.handle_logout}/>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <Renter handle_logout={this.handle_logout}/>
                    </div>
                )
            }
        }
        // Not logged in
        else {
            return (
                <div>
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </nav>

                    <Route exact path="/" component={Home}/>
                    <PropsRoute path="/login" component={LoginForm} handle_login={this.handle_login}/>
                    <PropsRoute path="/register" component={RegistrationForm}/>

                </div>
            )
        }
    }
}

export default withRouter(App);