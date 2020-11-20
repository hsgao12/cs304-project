import React, { Component } from 'react';
import { Table } from 'antd';
import './App.css';
import toServer from './api/toServer';


import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import QueryResult from './components/QueryResult/QueryResult';
import AddNewTeam from './components/AddNewTeam/AddNewTeam';
import AddNewPlayer from './components/AddNewPlayer/AddNewPlayer';
import DeletePlayer from './components/DeletePlayer/DeletePlayer';
import UpdatePlayer from './components/UpdatePlayer/UpdatePlayer';
import PlyOfTeam from './components/PlyCount/PlyCount';
import FindPlayersByTeam from './components/FindPlayersByTeam/findPlayersByTeam'; 

import Stats from './routes/stats/stats';

const initialState = {
  route: 'home', //show different pages,
  queryResult: [],  
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
            <div className='fl w-50 ba br3 b--black bw1 vh-50 ml2'>
              <QueryResult label='Team search' onGetResult={() => this.onQueryChange('SELECT * FROM Team')} />
              {this.state.queryResult.length !== 0 ?
                <Table className='ml2' dataSource={this.state.queryResult} columns={[
                  {
                    title: 'Owner',
                    dataIndex: 'owner',
                    key: 'owner',
                  },
                  {
                    title: 'TeamName',
                    dataIndex: 'teamName',
                    key: 'teamName',
                  },
                  {
                    title: 'City',
                    dataIndex: 'city',
                    key: 'city',
                  },
                ]} bordered={true} /> : <div></div>}
            </div>

            <div>
              <AddNewTeam />
            </div>

            <div>
                <PlyOfTeam />
            </div>
            <div>
              <FindPlayersByTeam/>
            </div>
          </div>
        );
      case 'players':
        return (
          <div className='flex'>
            <div className='w-50'>
              <div className='fl w-100 ba br3 b--black bw1 vh-50 ml2'>
                <div className='f3'>All Players' data</div>
                <div>
                  {/* <button onClick={() => this.onQueryChange('SELECT * FROM Players')}>Show all players</button> */}
                  <QueryResult label='' onGetResult={() => this.onQueryChange('SELECT * FROM Players')} />
                </div>
                {/* {this.state.queryResult.map((res) => {
                return (
                  <div className='tl'>
                    <li >{JSON.stringify(res)}</li>
                  </div>
                )
              })} */}
                {this.state.queryResult.length !== 0 ?
                  <Table className='ml2' dataSource={this.state.queryResult} columns={[
                    {
                      title: 'ID',
                      dataIndex: 'playerId',
                      key: 'playerId',
                    },
                    {
                      title: 'Name',
                      dataIndex: 'p_name',
                      key: 'p_name',
                    },
                    {
                      title: 'Number',
                      dataIndex: 'number',
                      key: 'number',
                    },
                    {
                      title: 'Weight',
                      dataIndex: 'weight',
                      key: 'weight',
                    },
                    {
                      title: 'Height',
                      dataIndex: 'height',
                      key: 'height',
                    },                    
                  ]} bordered={true} /> : <div></div>}
              </div>

              <div className='fl w-100 ba br3 b--black bw1 vh-50 ml2'>
                <div className='f3'>Players' contract data</div>
                <div>
                  {/* <button onClick={() => this.onQueryChange('SELECT * FROM Players')}>Show all players</button> */}
                  <QueryResult label='' onGetResult={() => this.onQueryChange('SELECT P.playerId, P.p_name, P.number, PF.teamName, PF.startDate, PF.endDate, PF.salary FROM Players P, Plays_For PF WHERE P.playerId = PF.playerId')} />
                </div>
                {/* {this.state.queryResult.map((res) => {
                return (
                  <div className='tl'>
                    <li >{JSON.stringify(res)}</li>
                  </div>
                )
              })} */}
                {this.state.queryResult.length !== 0 ?
                  <Table className='ml2' dataSource={this.state.queryResult} columns={[
                    {
                      title: 'ID',
                      dataIndex: 'playerId',
                      key: 'playerId',
                    },
                    {
                      title: 'Name',
                      dataIndex: 'p_name',
                      key: 'p_name',
                    },
                    {
                      title: 'Number',
                      dataIndex: 'number',
                      key: 'number',
                    },
                    {
                      title: 'TeamName',
                      dataIndex: 'teamName',
                      key: 'teamName',
                    },
                    {
                      title: 'StartDate',
                      dataIndex: 'startDate',
                      key: 'startDate',
                    },
                    {
                      title: 'EndDate',
                      dataIndex: 'endDate',
                      key: 'endDate',
                    },
                    {
                      title: 'Salary',
                      dataIndex: 'salary',
                      key: 'salary',
                    },
                  ]} bordered={true} /> : <div></div>}
              </div>
            </div>
            <div  className='w-40'>
              <div>
                <AddNewPlayer />
              </div>

              <div>
                <DeletePlayer />
              </div>

              <div>
                <UpdatePlayer />
              </div>
            </div>
          </div>
        );
      case 'stats': 
          return <Stats/>;
      case 'about':
        return <div className='f3'>CPSC304 Project implemented by Joseph Gao, Branden Tam, and Wei Zheng.</div>;
      default:
        return <div>Null</div>;
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route, queryResult: [] });
  };

  onQueryChange = async (sql) => {
    const response = await toServer.post('/handleSQLQuery', { sql: sql });
    this.setState({ queryResult: response.data });
    console.log('with query as parameter', Object.values(response.data));
    console.log(this.state.queryResult);
  }

  initialDB = async () => {
    const response = await toServer.post('/api/init');
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
