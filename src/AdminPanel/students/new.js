// name , email , password , track
import React, { Component } from 'react';

class NewStudent extends Component {
  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: []}
  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit} >
        <div class='form-group'>
          <label for="name"> Name </label>
          <input type="text" id="name"  ref="name"  />
        </div>
        <div class='form-group'>
          <label for="name"> Email </label>
          <input type="text" id="email" ref="email" />
        </div>
        <div class='form-group'>
          <label for="password"> Password </label>
          <input type="password" id="password" ref="password" />
        </div>
        <div class='form-group'>
          <label for="track"> Track </label>
          <input type="text" id="track" ref="track" />
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
      errors.push('Please fill the email field')
    }
    if(!this.refs.location.value.trim()){ // else prompt for an error
      errors.push('Please fill the password field')
    }
    if(!this.refs.location.value.trim()){ // else prompt for an error
      errors.push('Please fill the track field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
    }

  }

}

export default NewStudent;
