import React from 'react';

class Home extends React.Component {

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Rent A Goalie</h1>
                <p className="lead">Welcome to Rent A Goalie! We have goalies, you have nets. Lets put them together!</p>
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group mr-2">
                    <a className="btn btn-primary btn-lg" href="http://localhost:3000/register" role="button">Register</a>
                        </div>
                    <div className="btn-group mr-2">
                        <a className="btn btn-light btn-lg" href="http://localhost:3000/login" role="button">Login</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;