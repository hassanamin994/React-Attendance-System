import React, { Component } from 'react';

class Role extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <tr>
        <td>{this.props.role.name}</td>
        <td>{this.props.role.weight}</td>
        <td><a href="#" className="btn btn-primary btn-xs" >Edit</a></td>
      </tr>
    );
  }

}

export default Role;
