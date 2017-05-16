import React, { Component } from 'react';
import BranchItem from './branchItem'
class NewBranch extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: []}
  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit} >
        <h2> Add Branch </h2> 
        <div class='form-group'>
          <label for="name">Branch Name </label>
          <input type="text" id="branch-name"  ref="name"  />
        </div>
        <div class='form-group'>
          <label for="name">Branch Location </label>
          <input type="text" id="branch-location" ref="location" />
        </div>
        <div class="error" hidden={this.state.errors.length == 0 }>
          <ul>
            { this.state.errors.map(error=> <li> {error} </li> )}
          </ul>
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }

  handleFormSubmit(e){
    e.preventDefault();
    // if form valid, submit it
    let errors = []
    if(!this.refs.name.value.trim()){
      errors.push('Please fill the name field')
    }
    if(!this.refs.location.value.trim()){ // else prompt for an error
      errors.push('Please fill the location field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
    }

  }

}

export default NewBranch;
