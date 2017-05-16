import React, { Component } from 'react';
import LeaveItem from './leaveItem'
import {Link} from 'react-router'
class Leaves extends Component {

  constructor(props){
    super(props)
    this.approveLeave = this.approveLeave.bind(this)
    this.declineLeave = this.declineLeave.bind(this)
    this.alterLeaveStatus = this.alterLeaveStatus.bind(this)
    this.state = {  leaves: []}
  }
  componentDidMount(){
    let leaves = [
        {
          id: 1,
          student_name: 'hassan',
          date:'2017/4/22',
          status: 'Declined',
          leave_body: 'i need a leave to go to the hospital'
        },
        {
          id: 2,
          student_name: 'kazafy',
          date:'2017/4/22',
          status: 'Pending',
          leave_body: 'i need a leave to go to the hospital'
        },
        {
          id: 3,
          student_name: 'habib',
          date:'2017/4/22',
          status: 'Approved',
          leave_body: 'i need a leave to go to the hospital'
        },
    ];
    this.setState({leaves: leaves})
  }
  render() {

    let leaves = this.state.leaves.map((leave) => {return <LeaveItem key={leave.id} approveLeave={this.approveLeave} declineLeave={this.declineLeave} leave={leave} />} )
    // let childs = React.cloneElement(this.props.children, { appState: this.state });

    return (
      <div className="leaves">
        <h2> Leaves </h2>
        <table className="table text-left" >
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Leave Notice</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves}
          </tbody>
        </table>
        { this.props.children?  React.cloneElement(this.props.children, { addTrack: this.addTrack }): "" }
      </div>
    );

  }

  approveLeave(id){
    // after ajax request alter the state
    this.alterLeaveStatus(id, 'Approved')
  }

  declineLeave(id){
    // after ajax request alter the state
    this.alterLeaveStatus(id, 'Declined')
  }

  alterLeaveStatus(id, status){
    let leaves = this.state.leaves ;
    for (var i = 0; i < leaves.length; i++) {
      if(leaves[i].id == id ){
        leaves[i].status = status ;
      }
    }
    this.setState({leaves: leaves}) ;
  }


}

export default Leaves;
