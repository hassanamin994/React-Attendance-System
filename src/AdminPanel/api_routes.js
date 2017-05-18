export default class ApiRoutes {
  get_branches_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/api/branches'
  }
  get_tracks_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/api/tracks'
  }
  get_students_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/api/users'
  }
  get_leaves_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/api/requests'
  }
  get_roles_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/api/rules'
  }
  get_login_route(){
    return 'https://attendance-ionic-symfony-react.herokuapp.com/login'
  }

}
