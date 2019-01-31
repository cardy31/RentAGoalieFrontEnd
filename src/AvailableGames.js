import React from 'react';
import DataTable from './DataTable';
import {confirmAlert} from "react-confirm-alert";

class AvailableGames extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'games': this.props.games,
            'rows': []
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
                console.log("GAMES");
                console.log(json);
                this.setState({ games: json });
                this.updateRows();
            });
    }

    updateRows = () => {
        let table = [];

        if (this.state['games'] !== null) {
            for (let i = 0; i < this.state['games'].length; i++) {
                if (this.state['games'][i]['goalie_one'] !== null) {
                    continue;
                }
                table[i] = [];
                table[i].push(this.state['games'][i]['user']);
                table[i].push(this.state['games'][i]['skill_level']);
                table[i].push(this.state['games'][i]['location']);
                table[i].push(this.state['games'][i]['game_time']);
                table[i].push(<button value={this.state['games'][i]['id']}
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
        let headings = [
            'User',
            'Skill Level',
            'Location',
            'Time',
            'Play!'
        ];

        return (
            <DataTable headings={headings} rows={this.state['rows']} />
        );
    }
}

export default AvailableGames;
