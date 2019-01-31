import React from 'react';
import DataTable from './DataTable';

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
                table[i].push(<button>Cancel</button>);
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
            'Play!'
        ];

        return (
            <DataTable headings={headings} rows={this.state['rows']} />
        );
    }
}

export default AcceptedGames;
