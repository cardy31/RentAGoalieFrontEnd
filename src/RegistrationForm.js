import React from 'react';
import PropTypes from 'prop-types';

class RegistrationForm extends React.Component {
    state = {
        username: '',
        password: '',
        email: ''
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
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <h4>Register</h4>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handle_change}
                />
                <br></br>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <br></br>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handle_change}
                />
                <br></br>
                <input type="submit" />

            </form>
        );
    }
}

export default RegistrationForm;

RegistrationForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};
