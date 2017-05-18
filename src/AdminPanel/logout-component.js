import React, { Component } from 'react';
import {Link} from 'react-router'
import ApiRoutes from './api_routes'
import $ from 'jquery'
import Authentication from '../authentication'
import {Router, browserHistory} from 'react-router'

class LogoutComponent extends Component {
  constructor(props){
    super(props);
    this.state = {errors: []}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()
  }
  componentWillMount(){
    if(this.auth.isLoggedIn()){
      this.auth.logout()
      browserHistory.push('/login')
    }
  }
  render() {
    return null;
  }
}

export default LogoutComponent;
