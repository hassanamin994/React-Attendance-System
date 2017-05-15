import React, { Component } from 'react';
import BranchItem from './branchItem'
class Branches extends Component {

  constructor(props){
    super(props)
    this.deleteBranch = this.deleteBranch.bind(this)
    this.state = {  branches: [{
        id: '1',
        name:'nasr city',
        city: 'Cairo'
      },{
        id: '2',
        name:'Mansoura ',
        city: 'mansoura'
      },{
        id: '3',
        name:'smart village',
        city: 'Cairo'
      },
    ]}
  }
  render() {


    let branches = this.state.branches.map((branch) => {return <BranchItem key={branch.id} deleteBranch={this.deleteBranch} branch={branch} />} )
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches}
        </tbody>
      </table>
    );
  }

  deleteBranch(id){
    if (confirm('Are you sure you want to delete this item ?')) {
      // make ajax to api and in success perform deleteListItem
      this.deleteListItem(id)
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
