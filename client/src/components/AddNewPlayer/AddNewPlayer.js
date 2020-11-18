import React, { Component } from 'react';

import sqlHandler from '../../utils/sqlHandler';

class AddNewPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: 0,
            p_name: '',
            number: -1,
            weight: 0,
            height: 0
        };
    }

    onPlayerIdChange = (event) => {
        this.setState({ playerId: event.target.value });
    }

    onP_nameChange = (event) => {
        this.setState({ p_name: event.target.value });
    }

    onNumberChange = (event) => {
        this.setState({ number: event.target.value });
    }

    onWeightChange = (event) => {
        this.setState({ weight: event.target.value });
    }

    onHeightChange = (event) => {
        this.setState({ height: event.target.value });
    }

    render() {
        return (
            <div className='fl w-100 ba br3 b--black bw1 ml5 vh-25'>
                <div className='f3'>Add a new player</div>
                <div className='flex'>
                    <div>
                        <h3>playerId</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="playerId"
                            id="playerId"
                            onChange={this.onPlayerIdChange} />
                    </div>
                    <div>
                        <h3>p_name</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="p_name"
                            id="p_name"
                            onChange={this.onP_nameChange} />
                    </div>
                    <div>
                        <h3>number</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="number"
                            id="number"
                            onChange={this.onNumberChange} />
                    </div>
                    <div>
                        <h3>weight</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="weight"
                            id="weight"
                            onChange={this.onWeightChange} />
                    </div>
                    <div>
                        <h3>height</h3>
                        <input className="pa2 input-reset ba hover-bg-black hover-white w-70"
                            type="text"
                            name="height"
                            id="height"
                            onChange={this.onHeightChange} />
                    </div>
                </div>
                
                <button className='mt3' onClick={() => sqlHandler('post', '/api/crud/create', {playerId: this.state.playerId, p_name: this.state.p_name, number: this.state.number, weight: this.state.weight, height: this.state.height})}>Insert</button>
            </div>
        )
    }
}

export default AddNewPlayer;