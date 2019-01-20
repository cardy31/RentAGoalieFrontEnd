import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import React from 'react';
import Games from './Games';

/* Home component */
const Home = () => (
    <div>
        <h2>Home</h2>
        <p>Welcome to Rent A Goalie! We have goalies, you have nets. Lets put them together!</p>
    </div>
);

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
            username: ''
        };
    }

    // Get the username if we already have a token stored
    // componentDidMount() {
    //     if (this.state.logged_in) {
    //         // TODO: Fix this for a different endpoint
    //         fetch('http://localhost:8000/core/current_user/', {
    //             headers: {
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(json => {
    //                 this.setState({ username: json.username });
    //             });
    //     }
    // }

    handle_logout = () => {
        localStorage.removeItem('token');
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
            });
    };

    // render() {
    //     let form;
    //     switch (this.state.displayed_form) {
    //         case 'login':
    //             form = <LoginForm handle_login={this.handle_login} />;
    //             break;
    //         // case 'signup':
    //         //     form = <SignupForm handle_signup={this.handle_signup} />;
    //         //     break;
    //         default:
    //             form = null;
    //     }
    //
    //     return (
    //         <div className="App">
    //             <Nav
    //                 logged_in={this.state.logged_in}
    //                 display_form={this.display_form}
    //                 handle_logout={this.handle_logout}
    //             />
    //             {form}
    //             <h3>
    //                 {this.state.logged_in
    //                     ? `Hello, ${this.state.username}`
    //                     : 'Please Log In'}
    //             </h3>
    //         </div>
    //     );
    // }


    render() {
        // let form;
        // switch (this.state.displayed_form) {
        //     case 'login':
        //         form = <LoginForm handle_login={this.handle_login} />;
        //         break;
        //     // case 'signup':
        //     //     form = <SignupForm handle_signup={this.handle_signup} />;
        //     //     break;
        //     default:
        //         form = null;
        // }

        console.log(this.state);
        console.log(localStorage.getItem("token"));

        if (this.state['logged_in'] === true) {
            return (
                <div>
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li onClick={this.handle_logout}>Logout</li>

                        </ul>
                    </nav>

                    <Route exact path="/" component={Home}/>
                    <Route path="/games" component={Games}/>
                    <PropsRoute path="/login" component={LoginForm} handle_login={this.handle_login}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>

                    <Route exact path="/" component={Home}/>
                    <PropsRoute path="/login" component={LoginForm} handle_login={this.handle_login}/>

                </div>
            )
        }
    }
}



export default App;