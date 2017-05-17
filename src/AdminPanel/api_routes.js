export default class ApiRoutes {
  get_branches_route(){
    return 'http://attendance-ionic-symfony-react.herokuapp.com/branches'
  }
  get_tracks_route(){
    return 'http://attendance-ionic-symfony-react.herokuapp.com/tracks'
  }
  get_students_route(){
    return 'http://attendance-ionic-symfony-react.herokuapp.com/users'
  }
  get_leaves_route(){
    return 'http://attendance-ionic-symfony-react.herokuapp.com/requests'
  }

}
