import React from 'react';
import {withRouter} from "react-router";
import { Link, Route } from 'react-router-dom';
import AvailableGames from "./AvailableGames";
import AcceptedGames from "./AcceptedGames";
import Home from "./Home";
import PropTypes from "prop-types";

class Goalie extends React.Component {


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/findagame">Find a Game</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/acceptedgames">Accepted Games</Link></li>
                        <li className="nav-item" onClick={this.props.handle_logout}><Link className="nav-link" to="/">Logout</Link></li>
                    </ul>
                </nav>

                <Route exact path="/" component={Home}/>
                <Route path="/findagame" render={(props) => (
                    <AvailableGames {...props} games={localStorage.getItem('games')}/>
                )}/>
                <Route path="/acceptedgames" render={(props) => (
                    <AcceptedGames {...props} games={localStorage.getItem('games')}/>
                )}/>
            </div>
        )
    }
}

export default withRouter(Goalie);

Goalie.propTypes = {
    handle_logout: PropTypes.func.isRequired
};