import React, { Component } from 'react';
import BranchItem from './branchItem'
import {Link} from 'react-router'
import $ from 'jquery'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'


class Branches extends Component {

  constructor(props){
    super(props)
    this.deleteBranch = this.deleteBranch.bind(this)
    this.addBranch = this.addBranch.bind(this)
    this.addBranchItem = this.addBranchItem.bind(this)
    this.editBranch = this.editBranch.bind(this)
    this.editListItem = this.editListItem.bind(this)
    this.state = {  branches: []}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()

  }
  componentDidMount(){
    var _this = this;
    $.ajax({
      url: this.apiRoutes.get_branches_route(),
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        // console.log(data);
        _this.setState({branches: data})
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  render() {


    let branches = this.state.branches.map((branch) => {return <BranchItem key={branch.id} deleteBranch={this.deleteBranch} branch={branch} />} )
    console.log(this.state.branches);
    return (
      <div className="branches">
        <h2>Branches </h2>
        <Link to="/branches/new" className="btn btn-primary pull-right">Add Branch </Link>
        <table className="table text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Tracks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.branches.map((branch) => {return <BranchItem key={branch.id} deleteBranch={this.deleteBranch} branch={branch} />} )}
          </tbody>
        </table>
        { this.props.children ? React.cloneElement(this.props.children, {addBranch: this.addBranch , editBranch: this.editBranch }): ""}
      </div>
    );
  }

  addBranch(branch){
    console.log(branch);
    let _this = this ;
    $.ajax({
      url: this.apiRoutes.get_branches_route(),
      method: 'POST',
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      data: {name: branch.name, city: branch.city},
      success: function(resp){
            _this.addBranchItem(resp)
            console.log(resp, 'branch added');
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  addBranchItem(branch){
    let branches = this.state.branches;
    branches.push(branch)
    this.setState({branches: branches})
  }

  editBranch(branch){
    // send ajax with the edits
    let  _this = this;
    $.ajax({
      url: this.apiRoutes.get_branches_route()+"/"+branch.id,
      method: 'PUT',
      data: {name: branch.name, city: branch.city },
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(resp){
        console.log(resp, 'track edited');
        _this.editListItem(resp)
      },
      error: function(err){
        console.log(err);
      }
    })
  }

  editListItem(branch){
    let branches = this.state.branches;
    for (var i = 0; i < branches.length; i++) {
      if(branches[i].id == branch.id){
        branches[i] = branch
        console.log('matched');
      }
    }
    this.setState({branches: branches})
  }

  deleteBranch(id){
    if (confirm('Are you sure you want to delete this item ?')) {
      // make ajax to api and in success perform deleteListItem
        var _this = this;
        $.ajax({
          url: this.apiRoutes.get_branches_route()+"/"+id,
          method: 'DELETE',
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
          success: function(resp){
            console.log(resp);
            _this.deleteListItem(id)
          },
          error: function(err){
            console.log(err);
          }
        })
    }
  }
  deleteListItem(id){
    let branches = this.state.branches ;
    for (var i = 0; i < branches.length; i++) {
      if(branches[i].id == id ){
          branches.splice(i, 1)
          console.log('matched');
          console.log(branches);
      }
    }
    this.setState({branches: branches})
  }
}

export default Branches;
