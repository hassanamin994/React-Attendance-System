import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router'
import Authentication from './authentication'

class App extends Component {

  render() {
    let auth = new Authentication()
    let links = []
    if(auth.isLoggedIn()){
      links = (
        <ul role="nav" className="nav navbar-nav navbar-right">
          <li><Link to="/students" activeStyle={ {color: 'white' }} >Students</Link></li>
          <li><Link to="/tracks" activeStyle={ {color: 'white' }} >Tracks</Link></li>
          <li><Link to="/branches" activeStyle={ {color: 'white' }} >Branches</Link></li>
          <li><Link to="/leaves" activeStyle={ {color: 'white' }} >Leaves</Link></li>
          <li><Link to="/roles" activeStyle={ {color: 'white' }}>Attendence Roles</Link></li>
          <li><Link to="/logout" activeStyle={ {color: 'white' }}>Logout</Link></li>
        </ul>
        )
    }else{
      links = (
          <ul role="nav" className="nav navbar-nav navbar-right">
            <li><Link to="/login" activeStyle={ {color: 'white' }}>Login</Link></li>
          </ul>
      )
    }
    return (
      <div className="App">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Attendeka</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {links}
            </div>
          </div>
        </nav>
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
