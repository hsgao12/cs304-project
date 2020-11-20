import React, { Component } from 'react';

import insertData from '../../utils/insertData';
import sqlHandler from '../../utils/sqlHandler';

class AddNewTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            teamName: '',
            city: ''
        };
    }

    onOwnerChange = (event) => {
        this.setState({ owner: event.target.value });
    }

    onTeamNameChange = (event) => {
        this.setState({ teamName: event.target.value });
    }

    onCityChange = (event) => {
        this.setState({ city: event.target.value });
    }

    addNewTeam = async (owner, teamName, city) => {        
        const response = await sqlHandler('get',`/api/queries/checkTeamExistence?teamName=${teamName}&city=${city}`);
        if (response.data.length === 0) {
            insertData(`INSERT INTO Team (teamName, city, owner) VALUES('${this.state.teamName}', '${this.state.city}', '${this.state.owner}')`); 
        } else {
            alert('This teamName and city combination already exists in the DB.')
        }
        // () => insertData(`INSERT INTO Team (teamName, city, owner) VALUES('${this.state.teamName}', '${this.state.city}', '${this.state.owner}')`)
    }

    render() {
        return (
            <div className='fl w-40 ba br3 b--black bw1 ml5 vh-25'>
                <div className='f3'>Add a new Team</div>
                <div className='flex center'>
                    
                    <div>
                        <h3>Owner</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                            type="text"
                            name="owner"
                            id="owner"
                            onChange={this.onOwnerChange} />
                    </div>
                    <div>
                        <h3>team name</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                            type="text"
                            name="teamName"
                            id="teamName"
                            onChange={this.onTeamNameChange} />
                    </div>
                    <div>
                        <h3>city</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                            type="text"
                            name="city"
                            id="city"
                            onChange={this.onCityChange} />
                    </div>
                </div>
                <button className='mt3' onClick={() => this.addNewTeam(this.state.owner, this.state.teamName, this.state.city)}>Insert</button>
            </div>
        )
    }
}

export default AddNewTeam;