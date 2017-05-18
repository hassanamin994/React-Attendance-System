import React, { Component } from 'react';

class Role extends Component {
  constructor(props){
    super(props)
    this.deleteRole = this.deleteRole.bind(this)
  }
  render() {
    return (
      <tr>
        <td>{this.props.role.minutes}</td>
        <td>{this.props.role.marks}</td>
        <td><a onClick={this.deleteRole} className="btn btn-danger btn-xs" href="#">Delete</a></td>
      </tr>
    );
  }
  deleteRole(e){
    e.preventDefault();
    this.props.deleteRole(this.props.role.id);
  }

}

export default Role;
