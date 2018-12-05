// import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
// import Homepage from './Homepage';
import React from 'react';
import Homepage from "./Homepage";

/* Home component */
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

// /* Category component */
// const Category = () => (
//     <div>
//         <h2>Category</h2>
//     </div>
// );
//
// /* Products component */
// const Products = () => (
//     <div>
//         <h2>Products</h2>
//     </div>
// );

/* App component */
class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/homepage">Homepage</Link></li>
                        {/*<li><Link to="/products">Products</Link></li>*/}
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>

                <Route exact path="/" component={Home}/>
                <Route exact path="/homepage" component={Homepage} />
                {/*<Route path="/products" component={Products}/>*/}
                <Route path="/login" component={LoginForm}/>

            </div>
        )
    }
}

export default App;