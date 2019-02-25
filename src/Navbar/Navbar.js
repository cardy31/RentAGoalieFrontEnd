import React from 'react';
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    state = {
        'logged_in': this.props.logged_in,
        'is_goalie': this.props.is_goalie
    //    TODO: Pass the active page in as a prop
    };

    render () {
        if (this.state["logged_in"] === true) {
            if (this.state["is_goalie"] === true) {
                return (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link"> Home </Link></li>
                            <li><Link to={'/availablegames'} className="nav-link"> Available Games </Link></li>
                            <li><Link to={'/mygames'} className="nav-link"> My Games </Link></li>
                            <li
                                onClick={this.props.logout}>
                                <Link className="nav-link" to="/">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
            else {
                return (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link"> Home </Link></li>
                            <li><Link to={'/postagame'} className="nav-link"> Post A Game </Link></li>
                            <li><Link to={'/postedgames'} className="nav-link"> My Games </Link></li>
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
                    <li><Link to={'/'} className="nav-link"> Home </Link></li>
                    <li><Link to={'/login'} className="nav-link"> Login </Link></li>
                    <li><Link to={'/register'} className="nav-link"> Register </Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;