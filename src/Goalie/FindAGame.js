import React from 'react';
import DataTable from '../DataTable/DataTable';
import {confirmAlert} from "react-confirm-alert";
import { isEmpty } from '../_helpers/IsEmpty'
import { Redirect } from 'react-router'


class FindAGame extends React.Component {
    constructor(props) {
        super(props);

        try {
            console.log(props.location.state["login_check"]);
        }
        catch (e) {
            props.location.state = {"login_check": false}
        }

        this.state = {
            games: {},
            rows: [],
            login_check: this.props.location.state.login_check,
            profile_not_updated: false
        };
    }

    componentDidMount() {
        this.updateRows();
        fetch('http://localhost:8000/game/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log("Games");
                console.log(json);
                this.setState({ games: json });
                this.updateRows();
            });
        let url = 'http://localhost:8000/profile/' + localStorage.getItem('user_id') + '/';
        fetch(url, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log("Profile");
                console.log(json);
                let lat = json["latitude"];
                let long = json["longitude"];
                if (lat === 0 && long === 0) {
                    this.setState({profile_not_updated: true});
                    localStorage.setItem('unknown_goalie', 'true');
                }
            });
    }

    // getGames = () => {
    //     // This will let the page update after initial render
    //     let url = 'http://localhost:8000/game/';
    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Token ${localStorage.getItem('token')}`
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             this.setState({games:json});
    //         })
    // };

    updateRows = () => {
        let table = [];

        if (this.state['games'] !== null && !isEmpty(this.state['games'])) {
            for (let i = 0; i < this.state['games'].length; i++) {
                if (this.state['games'][i]['goalie_one'] !== null) {
                    continue;
                }
                table[i] = [];
                table[i].push(this.state['games'][i]['user']);
                table[i].push(this.state['games'][i]['skill_level']);
                table[i].push(this.state['games'][i]['location']);
                table[i].push(this.state['games'][i]['game_time']);
                table[i].push(<button className="btn btn-secondary"
                                      value={this.state['games'][i]['id']}
                                      onClick={this.handle_play}>Play</button>);
            }
        }
        this.setState({
            'games': this.state['games'],
            'rows': table
        })
    };

    handle_play(e) {
        let game_id = e.target["value"];
        let user_id = localStorage.getItem('user_id');

        let body = {
            "game": parseInt(game_id),
            "goalie": parseInt(user_id)
        };

        console.log(body);

        const options = {
            title: 'Play Game',
            message: 'Are you sure you want to commit to playing this game?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let urlString = "http://localhost:8000/apply/";
                        console.log(urlString);
                        fetch(urlString, {
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Authorization': `Token ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify(body)
                        })
                            .then(res => {
                                console.log(res.status)
                            })
                            .catch(res => res.status)
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ],
        };
        confirmAlert(options);
    }

    render() {
        if (!localStorage.getItem('token')) {
            return (
                <Redirect to="/"/>
            )
        }

        if (this.state["profile_not_updated"] === true) {
            return (
                <Redirect to="/profile"/>
            )
        }

        let headings = [
            'User',
            'Skill Level',
            'Location',
            'Time',
            'Play!'
        ];

        return (
            <div>
                {this.props.nav}
                <div className="container">
                    <h1>Find a Game</h1>
                    <DataTable headings={headings} rows={this.state['rows']} />
                </div>
            </div>
        );
    }
}

export default FindAGame;
