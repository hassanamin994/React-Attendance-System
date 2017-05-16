import React, { Component } from 'react';

class LeaveItem extends Component {
  constructor(props){
    super(props)
    this.approveLeave = this.approveLeave.bind(this)
    this.declineLeave = this.declineLeave.bind(this)
  }
  render() {
    let actions = [] ;
    let status = this.props.leave.status ;
    if(status == "Pending" ){
      actions.push( <a style={{marginRight: '10px'}} onClick={this.approveLeave} href="#" className="btn btn-primary btn-xs">Approve</a> )
      actions.push( <a href="#" onClick={this.declineLeave} className="btn btn-danger btn-xs" >Decline</a> );
    }else if (status == "Approved") {
      actions.push( <a href="#" onClick={this.declineLeave} className="btn btn-danger btn-xs" >Decline</a> );
    }else if (status == "Declined") {
      actions.push( <a onClick={this.approveLeave} href="#" className="btn btn-primary btn-xs">Approve</a> )
    }

    return (
      <tr>
        <td>{this.props.leave.student_name}</td>
        <td>{this.props.leave.date}</td>
        <td>{this.props.leave.leave_body}</td>
        <td>{this.props.leave.status}</td>
        <td>{ actions }</td>
      </tr>
    );
  }
  approveLeave(e){
    e.preventDefault();
    this.props.approveLeave(this.props.leave.id);
  }

  declineLeave(e){
    e.preventDefault();
    this.props.declineLeave(this.props.leave.id);
  }
}

export default LeaveItem;
