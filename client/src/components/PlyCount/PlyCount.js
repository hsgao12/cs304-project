import React, { Component } from 'react';

import sqlHandler from '../../utils/sqlHandler';

class PlyCount extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            queryResult: [],
        };
    }

    OnGetPlyOfTeam = async () => {        
        
        let response = await sqlHandler('get', '/api/queries/teamPlayerCount')
        this.setState({ queryResult: response.data })
        console.log('getply', response.data);
    }

    render() {
        return (
            <div className='fl w-40 ba br3 b--black bw1 ml5 mt2 vh-25'>
                <div className='f3'>Players count</div>
                <div className='flex'>
                    <div>
                        {/* <h3>teamName</h3> */}
                        {/* <input className="pa2 input-reset ba hover-bg-black hover-white w-40"
                            type="text"
                            name="pot_teamName"
                            id="pot_teamName"
                            onChange={this.onTeamNameChange} /> */}
                    </div>
                </div>

                <button className='mt3' onClick={this.OnGetPlyOfTeam}>Count</button>

                {
                    this.state.queryResult.map((res) => {
                return (
                  <div className='tl'>
                    <li >{JSON.stringify(res)}</li>
                  </div>
                )
              })
              }
            </div>
        )
    }
}

export default PlyCount;