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
  handleLogin(e){
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;


    let _this = this;
    this.auth.login(username, password)
      .done(function(resp){
        console.log(resp.token);
        localStorage.setItem('access_token',resp.token)
        browserHistory.push('/tracks')
      }).fail(function(err){
        let errors = _this.state.errors;
        errors.push('Invalid username or password!')
        _this.setState({errors: errors})
      })

  }
}

export default LogoutComponent;
