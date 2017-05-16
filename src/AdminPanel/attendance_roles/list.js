import React, { Component } from 'react';
import Role from './role'
import {Link} from 'react-router'
class Roles extends Component {

  constructor(props){
    super(props)
    this.addRole = this.addRole.bind(this)
    this.state = {  roles: [{
        id: '1',
        name:'role 1',
        weight: '3'
      },{
        id: '2',
        name:'role 2 ',
        weight: '4'
      },{
        id: '3',
        name:'role 3',
        weight: '5'
      },
    ]}
  }
  render() {

    let roles = this.state.roles.map((role) => {return <Role key={role.id}  role={role} />} )
    // let childs = React.cloneElement(this.props.children, { appState: this.state });

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


  addRole(role){
      console.log(role);
      let roles = this.state.roles ;
      roles.push(role)
      this.setState({roles: roles})
  }
}

export default Roles;
