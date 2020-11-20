import React, { Component } from 'react';
import { Table } from 'antd';

import sqlHandler from '../../utils/sqlHandler';

class HighestPPG extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            season: "",
            stats: [], 
            hasStats: false,
            pname: "", 
            ppg: 0
        }; 
    }

    handleChange = (event) => {
        this.setState({season: event.target.value}); 
    }

    handleSubmit = async (event) => {
        const res = await sqlHandler('get', `/api/queries/highestPPGinSeason?season=${this.state.season}`, {}); 
        const stats = res.data;
        this.setState({stats: stats})
        if (this.state.stats.length !== 0) {
            this.setState({hasStats: true, pname: stats[0].p_name, ppg: stats[0]["Max(S.PPG)"]});
        } else {
            this.setState({hasStats: false, pname: "", ppg: 0});
        }
    }
    
    render() {
        const {season, stats, hasStats, ppg, pname} = this.state;
        return (
        <div className='fl w-75 ba br3 b--black bw1 ml5 mt2'>
                <div><h3>Highest PPG In Season</h3></div>
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
        {hasStats ? <h3> The player in the season {season} with the Highest PPG is {pname} with a PPG of {ppg}</h3>: <h3>No Stats Found</h3>}  
            </div>
        </div> 
    
        )
    }

}

export default HighestPPG;