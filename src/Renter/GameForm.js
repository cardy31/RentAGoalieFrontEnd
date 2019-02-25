import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GOOGLE_MAPS_KEY from "../Keys.js"
// import MapUpdate from "./MapComponent"
import {Redirect, withRouter} from "react-router";


class GameForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            location: "",
            skill_level: 1,
            center: {
                lat: 43.4516395,
                lng: -80.49253369999997
            },
            zoom: 15,
            isMarkerShown: false,
            two_goalies_needed: false,
            location_error: false
        };
    }




    handle_change = e => {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            console.log(newState);
            return newState;
        });
    };

    handle_date_change = (date) => {
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState["date"] = date;
            return newState
        })
    };

    handle_skill_change = (e) => {
        let num = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState["skill_level"] = num;
            return newState
        })
    };

    render_location(e) {
        e.preventDefault();
        let addressString = this.state["location"];
        addressString = addressString.replace(" ", "+");
        console.log(addressString);
        let urlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            addressString + "&key=" + GOOGLE_MAPS_KEY;
        fetch(urlString)
            .then(res => res.json())
            .then(json => {
                try {
                    console.log("Address info");
                    console.log(json);
                    console.log(json.results);
                    console.log(json.results[0]["formatted_address"]);

                    this.setState(prevstate => {
                        const newState = { ...prevstate };
                        newState["location"] = json.results[0]["formatted_address"];
                        newState["center"] = json.results[0]["geometry"]["location"];
                        newState["isMarkerShown"] = true;
                        newState["zoom"] = 17;
                        newState["location_error"] = false;
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

    handle_post(e, data) {
        e.preventDefault();

        let body = {
            "user": localStorage.getItem('user_id'),
            "skill_level": parseInt(this.state["skill_level"]),
            "location": this.state["location"],
            "latitude": data["center"]["lat"],
            "longitude": data["center"]["lng"],
            "game_time": data["date"],
            "two_goalies_needed": data["two_goalies_needed"]
        };

        let url = "http://localhost:8000/game/";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.props.history.push("/postagame");
            })
    }

    setLocationClass() {
        if (this.state["location_error"] === true) {
            console.log("setting", this.state["location_error"] === true);
            return "is-invalid"
        }
        return ""
    }


    render() {
        if (!localStorage.getItem('token')) {
            return (
                <Redirect to="/"/>
            )
        }

        const location_error = this.state["location_error"]
            ? <div className="invalid-feedback">
                Sorry, that location couldn't be found. Try adding more detail.
            </div> : "";

        return (
            <div>
                {this.props.nav}
                <div className="container">
                <h1>Post a Game</h1>
                <form onSubmit={e => this.handle_post(e, this.state)}>
                    <div className="form-group">
                        <label htmlFor="location">Location&nbsp;</label>
                        <div className="input-group">
                            <input
                                type="text"
                                name="location"
                                value={this.state.location}
                                onChange={this.handle_change}
                                className={"form-control col-md-5 " + this.setLocationClass()}
                                placeholder="Arena Location"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-secondary"
                                        onClick={e => this.render_location(e)}
                                        type="button">Lookup</button>
                            </div>
                            {location_error}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date&nbsp;</label>
                        <div className="input-group">
                            <DatePicker selected={this.state.date}
                                        onChange={this.handle_date_change}
                                        name="date"
                                        showTimeSelect
                                        dateFormat="Pp"
                                        dropdownMode="scroll"
                            />

                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skill_level">Skill Level&nbsp;
                            <div className="input-group">
                                <select value={this.state.skill_level} onChange={this.handle_skill_change}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </label>
                    </div>

                    {/*<div className="form-group">*/}
                        {/*<label htmlFor="two_goalies_needed">Two Goalies Needed&nbsp;*/}
                            {/*<div className="input-group">*/}
                                {/*<input type="checkbox" defaultValue={this.state.two_goalies_needed} onChange={this.handle_change}/>*/}
                            {/*</div>*/}
                        {/*</label>*/}
                    {/*</div>*/}

                    <input className="btn btn-primary" type="submit"/>
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(GameForm);
