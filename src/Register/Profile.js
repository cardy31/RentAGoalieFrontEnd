import React from 'react';
import GOOGLE_MAPS_KEY from "../Keys";

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);

        let is_goalie = true;
        if (localStorage.getItem('is_goalie') === 'false') {
            is_goalie = false;
        }

        this.state = {
            username: '',
            password: '',
            email: '',
            is_goalie: is_goalie,
            skill_level: 3,
            max_travel_distance: null,
            max_travel_invalid: false,
            location: '',
            center: {
                lat: 0,
                lng: 0
            },
            lookup_not_done: false,
            lookup_validated: false
        };
    }

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

    handle_goalie(e) {
        e.preventDefault();

        this.setState({
            lookup_not_done: false,
            max_travel_invalid: false,
        });

        let flag = false;

        if (this.state['center']['lat'] === 0 && this.state['center']['lng'] === 0) {
            this.setState({lookup_not_done: true});
            flag = true
        }

        if (this.state['max_travel_distance'] < 1) {
            this.setState({max_travel_invalid: true})
            flag = true
        }

        if (flag) {
            return false
        }

        let travel_distance = this.state['max_travel_distance'];

        if (travel_distance > 200) {
            travel_distance = 200
        }

        let body = {
            is_goalie: this.state['is_goalie'],
            latitude: this.state['center']['lat'],
            longitude: this.state['center']['lng'],
            max_travel_distance: travel_distance,
            skill_level: this.state['skill_level']
        };
        let url = 'http://localhost:8000/profile/' + localStorage.getItem('user_id') + '/';
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(json => {
                // TODO: Error checking after PATCH

                if (localStorage.getItem('unknown_goalie') !== null) {
                    localStorage.removeItem('unknown_goalie');
                }

                localStorage.setItem('is_goalie', 'true');

                this.props.history.push("/findagame");
            })
    }

    handle_renter(e) {
        e.preventDefault();

        let body = {
            is_goalie: this.state['is_goalie'],
        };
        let url = 'http://localhost:8000/profile/' + localStorage.getItem('user_id') + '/';
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(json => {
                // console.log(json);

                if (localStorage.getItem('unknown_goalie') !== null) {
                    localStorage.removeItem('unknown_goalie');
                }
                localStorage.setItem('is_goalie', 'false');
                this.props.history.push("/postagame");
            })

    }

    // TODO: This code along with the location input field duplicates code from GameForm.js. Figure out how to break it out into its own component.
    render_location(e) {
        e.preventDefault();
        this.setState({
            lookup_not_done: false,
            lookup_validated: false
        });
        let addressString = this.state["location"];

        if (addressString.length === 0) {
            this.setState({location_error: true})
        }
        addressString = addressString.replace(" ", "+");
        let urlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            addressString + "&key=" + GOOGLE_MAPS_KEY;
        fetch(urlString)
            .then(res => res.json())
            .then(json => {
                try {

                    this.setState(prevstate => {
                        const newState = { ...prevstate };
                        newState["location"] = json.results[0]["formatted_address"];
                        newState["center"] = json.results[0]["geometry"]["location"];
                        newState["zoom"] = 17;
                        newState["location_error"] = false;
                        newState["lookup_validated"] = true;
                        return newState;
                    });
                    if (this.state["location_error"] === true) {
                        this.setState(prevstate => {
                            const newState = { ...prevstate };
                            newState["location_error"] = false;
                            return newState
                        })
                    }
                }
                catch (e) {
                    this.setState(prevstate => {
                        const newState = { ...prevstate };
                        newState["location_error"] = true;
                        return newState
                    })
                }
            });
    }

    setLocationClass() {
        if (this.state['location_error'] === true) {
            return 'is-invalid'
        }
        return ''
    }

    setLookupClass() {
        if (this.state['lookup_not_done'] === true) {
            return 'is-invalid'
        }
        else if (this.state["lookup_validated"] === true) {
            return 'is-valid'
        }
        return ''
    }

    setMaxDistClass() {
        if (this.state['max_travel_invalid'] === true) {
            return 'is-invalid'
        }
        return ''
    }

    render() {
        const location_error = this.state["location_error"]
            ? <div className="invalid-feedback">
                Sorry, that location couldn't be found. Try adding more detail.
            </div> : "";

        const no_lookup = this.state['lookup_not_done']
        ? <div className="invalid-feedback">
                You should hit the lookup button before submitting. Thanks!
            </div> : "";

        const valid_lookup = this.state['lookup_validated']
            ? <div className="valid-feedback">
                That location looks good!
            </div> : "";

        const invalid_distance = this.state['max_travel_invalid']
        ? <div className="invalid-feedback">
                Your travel distance can't be less than 1km. Sorry!
            </div> : "";

        if (this.state["is_goalie"]) {
            return (
                <div>
                    {this.props.nav}
                    <div className="container">
                        <form onSubmit={e => this.handle_goalie(e)}>
                            <h1>Profile</h1>
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
                                <div className="input-group">
                                <input
                                    type="text"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.handle_change}
                                    className={"form-control col-md-6 " + this.setLocationClass() + this.setLookupClass()}
                                    placeholder="Home Location"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary"
                                            onClick={e => this.render_location(e)}
                                            type="button">Lookup</button>
                                </div>
                                {location_error}
                                {no_lookup}
                                {valid_lookup}
                                </div>
                                <small className="form-text text-muted">
                                    The location you want us to use to figure out what games are near you.
                                </small>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                <input
                                    type="number"
                                    name="max_travel_distance"
                                    defaultValue={this.state.max_travel_distance}
                                    onChange={this.handle_change}
                                    placeholder="Max Travel Distance"
                                    className={"form-control col-md-6 " + this.setMaxDistClass()}
                                />
                                {invalid_distance}
                                </div>
                                <small className="form-text text-muted">
                                    How far (in kms) you're willing to travel from the above location to play.
                                </small>
                            </div>


                            <div className="form-group">
                                <label htmlFor="skill_level">Skill Level</label>
                                    <div className="input-group ">
                                        <select className={"form-control col-md-6"} defaultValue={this.state.skill_level} onChange={this.handle_skill_change}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                <small className="form-text text-muted">
                                    1 is highest, 5 is lowest.
                                </small>
                            </div>


                            <div className="form-group">
                                <input className="btn btn-primary" type="submit" />
                            </div>

                        </form>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    {this.props.nav}
                    <div className="container">
                        <form onSubmit={e => this.handle_renter(e)}>
                            <h1>Profile</h1>
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
                            <h3>No more info needed from you right now!</h3>
                            <div className="form-group">
                                <input className="btn btn-primary" type="submit" value="Finish"/>
                            </div>

                        </form>
                    </div>
                </div>
            );
        }

    }
}

export default ProfileForm;
