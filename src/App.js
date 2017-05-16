import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-default">
          <div class="container-fluid">

            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Brand</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                <li><Link to="/branches">Branches</Link></li>
                <li><Link to="/tracks">Tracks</Link></li>
                <li><Link to="/">Link</Link></li>
              </ul>
            </div>
          </div>
          </nav>
        { this.props.children }
      </div>
    );
  }
}

export default App;
