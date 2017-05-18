import React, { Component } from 'react';
import LeaveItem from './leaveItem'
import {Link} from 'react-router'
import ApiRoutes from '../api_routes'
import $ from 'jquery'
import Authentication from '../../authentication'

class Leaves extends Component {

  constructor(props){
    super(props)
    this.approveLeave = this.approveLeave.bind(this)
    this.declineLeave = this.declineLeave.bind(this)
    this.alterLeaveStatus = this.alterLeaveStatus.bind(this)
    this.state = {  leaves: []}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()
  }
  componentDidMount(){
    let _this = this;
    $.ajax({
      url: this.apiRoutes.get_leaves_route(),
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        console.log(data);
        _this.setState({leaves: data})
      },
      error: function(err){
        console.log(err);
      }
    })
    // this.setState({leaves: leaves})
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
              <th>Track</th>
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
    console.log(id);
    let _this = this;
    $.ajax({
      url: this.apiRoutes.get_leaves_route()+"/"+id,
      method: "PUT",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      data: {status: 2},
      success: function(data){
        console.log(data);
        _this.alterLeaveStatus(id, 2)
      },
      error: function(err){
        console.log(err);
      }
    })
  }

  declineLeave(id){
    // after ajax request alter the state
    let _this = this;
    $.ajax({
      url: this.apiRoutes.get_leaves_route()+"/"+id,
      method: "PUT",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      data: {status: 3},
      success: function(data){
        console.log(data);
        _this.alterLeaveStatus(id, 3)
      },
      error: function(err){
        console.log(err);
      }
    })
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
