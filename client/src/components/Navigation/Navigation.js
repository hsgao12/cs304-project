import React from 'react';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav className='ma4 mt0' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
            <p onClick={() => onRouteChange('teams')} className='f3 link dim black underline pa3 pointer'>Teams</p>
            <p onClick={() => onRouteChange('players')} className='f3 link dim black underline pa3 pointer'>Players</p>
            <p onClick={() => onRouteChange('about')} className='f3 link dim black underline pa3 pointer'>About</p>
        </nav>
    )
}

export default Navigation;