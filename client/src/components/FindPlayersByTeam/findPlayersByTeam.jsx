import React, { Component } from 'react';
import { Table } from 'antd';

import sqlHandler from '../../utils/sqlHandler';

class FindPlayersByName extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            teamName: "",
            players: [], 
            hasPlayers: false
        }; 
    }

    handleChange = (event) => {
        this.setState({teamName: event.target.value}); 
    }

    handleSubmit = async (event) => {
        const res = await sqlHandler('get', `/api/queries/playersOfTeam?teamName=${this.state.teamName}`, {}); 
        const players = res.data;
        this.setState({players: players}); 
        if (this.state.players.length !== 0) {
            this.setState({hasPlayers: true});
        } else {
            this.setState({hasPlayers: false});
        }
    }
    
    render() {
        const {teamName, players, hasPlayers} = this.state;
        const columns = [
            {title: 'Name', dataIndex: 'p_name', key: 'p_name'}, 
            {title: 'Number', dataIndex: 'number', key: 'number'}, 
            {title: 'Weight', dataIndex: 'weight', key: 'weight'}, 
            {title: 'Height', dataIndex: 'height', key: 'height'}, 
            {title: 'Team Name', dataIndex: 'teamName', key: 'teamName'}];
        return (
        <div className='fl w-75 ba br3 b--black bw1 ml5 mt2'>
                <div className='f3'>Find a Player By Team</div>
                    <div>
                        <div>
                            <h3>Team</h3>
                            <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                                type="text"
                                name="team"
                                id="team"
                                value={this.state.teamName}
                                onChange={this.handleChange} />
                        </div>           
                </div>
                <button className='mt3' onClick={this.handleSubmit}>Search</button> 
                <div>
                    {this.state.hasPlayers ? <Table dataSource={players} columns={columns}/>: <h3>No Players Found</h3>}
                </div>
        </div> 
    
        )
    }

}

export default FindPlayersByName;