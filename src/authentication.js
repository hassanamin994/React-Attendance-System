import $ from 'jquery'
import ApiRoutes from './AdminPanel/api_routes'

export default class Authentication{
  constructor(){
    this.apiRoutes = new ApiRoutes()
  }
  login(username, password){
    return $.ajax({
      url: this.apiRoutes.get_login_route(),
      method: "POST",
      data: {username: username, password: password}
    })
  }
  logout(){
    localStorage.removeItem('access_token')
  }
  isLoggedIn(){
    return localStorage.getItem('access_token') && localStorage.getItem('access_token').length > 700
  }
  get_access_token(){
    return localStorage.getItem('access_token')
  }
}
