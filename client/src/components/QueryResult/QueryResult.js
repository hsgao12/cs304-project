import React from 'react';
import toServer from '../../api/toServer';

const QueryResult = ({ label, onGetResult }) => {    
    return (
        <div>
            <div className='f3'>{label}</div>
            <button onClick={onGetResult}>Search</button>            
        </div>
    )
}

export default QueryResult;