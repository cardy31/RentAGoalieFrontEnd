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
                <nav className="navbar navbar-light">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/availablegames">Available Games</Link></li>
                        <li><Link to="/acceptedgames">Accepted Games</Link></li>
                        <li onClick={this.props.handle_logout}><Link to="/">Logout</Link></li>
                    </ul>
                </nav>

                <Route exact path="/" component={Home}/>
                <Route path="/availablegames" render={(props) => (
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