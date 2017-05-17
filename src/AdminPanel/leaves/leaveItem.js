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
    let leaveStatus = "" ;
    if(status == 1 ){
      leaveStatus = "Pending"
      actions.push( <a style={{marginRight: '10px'}} onClick={this.approveLeave} href="#" className="btn btn-primary btn-xs">Approve</a> )
      actions.push( <a href="#" onClick={this.declineLeave} className="btn btn-danger btn-xs" >Decline</a> );
    }else if (status == 2) {
      leaveStatus = "Approved"
      actions.push( <a href="#" onClick={this.declineLeave} className="btn btn-danger btn-xs" >Decline</a> );
    }else if (status == 3) {
      leaveStatus = "Declined"
      actions.push( <a onClick={this.approveLeave} href="#" className="btn btn-primary btn-xs">Approve</a> )
    }

    return (
      <tr>
        <td>{this.props.leave.user.name}</td>
        <td>{this.props.leave.user.track.name}</td>
        <td>{this.props.leave.date}</td>
        <td>{this.props.leave.body}</td>
        <td>{leaveStatus}</td>
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
