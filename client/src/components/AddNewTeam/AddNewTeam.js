import React, { Component } from 'react';

import insertData from '../../utils/insertData'; 

class AddNewTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            teamName: '',
            city:''
        };
    }

    onOwnerChange = (event) => {
        this.setState({owner: event.target.value});
    }

    onTeamNameChange = (event) => {
        this.setState({teamName: event.target.value});
    }

    onCityChange = (event) => {
        this.setState({city: event.target.value});
    }

    render() {
        return (
            <div className='fl w-25 ba br3 b--black bw1 ml5'>
                <div className='f3'>Add new Team</div>
                <div>
                    <h3>Owner</h3>
                    <input className="pa2 input-reset ba hover-bg-black hover-white w-20" 
                                            type="text" 
                                            name="owner"  
                                            id="owner" 
                                            onChange={this.onOwnerChange} />
                </div>
                <div>
                    <h3>team name</h3>
                    <input className="pa2 input-reset ba hover-bg-black hover-white w-20" 
                                            type="text" 
                                            name="teamName"  
                                            id="teamName" 
                                            onChange={this.onTeamNameChange} />
                </div>
                <div>
                    <h3>city</h3>
                    <input className="pa2 input-reset ba hover-bg-black hover-white w-20" 
                                            type="text" 
                                            name="city"  
                                            id="city" 
                                            onChange={this.onCityChange} />
                </div>
                <button className='mt3' onClick={() => insertData(`INSERT INTO Team (teamName, city, owner) VALUES('${this.state.teamName}', '${this.state.city}', '${this.state.owner}')`)}>Insert</button>
            </div>
        )
    }
}

export default AddNewTeam;