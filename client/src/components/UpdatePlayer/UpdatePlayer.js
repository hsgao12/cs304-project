import React, { Component } from 'react';

import sqlHandler from '../../utils/sqlHandler';

class UpdatePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: 0,
            teamName: '',
            startDate: '',
            endDate: 0,
            salary: 0
        };
    }

    onPlayerIdChange = (event) => {
        this.setState({ playerId: event.target.value });
    }

    onTeamNameChange = (event) => {
        this.setState({ teamName: event.target.value });
    }

    onStartDateChange = (event) => {
        this.setState({ startDate: event.target.value });
    }

    onEndDateChange = (event) => {
        this.setState({ endDate: event.target.value });
    }

    onSalaryChange = (event) => {
        this.setState({ salary: event.target.value });
    }

    render() {
        return (
            <div className='fl w-100 ba br3 b--black bw1 mt2 ml5 vh-25'>
                <div className='f3'>Update a player's information</div>
                <div className='flex'>
                    <div>
                        <h3>playerId</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="u_playerId"
                            id="u_playerId"
                            onChange={this.onPlayerIdChange} />
                    </div>
                    <div>
                        <h3>teamName</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="teamName"
                            id="teamName"
                            onChange={this.onTeamNameChange} />
                    </div>
                    <div>
                        <h3>startDate</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="startDate"
                            id="startDate"
                            onChange={this.onStartDateChange} />
                    </div>
                    <div>
                        <h3>endDate</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="endDate"
                            id="endDate"
                            onChange={this.onEndDateChange} />
                    </div>
                    <div>
                        <h3>salary</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="salary"
                            id="salary"
                            onChange={this.onSalaryChange} />
                    </div>
                </div>
                
                <button className='mt3' onClick={() => sqlHandler('put', `api/crud/update`, {playerId: this.state.playerId, teamName: this.state.teamName, startDate: this.state.startDate, endDate: this.state.endDate, salary: this.state.salary})}>Update</button>
            </div>
        )
    }
}

export default UpdatePlayer;