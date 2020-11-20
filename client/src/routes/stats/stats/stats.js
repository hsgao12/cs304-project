import React, {Component} from 'react';
import StatsBySeason from '../../../components/StatsBySeason/StatsBySeason';
import PPGGreaterThan from '../../../components/PPGGreaterThan/PPGGreaterThan';
import HighestPPG from '../../../components/HighestPPG/HighestPPG';

class Stats extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div>
                <StatsBySeason/>
                <PPGGreaterThan/>
                <HighestPPG/>
            </div>
        )
    }

}

export default Stats;