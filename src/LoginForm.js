import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <div className="container">
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <h1>Login</h1>
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handle_change}
                        placeholder="Username"
                        className="form-control col-md-3"
                    />
                </div>
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handle_change}
                        placeholder="Password"
                        className="form-control col-md-3"
                    />
                </div>
                <input className="btn btn-primary" type="submit" />
            </form>
            </div>
        );
    }
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};
