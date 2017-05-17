import React, { Component } from 'react';
import Role from './role'
class NewRole extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: [], roles: [] }
  }

  render() {

    return (
      <form className="form-horizontal" onSubmit={this.handleFormSubmit} >
       <h2> Add Role </h2>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Role Name </label>
          <div className="col-xs-10">
            <input type="text" id="role-name" className="form-control"  ref="name"  />
          </div>
        </div>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Role Weight </label>
          <div className="col-xs-10">
            <input type="text" id="role-name" className="form-control"  ref="weight"  />
          </div>
        </div>
        <div className="error" hidden={this.state.errors.length == 0 }>
          <ul>
            { this.state.errors.map(error=> <li> {error} </li> )}
          </ul>
        </div>
        <input className="btn btn-success" type="submit" value="Add" />
      </form>
    );
  }

  handleFormSubmit(e){
    e.preventDefault();
    // if form valid, submit it
    let errors = [];
    let name = this.refs.name.value.trim();
    let branch = this.refs.weight.value.trim();
    if(!name){
      errors.push('Please fill the Name field')
    }
    if(!branch){ // else prompt for an error
      errors.push('Please fill the Weight field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');

    }

  }

}

export default NewRole;
