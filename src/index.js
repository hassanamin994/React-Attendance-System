import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Tracks from './AdminPanel/tracks/list.js'
import NewTrack from './AdminPanel/tracks/new.js'
import Branches from './AdminPanel/branches/list.js'
import NewBranch from './AdminPanel/branches/new.js'
import { Router, Route, browserHistory } from 'react-router'
import Students from './AdminPanel/students/list'

let routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App} >

          <Route path="/tracks" component={Tracks} >
            <Route path="new" component={NewTrack} />

          </Route>

          <Route path="/branches" component={Branches} >
            <Route path="/new" component={NewBranch} />
            <Route path="/new" component={NewBranch} />
          </Route>

    </Route>
  </Router>
)
ReactDOM.render(
  routes,
  document.getElementById('root')
);
