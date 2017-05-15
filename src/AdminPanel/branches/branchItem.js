import React, { Component } from 'react';

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
        <td><a onClick={this.deleteBranch} className="btn btn-danger btn-xs" href="#">Delete</a> <a href="#" className="btn btn-primary btn-xs">Edit</a></td>
      </tr>
    );
  }
  deleteBranch(e){
    e.preventDefault();
    this.props.deleteBranch(this.props.branch.id);
  }
}

export default BranchItem;
