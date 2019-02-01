import React from 'react';
import DataTable from './DataTable';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class PostedGames extends React.Component {
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
                this.setState({ games: json });
                this.updateRows();
                // this.render()
            });
    }

    updateRows = () => {
        let table = [];

        if (this.state['games'] !== null) {
            let user_id = localStorage.getItem('user_id');
            for (let i = 0; i < this.state['games'].length; i++) {
                let game_id = this.state['games'][i]['user'];

                if (parseInt(user_id) === game_id) {
                    table[i] = [];
                    table[i].push(this.state['games'][i]['user']);
                    table[i].push(this.state['games'][i]['skill_level']);
                    table[i].push(this.state['games'][i]['location']);
                    table[i].push(this.state['games'][i]['game_time']);
                    if (this.state['games'][i]['goalie_one'] !== null) {
                        table[i].push("Yes");
                    }
                    else {
                        table[i].push("No");
                    }

                    table[i].push(<button value={this.state['games'][i]['id']}
                                          onClick={this.handle_cancel}>Cancel</button>);
                }
            }
        }

        this.setState({
            'games': this.state['games'],
            'rows': table
        })
    };

    handle_cancel(e) {
        let val = e.target["value"];

        const options = {
            title: 'Cancelling Game',
            message: 'Are you sure you want to cancel?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let urlString = "http://localhost:8000/game/" + val + "/";
                        console.log(urlString);
                        fetch(urlString, {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Token ${localStorage.getItem('token')}`
                            }
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
                'Goalie Found?',
                'Cancel'
        ];

        return (
            <DataTable headings={headings} rows={this.state['rows']}/>
        );
    }
}

export default PostedGames;
