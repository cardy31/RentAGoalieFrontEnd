import React from 'react';

class RegistrationForm extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        is_goalie: true
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

    handle_button_change = e => {
        e.preventDefault();

        // TODO: Handle logic to make buttons active/inactive
        let value;

        value = e.target["value"] === "goalie";

        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState["is_goalie"] = value;
            return newState;
        });
    };

    goalie_is_active() {
        if (this.state["is_goalie"] === true) {
            return "btn btn-outline-secondary active"
        }
        return "btn btn-outline-secondary"

    };

    renter_is_active() {
        if (this.state["is_goalie"] === false) {
            return "btn btn-outline-secondary active"
        }
        return "btn btn-outline-secondary"
    };

    handle_register(e, data) {
        e.preventDefault();

        let body = {
            "username": this.state["username"],
            "password": this.state["password"],
            "email": this.state["email"],
            "is_goalie": this.state["is_goalie"]
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
            <div className="container">
                <form onSubmit={e => this.handle_register(e)}>
                    <h1>Register</h1>
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
                    <div className="form-group input-group">
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
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                        </div>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handle_change}
                            placeholder="Email"
                            className="form-control col-md-3"
                        />
                    </div>

                    <div className="form-group btn-group" role="group">
                        <button type="button"
                                className={this.goalie_is_active()}
                                value="goalie"
                                onClick={this.handle_button_change}>
                            I'm a Goalie
                        </button>
                        <button type="button"
                                className={this.renter_is_active()}
                                value="renter"
                                onClick={this.handle_button_change}>
                            I Need a Goalie
                        </button>
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" />
                    </div>

                </form>
            </div>
        );
    }
}

export default RegistrationForm;
