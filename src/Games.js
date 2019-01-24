import React from 'react';
import DataTable from './DataTable';

class Games extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'games': null,
            'rows': []
        };
    }

    componentDidMount() {
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
                this.getRows();
            });
    }



    getLocationFetch = (i) => {
        let url = 'http://localhost:8000/location/' + i + '/';
        console.log(url);
        return fetch(url, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        .then((res) => res.json())
    };

    getLocation = (i) => {
        return Promise.all([this.getLocationFetch(i)])
    };

    getRows = () => {
        let table = this.state['rows'];

        if (this.state['games'] !== null) {
            console.log(this.state['games'].length);

            console.log(this.state['games'][0]);
        }


        if (this.state['games'] !== null) {
            for (let i = 0; i < this.state['games'].length; i++) {
                table[i] = [];
                table[i].push(this.state['games'][i]['user']);
                table[i].push(this.state['games'][i]['skill_level']);
                table[i].push(this.state['games'][i]['location']);
                table[i].push(this.state['games'][i]['game_time']);
                // if (localStorage.getItem('is_goalie') === 'true') {
                    table[i].push('TEMP');
                // }

                this.getLocation(this.state['games'][i]['location'])
                    .then(([location]) => {
                        table[i][2] = location['name'];
                        this.setState({rows: table});
                    });
            }
        }
    };

    render() {
        var headings = [];
        if (localStorage.getItem('is_goalie') === 'true') {
            headings = [
                'User',
                'Skill Level',
                'Location',
                'Time',
                'Play!'
            ];
        }
        else {
            headings = [
                'User',
                'Skill Level',
                'Location',
                'Time'
            ];
        }


        return (
            <DataTable headings={headings} rows={this.state['rows']} />
        );
    }
}

export default Games;
