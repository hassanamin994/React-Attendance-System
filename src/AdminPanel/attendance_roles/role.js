import React, { Component } from 'react';

class Role extends Component {
  constructor(props){
    super(props)
    this.deleteRole = this.deleteRole.bind(this)
  }
  render() {
    return (
      <tr>
        <td>{this.props.role.name}</td>
        <td>{this.props.role.weight}</td>
        <td><a onClick={this.deleteRole} className="btn btn-danger btn-xs" href="#">Delete</a>  <a href="#" className="btn btn-primary btn-xs" >Edit</a></td>
      </tr>
    );
  }
  deleteRole(e){
    e.preventDefault();
    this.props.deleteRole(this.props.role.id);
  }

}

export default Role;
