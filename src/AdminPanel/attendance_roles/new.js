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
          <label for="name" className="col-xs-2" >Minutes </label>
          <div className="col-xs-10">
            <input type="number" id="role-name" className="form-control"  ref="minutes"  />
          </div>
        </div>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Marks </label>
          <div className="col-xs-10">
            <input type="number" id="role-name" className="form-control"  ref="marks"  />
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
    let minutes = this.refs.minutes.value.trim();
    let marks = this.refs.marks.value.trim();
    if(!minutes){
      errors.push('Please fill the Minutes field')
    }
    if(!marks){ // else prompt for an error
      errors.push('Please fill the Marks field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
      this.props.addRole({minutes: minutes, marks: marks})
    }

  }

}

export default NewRole;
