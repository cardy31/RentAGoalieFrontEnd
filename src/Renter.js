import React from 'react';
import {withRouter} from "react-router";
import {Link, Route} from "react-router-dom";
import PostedGames from "./PostedGames";
import GameForm from "./GameForm";
import Home from "./Home";
import PropTypes from "prop-types";


class Renter extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/mygames">My Games</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/gameform">Post a Game</Link></li>
                        <li className="nav-item"  onClick={this.props.handle_logout}><Link className="nav-link" to="/">Logout</Link></li>

                    </ul>
                </nav>

                <Route exact path="/" component={Home}/>
                <Route path="/mygames" render={(props) => (
                    <PostedGames {...props} games={localStorage.getItem('games')}/>
                )}/>
                <Route path="/gameform" component={GameForm}/>
            </div>
        )
    }
}

export default withRouter(Renter);

Renter.propTypes = {
    handle_logout: PropTypes.func.isRequired,
};