import React from 'react';
// import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withRouter } from "react-router";
import MapComponent from "./MapComponent"

let reader = new FileReader();
let key = readTextFile("file:///Users/cardy/PhpstormProjects/rent_a_goalie/src/GoogleMapsAPIKey.txt");

console.log(key);

function readTextFile(file)
{
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                let allText = rawFile.responseText;
                alert(allText);
            }
        }
    };
    rawFile.send(null);
}

let mapsUrl = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + key;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap googleMapURL={mapsUrl}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  defaultCenter={{ lat: -34.397, lng: 150.644 }}
                  defaultZoom={8}
                  isMarkerShown={false}/>
));

class GameForm extends React.Component {
    state = {
        date: new Date(),
        location: "Kitchener",
        skill_level: 1,
        center: {
            lat: 43.4516395,
            lng: -80.49253369999997
        },
        zoom: 15,
        isMarkerShown: false,
        two_goalies_needed: false
    };


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
        console.log("Rendering location");
        let addressString = this.state["location"];
        addressString = addressString.replace(" ", "+");
        console.log(addressString);
        let urlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            addressString + "&key=" + key;
        fetch(urlString)
            .then(res => res.json())
            .then(json => {
                console.log("Address info");
                console.log(json);
                console.log(json.results);
                console.log(json.results[0]["formatted_address"]);

                this.setState(prevstate => {
                    const newState = { ...prevstate };
                    newState["location"] = json.results[0]["formatted_address"];
                    newState["center"] = json.results[0]["geometry"]["location"];
                    newState["isMarkerShown"] = true;
                    return newState;
                });
                console.log("Changed location");
                console.log(this.state);
                this.render();
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
                this.props.history.push("/mygames");
            })
    }


    render() {



        return (
            <form onSubmit={e => this.handle_post(e, this.state)}>
                <h4>Post a Game</h4>
                <label htmlFor="location">Location&nbsp;</label>
                <input
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={this.handle_change}
                />
                <button onClick={e => this.render_location(e)}>Lookup</button>

                <MyMapComponent
                    googleMapURL={mapsUrl}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={this.state["center"]}
                    zoom={this.state["zoom"]}
                    isMarkerShown={true}
                />
                <br></br>

                <label htmlFor="date">Date&nbsp;
                <DatePicker selected={this.state.date}
                            onChange={this.handle_date_change}
                            name="date"
                            showTimeSelect
                            dateFormat="Pp"
                            dropdownMode="scroll"
                />
                </label>
                <br></br>
                <label htmlFor="skill_level">Skill Level&nbsp;
                <select value={this.state.skill_level} onChange={this.handle_skill_change}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </label>
                <br></br>
                <label htmlFor="two_goalies_needed">Two Goalies Needed&nbsp;
                <input type="checkbox" defaultValue={this.state.two_goalies_needed} onChange={this.handle_change}/>
                </label>
                <br></br>
                <input type="submit"/>
            </form>
        );
    }
}

export default withRouter(GameForm);
