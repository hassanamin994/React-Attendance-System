import React, { Component } from 'react';
import { Link } from 'react-router'
class BranchItem extends Component {
  constructor(props){
    super(props)
    this.deleteBranch = this.deleteBranch.bind(this)
  }
  render() {
    return (
      <tr>
        <td>{this.props.branch.name}</td>
        <td>{this.props.branch.city}</td>
        <td>{this.props.branch.tracks}</td>
        <td><a onClick={this.deleteBranch} className="btn btn-danger btn-xs" href="#">Delete</a> <Link to={"/branches/edit/"+ this.props.branch.id} className="btn btn-primary btn-xs">Edit</Link></td>
      </tr>
    );
  }
  deleteBranch(e){
    e.preventDefault();
    this.props.deleteBranch(this.props.branch.id);
  }
}

export default BranchItem;
