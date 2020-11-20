import React, {Component} from 'react';
import StatsBySeason from '../../components/StatsBySeason/StatsBySeason';
import PPGGreaterThan from '../../components/PPGGreaterThan/PPGGreaterThan';

class Stats extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div>
                <StatsBySeason/>
                <PPGGreaterThan/>
            </div>
        )
    }

}

export default Stats;