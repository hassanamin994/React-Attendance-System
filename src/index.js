import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Tracks from './AdminPanel/tracks/list.js'
import NewTrack from './AdminPanel/tracks/new.js'
import EditTrack from './AdminPanel/tracks/edit.js'
import Branches from './AdminPanel/branches/list.js'
import NewBranch from './AdminPanel/branches/new.js'
import EditBranch from './AdminPanel/branches/edit.js'
import { Router, Route, browserHistory } from 'react-router'
import Students from './AdminPanel/students/list'
import NewStudent from './AdminPanel/students/new'
import Roles from './AdminPanel/attendance_roles/list'
import NewRole from './AdminPanel/attendance_roles/new'
import Leaves from './AdminPanel/leaves/list'
import LoginComponent from './AdminPanel/login-component'
import LogoutComponent from './AdminPanel/logout-component'

let routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App} >

          <Route path="/login" component={LoginComponent} />
          <Route path="/logout" component={LogoutComponent} />

          <Route path="/tracks" component={Tracks} >
            <Route path="new" component={NewTrack} />
            <Route path="edit/:id" component={EditTrack} />

          </Route>

          <Route path="/branches" component={Branches} >
            <Route path="new" component={NewBranch} />
            <Route path="edit/:id" component={EditBranch} />
          </Route>

          <Route path="/students" component={Students} >
            <Route path="new" component={NewStudent} />
          </Route>
          <Route path="/roles" component={Roles} >
            <Route path="new" component={NewRole} />
          </Route>

          <Route path="/leaves" component={Leaves} />

    </Route>
  </Router>
)
ReactDOM.render(
  routes,
  document.getElementById('root')
);
