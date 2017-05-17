import React, { Component } from 'react';
import BranchItem from './branchItem'
class NewBranch extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: [], branch: {}}
  }
  componentWillMount(){
    // get branch info from API
    this.setState({branch: {id: this.params.id, name: 'test', location: 'test location'}})
  }
  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit} >
        <h2> Edit Branch </h2>
        <div className="row">
          <div className='form-group'>
            <label className="col-xs-2"  for="name">Branch Name </label>
            <div className="col-xs-10">
              <input type="text" className="form-control" value={this.state.branch.name} id="branch-name"  ref="name"  />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='form-group'>
            <label className="col-xs-2" for="name">Branch Location </label>
            <div className="col-xs-10">
              <input type="text" className="form-control" id="branch-location" value={this.state.branch.location} ref="location" />
            </div>
          </div>
        </div>
        <div className="error" hidden={this.state.errors.length == 0 }>
          <ul>
            { this.state.errors.map(error=> <li> {error} </li> )}
          </ul>
        </div>
        <input type="submit" className="btn btn-success" value="Edit" />
      </form>
    );
  }

  handleFormSubmit(e){
    e.preventDefault();
    // if form valid, submit it
    let errors = [];
    let name = this.refs.name.value.trim();
    let location = this.refs.location.value.trim() ;
    if(!name){
      errors.push('Please fill the name field')
    }
    if(!location){ // else prompt for an error
      errors.push('Please fill the location field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
      // get the id from API before sending
      this.props.editBranch({id: Math.random()*100, name: name, city: location})
    }

  }

}

export default NewBranch;
