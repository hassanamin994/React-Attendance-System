import React, { Component } from 'react';
import {Link} from 'react-router'
import ApiRoutes from './api_routes'
import $ from 'jquery'
import Authentication from '../authentication'
import {Router, browserHistory} from 'react-router'

class LoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = {errors: []}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()
  }
  componentWillMount(){
    if(this.auth.isLoggedIn()){
      browserHistory.push('/tracks')
    }
  }
  render() {
    return (
      <div className="login">
      <form onSubmit={this.handleLogin.bind(this)} className="form-horizontal">
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" className="form-control"  placeholder="Username" ref="username" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control"  placeholder="Password" ref="password"/>
        </div>
        <div className="errors" hidden={this.state.errors.length == 0}>
          <ul>
            {this.state.errors.map(err=> <li key={err}>{err}</li>)}
          </ul>
        </div>
        <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    );
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

export default LoginComponent;
