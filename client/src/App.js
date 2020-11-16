import React, { Component } from 'react';
import './App.css';
import toServer from './api/toServer';

import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import QueryResult from './components/QueryResult/QueryResult';
import AddNewTeam from './components/AddNewTeam/AddNewTeam';
import AddNewPlayer from './components/AddNewPlayer/AddNewPlayer';

const initialState = {
  route: 'home', //show different pages,
  queryResult: []
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return JSON.stringify(nextState.queryResult) !== JSON.stringify(this.state.queryResult);
  // }

  testConnection = async () => {
    //check if the front end can get data from the database
    const response = await toServer.get('/checkConnection');
    this.setState({ queryResult: response });
    console.log(response.data[1]);
    console.log(this.state.queryResult);
  }

  testConnection2 = async () => {
    //check if the front end can get data from the database
    const response = await toServer.post('/handleSQLQuery', { sql: 'SELECT * FROM Coach' });
    this.setState({ queryResult: response.data });
    // this.onQueryChange(response.data);
    console.log('with query as parameter', Object.values(response.data));
    console.log(this.state.queryResult);
    //return response.data;
  }

  renderSwitch(param) {
    switch (param) {
      case 'home':
        return (
          <>
            <div className="f1 baskerville">Basketball DB</div>
            <br></br>
            <button className='w-30 grow f4 mt2 link ph3 pv2 dib white bg-light-purple' onClick={this.initialDB}>Initialize DB</button>
          </>
        );

      case 'teams':
        return (
          <div>
            <div className='fl w-third ba br3 b--black bw1'>
              <QueryResult label='Team search' onGetResult={() => this.onQueryChange('SELECT * FROM Team')} />
              {this.state.queryResult.map((res) => {
                return (
                  <div className='tl'>
                    <li >{JSON.stringify(res)}</li>
                  </div>
                )
              })}
            </div>

            <div>
              <AddNewTeam />
            </div>
          </div>
        );
      case 'players':
        return (
          <div>
            <div className='fl w-third ba br3 b--black bw1'>
              <QueryResult label='Player search' onGetResult={() => this.onQueryChange('SELECT * FROM Players')} />
              {this.state.queryResult.map((res) => {
                return (
                  <div className='tl'>
                    <li >{JSON.stringify(res)}</li>
                  </div>
                )
              })}
            </div>

            <div>
              <AddNewPlayer />
            </div>
          </div>
        );
      case 'about':
        return <div className='f3'>CPSC304 Project implemented by Joseph Gao, Branden Tam, and Wei Zheng.</div>;
      default:
        return <div>Null</div>;
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route, queryResult: []});
  };

  onQueryChange = async (sql) => {
    const response = await toServer.post('/handleSQLQuery', { sql: sql });
    this.setState({ queryResult: response.data });
    console.log('with query as parameter', Object.values(response.data));
    console.log(this.state.queryResult);
  }

  initialDB = async () => {
    const response = await toServer.get('/api/init');
    if (response !== undefined) {
      alert("Database has been initialized successfully!");
    } else {
      alert("Database has not been initialized, something wrong!");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="center">
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} />
        </div>
        {
          this.renderSwitch(this.state.route)
        }

        {/* <button onClick={this.testConnection2}>Test</button>
        {this.state.queryResult.map((res) => {
          return (
            <div className='tc'>
              <li >{JSON.stringify(res)}</li>
            </div>            
          )
        })} */}
      </div>
    );
  }
}

export default App;
