import React from 'react';
import DataTable from './DataTable';
import {confirmAlert} from "react-confirm-alert";

class AcceptedGames extends React.Component {
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

    handle_cancel(e) {
        let val = e.target["value"];

        const options = {
            title: 'Cancelling Attendance',
            message: 'Are you sure you want to cancel?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let body = {
                            "game": parseInt(val),
                            "goalie": parseInt(localStorage.getItem("user_id"))
                        };
                        let urlString = "http://localhost:8000/unapply/";
                        console.log(urlString);
                        fetch(urlString, {
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                Authorization: `Token ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify(body)
                        })
                            .then(res => {
                                console.log(res.status);
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

    updateRows = () => {
        let table = [];

        let id = parseInt(localStorage.getItem('user_id'));

        if (this.state['games'] !== null) {
            for (let i = 0; i < this.state['games'].length; i++) {
                if (this.state['games'][i]['goalie_one'] !== id) {
                    continue;
                }
                table[i] = [];
                table[i].push(this.state['games'][i]['user']);
                table[i].push(this.state['games'][i]['skill_level']);
                table[i].push(this.state['games'][i]['location']);
                table[i].push(this.state['games'][i]['game_time']);
                table[i].push(<button value={this.state['games'][i]['id']}
                                      onClick={this.handle_cancel}
                                      className="btn btn-secondary">Cancel</button>);
            }
        }

        this.setState({
            'games': this.state['games'],
            'rows': table
        })
    };

    render() {
        let headings = [
            'User',
            'Skill Level',
            'Location',
            'Time',
            'Cancel'
        ];

        return (
            <div className="container">
                <h1>Accepted Games</h1>
                <DataTable headings={headings} rows={this.state['rows']} />
            </div>
        );
    }
}

export default AcceptedGames;
