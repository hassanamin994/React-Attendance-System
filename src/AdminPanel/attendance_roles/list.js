import React, { Component } from 'react';
import Role from './role'
import {Link} from 'react-router'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'
import $ from 'jquery'
class Roles extends Component {

  constructor(props){
    super(props)
    this.deleteRole = this.deleteRole.bind(this)
    this.addRole = this.addRole.bind(this)
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()
    this.state = {  roles: []}
  }
  componentDidMount(){
    var _this = this;
    $.ajax({
      url: this.apiRoutes.get_roles_route(),
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        console.log(data);
        _this.setState({roles: data})
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  render() {
    let roles = this.state.roles.map((role) => {return <Role key={role.id} deleteRole={this.deleteRole} role={role} />} )
    return (
      <div className="roles">
        <h2> Roles </h2>
          <Link className="btn btn-primary pull-right" to="/roles/new">New Role</Link>
        <table className="table text-left" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles}
          </tbody>
        </table>
        { this.props.children?  React.cloneElement(this.props.children, { addRole: this.addRole }): "" }
      </div>
    );

  }

  deleteRole(id){
    if (confirm('Are you sure you want to delete this item ?')) {
      // make ajax to api and in success perform deleteListItem
        var _this = this;
        $.ajax({
          url: this.apiRoutes.get_roles_route()+"/"+id,
          method: 'DELETE',
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
          success: function(resp){
            console.log(resp);
            _this.deleteListItem(id)
          },
          error: function(err){
            console.log(err);
          }
        })
    }
  }
  deleteListItem(id){
    let roles = this.state.roles ;
    for (var i = 0; i < roles.length; i++) {
      if(roles[i].id == id ){
          roles.splice(i, 1)
          console.log('matched');
          console.log(roles);
      }
    }
    this.setState({roles: roles})
  }


  addRoleItem(role){
      console.log(role, 'add to list roles');
      let roles = this.state.roles ;
      roles.push(role)
      this.setState({roles: roles})
  }
  addRole(role){
    console.log(role, 'adding before ajax');
    let _this = this ;
    $.ajax({
      url: this.apiRoutes.get_roles_route(),
      method: 'POST',
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      data: role,
      success: function(resp){
            _this.addRoleItem(resp)
            console.log(resp, 'role added');
      },
      error: function(err){
        console.log(err);
      }
    })
  }
}

export default Roles;
