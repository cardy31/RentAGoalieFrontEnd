import { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import React from 'react';
import RegistrationForm from "./Register/RegistrationForm";
// import { withRouter } from "react-router";
import PropTypes from "prop-types";
import HomePage from "./HomePage/HomePage";
import AvailableGames from './Goalie/AvailableGames';
import MyGames from './Goalie/MyGames';
// import { PrivateRoute } from "./_components";
import GameForm from "./Renter/GameForm";
import PostedGames from "./Renter/PostedGames";
import Navbar from "./Navbar/Navbar"


// const renderMergedProps = (component, ...rest) => {
//     const finalProps = Object.assign({}, ...rest);
//     return (
//         React.createElement(component, finalProps)
//     );
// };
//
// const PropsRoute = ({ component, ...rest }) => {
//     return (
//         <Route {...rest} render={routeProps => {
//             return renderMergedProps(component, routeProps, rest);
//         }}/>
//     );
// };

/* App component */
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: '',
            user_id: 0,
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };

        this.updateNavbar = this.updateNavbar.bind(this)
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_goalie');
        localStorage.removeItem('user_id');
        this.setState({ logged_in: false, username: '' });
        this.updateNavbar();
    };

    updateNavbar() {
        if (localStorage.getItem('token')) {
            this.setState(prevstate => {
                const newState = { ...prevstate };
                newState["logged_in"] = true;
                return newState;
            });
        }
        console.log(this.state)
    };

    render() {
        // console.log("Rendering in app");
        // console.log(this.state)
        // if (this.state['logged_in'] === true) {
        //     console.log("Logged in");
        //     if (localStorage.getItem('is_goalie') === "true"){
        //         return (
        //             <div>
        //                 <Goalie handle_logout={this.handle_logout}/>
        //             </div>
        //         )
        //     }
        //     else {
        //         return (
        //             <div>
        //                 <Renter handle_logout={this.handle_logout}/>
        //             </div>
        //         )
        //     }
        // }
        // // Not logged in
        // else {
        //     return (
        //         <div>
        //             <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //                 <ul className="navbar-nav mr-auto">
        //                     <li className="nav-item"><Link className="nav-link" to="/">HomePage</Link></li>
        //                     <li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
        //                     <li className="nav-item"><Link className="nav-link" to="/Register">Register</Link></li>
        //                 </ul>
        //             </nav>
        //
        //             <Route exact path="/" component={HomePage}/>
        //             <PropsRoute path="/Login" component={LoginForm}
        //                         // successful_login={this.successful_login}
        //                         // failed_login={this.state["failed_login"]}
        //             />
        //             <PropsRoute path="/Register" component={RegistrationForm}/>
        //
        //         </div>
        //     )
        // }

        let mynav =
            <Navbar logged_in={this.state["logged_in"]}
                    is_goalie={localStorage.getItem("is_goalie") === "true"}
                    logout={this.handle_logout}
            />;

        return (
            <Router>
                <div>
                        <Route exact path="/"
                               render={(props) => <HomePage {...props}
                                                            nav={mynav}/>}/>
                        <Route path="/login"
                               render={(props) => <LoginForm {...props}
                                                             update={this.updateNavbar}
                                                             nav={mynav}/>}/>
                        <Route path="/register"
                               render={(props) => <RegistrationForm {...props}
                                                                    nav={mynav}/>}/>
                        <Route path="/availablegames"
                               render={(props) => <AvailableGames {...props}
                                                                  nav={mynav}/>}/>
                        <Route path="/mygames"
                               render={(props) => <MyGames {...props}
                                                           nav={mynav}/>}/>
                        <Route path="/postagame"
                               render={(props) => <GameForm {...props}
                                                            nav={mynav}/>}/>
                        <Route path="/postedgames"
                               render={(props) => <PostedGames {...props}
                                                               nav={mynav}/>}/>
                </div>
            </Router>
        )
    }
}

export default App;