import React, { Component } from 'react';
import { Table } from 'antd';

import sqlHandler from '../../utils/sqlHandler';

class FindStatsBySeason extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            season: "",
            stats: [], 
            hasStats: false
        }; 
    }

    handleChange = (event) => {
        this.setState({season: event.target.value}); 
    }

    handleSubmit = async (event) => {
        const res = await sqlHandler('get', `/api/queries/playerStats?season=${this.state.season}`, {}); 
        const stats = res.data;
        this.setState({stats: stats}); 
        if (this.state.stats.length !== 0) {
            this.setState({hasStats: true});
        } else {
            this.setState({hasStats: false});
        }
    }
    
    render() {
        const {season, stats, hasStats} = this.state;
        const columns = [
            {title: 'Name', dataIndex: 'p_name', key: 'p_name'}, 
            {title: 'Season', dataIndex: 'season', key: 'season'}, 
            {title: 'PPG', dataIndex: 'PPG', key: 'PPG'}, 
            {title: 'APG', dataIndex: 'APG', key: 'APG'}, 
            {title: 'FG', dataIndex: 'FG', key: 'FG'}];
        return (
        <div className='fl w-40 ba br3 b--black bw1 ml5 mt2'>
                <div><h3>Get Player Stats by Season</h3></div>
                    <div>
                        <div>
                            <h3>Season</h3>
                            <input className="pa2 input-reset ba hover-bg-black hover-white w-80"
                                type="text"
                                name="stats"
                                id="stats"
                                value={season}
                                onChange={this.handleChange} />
                        </div>          
                </div>
                <button className='mt3' onClick={this.handleSubmit}>Search</button>
            <div>
                {hasStats ? <Table dataSource={stats} columns={columns}/>: <h3>No Stats Found</h3>}  
            </div>
        </div> 
    
        )
    }

}

export default FindStatsBySeason;