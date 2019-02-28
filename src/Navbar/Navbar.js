import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'logged_in': this.props.logged_in,
            'is_goalie': this.props.is_goalie
        };

        if (localStorage.getItem('is_goalie') === 'true') {
            this.state = {
                'logged_in': this.props.logged_in,
                'is_goalie': true
            };
        }
        else {
            this.state = {
                'logged_in': this.props.logged_in,
                'is_goalie': false
            };
        }
    }

    is_active(path) {
        let curr_path = window.location.pathname;
        if (path === curr_path) {
            return "active"
        }
        return ""
    }

    render () {
        if (localStorage.getItem('is_goalie')) {
            if (this.state["is_goalie"] === true) {
                return (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className={"nav-link " + this.is_active('/')}> Home </Link></li>
                            <li><Link to={'/findagame'} className={"nav-link " + this.is_active('/findagame')}> Find A Game </Link></li>
                            <li><Link to={'/mygames'} className={"nav-link " + this.is_active('/mygames')}> My Games </Link></li>
                            <li><Link to={'/profile'} className={"nav-link " + this.is_active('/profile')}> Profile </Link></li>
                            <li
                                onClick={this.props.logout}>
                                <Link className="nav-link" to="/">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                )
            } else if (localStorage.getItem('unknown_goalie') === 'true') {
                return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className={"nav-link " + this.is_active('/')}> Home </Link></li>
                        <li><Link to={'/profile'} className={"nav-link " + this.is_active('/profile')}> Profile </Link></li>
                        <li
                            onClick={this.props.logout}>
                            <Link className="nav-link" to="/">Logout</Link>
                        </li>
                    </ul>
                </nav>
                );
            }
            else {
                return (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className={"nav-link " + this.is_active('/')}> Home </Link></li>
                            <li><Link to={'/postagame'} className={"nav-link " + this.is_active('/postagame')}> Post A Game </Link></li>
                            <li><Link to={'/postedgames'} className={"nav-link " + this.is_active('/postedgames')}> My Games </Link></li>
                            <li><Link to={'/profile'} className={"nav-link " + this.is_active('/profile')}> Profile </Link></li>
                            <li
                                onClick={this.props.logout}>
                                <Link className="nav-link" to="/">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className={"nav-link " + this.is_active('/')}> Home </Link></li>
                    <li><Link to={'/login'} className={"nav-link " + this.is_active('/login')}> Login </Link></li>
                    <li><Link to={'/register'} className={"nav-link " + this.is_active('/register')}> Register </Link></li>
                </ul>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired
};

export default Navbar;