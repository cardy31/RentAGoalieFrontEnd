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
                <nav className="navbar navbar-light">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/mygames">My Games</Link></li>
                        <li><Link to="/gameform">Post Game</Link></li>
                        <li onClick={this.props.handle_logout}><Link to="/">Logout</Link></li>

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