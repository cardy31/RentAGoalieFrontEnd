import React from 'react';
import {withRouter} from "react-router";


class RegistrationForm extends React.Component {
    state = {
        username: '',
        failed_user: false,
        user_error: '',
        firstname: '',
        failed_firstname: false,
        firstname_error: '',
        lastname: '',
        failed_lastname: false,
        lastname_error: '',
        password: '',
        failed_password: false,
        password_error: '',
        email: '',
        failed_email: false,
        email_error: ''
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

    setUsernameClass() {
        if (this.state["failed_user"] === true) {
            return "is-invalid"
        }
        return ""
    }

    setFirstnameClass() {
        if (this.state["failed_firstname"] === true) {
            return "is-invalid"
        }
        return ""
    }

    setLastnameClass() {
        if (this.state["failed_lastname"] === true) {
            return "is-invalid"
        }
        return ""
    }

    // TODO: Put in some password checks that are decent but not annoying
    setPasswordClass() {
        if (this.state["failed_password"] === true) {
            return "is-invalid"
        }
        return ""
    }

    setEmailClass() {
        if (this.state["failed_email"] === true) {
            return "is-invalid"
        }
        return ""
    }

    handle_register(e) {
        e.preventDefault();

        this.setState(
            {
                failed_user: false,
                failed_firstname: false,
                failed_lastname: false,
                failed_password: false,
                failed_email: false
        });
        let flag = false;
        if (this.state["username"] === "") {
            flag = true;
            this.setState({
                failed_user: true,
                user_error: "Username cannot be blank"
            })
        }
        if (this.state["firstname"] === "") {
            flag = true;
            this.setState({
                failed_firstname: true,
                firstname_error: "Firstname cannot be blank"
            })
        }
        if (this.state["lastname"] === "") {
            flag = true;
            this.setState({
                failed_lastname: true,
                lastname_error: "Lastname cannot be blank"
            })
        }
        if (this.state["password"] === "") {
            flag = true;
            this.setState({
                failed_password: true,
                password_error: "Password cannot be blank"
            })
        }
        else if (this.state["password"].length < 6) {
            flag = true;
            this.setState({
                failed_password: true,
                password_error: "Password need to be at least 6 characters long"
            })
        }
        if (this.state["email"] === "") {
            flag = true;
            this.setState({
                failed_email: true,
                email_error: "Email cannot be blank"
            })
        }

        if (flag) {
            return false
        }

        let body = {
            "username": this.state["username"],
            "password": this.state["password"],
            "email": this.state["email"],
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
                // TODO: Check for errors in submission
                // let flag = false;
                // if (json.hasOwnProperty("username") && json["username"][0] === "A user with that username already exists.") {
                //     this.setState({
                //         failed_user: true,
                //         user_error: "Sorry, that username is taken. Please try a different one."
                //     });
                //     flag = true
                // }
                //
                // if (json.hasOwnProperty("email") && json["email"][0] === "Enter a valid email address.") {
                //     this.setState({
                //         failed_email: true,
                //         email_error: "Sorry, that email is invalid or already in use. If you're having issues with registering, please email support@rentagoalie.com for help."
                //     });
                //     flag = true
                // }

                // if (!flag) {
                if (true) {
                    // TODO: Pass a prop to login that puts a banner saying that registration worked
                    this.props.history.push({
                        pathname: "/Login",
                        state: {register_show: true}
                    });
                }
            })

    }

    render() {
        const username_error = <div className="invalid-feedback">
            {this.state["user_error"]}
        </div>;

        const firstname_error = <div className="invalid-feedback">
            {this.state["firstname_error"]}
        </div>;

        const lastname_error = <div className="invalid-feedback">
            {this.state["lastname_error"]}
        </div>;

        const password_error = <div className="invalid-feedback">
            {this.state["password_error"]}
        </div>;

        const email_error = <div className="invalid-feedback">
            {this.state["email_error"]}
        </div>;

        return (
            <div>
                {this.props.nav}
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
                            className={"form-control col-md-3 " + this.setUsernameClass()}
                        />
                        {username_error}
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-hockey-puck"></i></span>
                        </div>
                        <input
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handle_change}
                            placeholder="Firstname"
                            className={"form-control col-md-3 " + this.setFirstnameClass()}
                        />
                        {firstname_error}
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-hockey-puck"></i></span>
                        </div>
                        <input
                            type="text"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handle_change}
                            placeholder="Lastname"
                            className={"form-control col-md-3 " + this.setLastnameClass()}
                        />
                        {lastname_error}
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
                            className={"form-control col-md-3 " + this.setPasswordClass()}
                        />
                        {password_error}
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
                            className={"form-control col-md-3 " + this.setEmailClass()}
                        />
                        {email_error}
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" />
                    </div>

                </form>
            </div>
            </div>
        );
    }
}

export default withRouter(RegistrationForm);
