import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios'

class Homepage extends Component {
    constructor(props) {
        super(props);

        console.log('State printing below:');
        console.log(localStorage.getItem('token'))
    }

    render() {
        return (
            <div>
            <h1>
                Homepage
            </h1>
                <h1>
                    Available Games
                </h1>

                <table>

                </table>
                <h1>
                    Your Upcoming Games
                </h1>
                <table>

                </table>
            </div>
        );
    }
}

export default Homepage;