import React, { Component } from 'react';
import { Table } from 'antd';

import sqlHandler from '../../utils/sqlHandler';

class Coach extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            coach1: "",
            coach2: "",
            teamName: "",
            teams: [], 
            hasTeams: false
        }; 
    }

    handleCoach1Change = (event) => {
        this.setState({coach1: event.target.value}); 
    }

    handleCoach2Change = (event) => {
        this.setState({coach2: event.target.value});
    }

    handleSubmit = async (event) => {
        const res = await sqlHandler('get', `/api/queries/mutualCoach?coach1=${this.state.coach1}&coach2=${this.state.coach2}`, {}); 
        const teams = res.data;
        console.log(teams);
        this.setState({teams: teams}); 
        if (this.state.teams.length !== 0) {
            this.setState({hasTeams: true, teamName: this.state.teams[0].teamName});
        } else {
            this.setState({hasTeams: false, teamName: []});
        }
    }
    
    render() {
        const {coach1, coach2, teams, hasTeams, teamName} = this.state;
        return (
        <div className='fl w-40 ba br3 b--black bw1 ml5 mt2'>
                <div><h3>Get Mutually Coached Teams</h3></div>
                    <div>
                        <div>
                            <h3>Coach ID</h3>
                            <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                                type="text"
                                name="coach1ID"
                                id="coach1ID"
                                value={coach1}
                                onChange={this.handleCoach1Change} />
                            <h3>Coach ID</h3>
                            <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                                type="text"
                                name="coach2ID"
                                id="coach2ID" 
                                value={coach2}
                                onChange={this.handleCoach2Change}
                            />
                        </div>          
                </div>
                <button className='mt3' onClick={this.handleSubmit}>Search</button>
            <div>
            {hasTeams ? <h3>The team mutually coached is {teamName}</h3>: <h3>No Stats Found</h3>}  
            </div>
        </div> 
    
        )
    }

}

export default Coach;