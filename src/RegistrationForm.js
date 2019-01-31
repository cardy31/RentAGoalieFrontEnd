import React from 'react';

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

    handle_register(e, data) {
        e.preventDefault();

        let body = {
            "username": data["username"],
            "password": data["password"],
            "email": data["email"]
        };
        let url = "http://localhost:8000/user/";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);

                this.props.history.push("/login");
            })

    }

    render() {
        return (
            <form onSubmit={e => this.handle_register(e, this.state)}>
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
