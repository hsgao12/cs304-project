import React, { Component } from 'react';

import sqlHandler from '../../utils/sqlHandler';

class DeletePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: 0            
        };
    }

    onPlayerIdChange = (event) => {
        this.setState({ playerId: event.target.value });
    }    

    render() {
        return (
            <div className='fl w-100 ba br3 b--black bw1 ml5 mt2 vh-25'>
                <div className='f3'>Delete a player</div>
                <div className='flex'>
                    <div>
                        <h3>playerId</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-40"
                            type="text"
                            name="d_playerId"
                            id="d_playerId"
                            onChange={this.onPlayerIdChange} />
                    </div>                    
                </div>
                
                <button className='mt3' onClick={() => sqlHandler('delete', `/api/crud/delete/:${parseInt(this.state.playerId)}`)}>Delete</button>
            
            </div>
        )
    }
}

export default DeletePlayer;