// name , email , password , track
import React, { Component } from 'react';

class NewStudent extends Component {
  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: [], tracks: []}
  }
  componentDidMount(){
    // get tracks from the api and append to the state
    let tracks = [
      {
        name: 'track 1',
        id: '1'
      },
      {
        name: 'track 2',
        id: '2'
      },
      {
        name: 'track 3',
        id: '3'
      }
    ]
    this.setState({tracks: tracks})
  }
  render() {
    let tracksOptions = this.state.tracks.map(track => <option key={track.id} value={track.id}>{track.name}</option> )
    return (
      <form onSubmit={this.handleFormSubmit} >
        <div className='form-group'>
          <label className="col-xs-2" for="name"> Name </label>
          <div className="col-xs-10">
            <input type="text" id="name"  ref="name"  />
          </div>
        </div>
        <div className='form-group'>
          <label className="col-xs-2" for="name"> Email </label>
          <div className="col-xs-10">
            <input type="text" id="email" ref="email" />
          </div>
        </div>
        <div className='form-group'>
          <label className="col-xs-2" for="password"> Password </label>
          <div className="col-xs-10">
            <input type="password" id="password" ref="password" />
          </div>
        </div>
        <div className='form-group'>
          <label for="track" className="col-xs-2"> Track </label>
          <div className="col-xs-10">
            <select id="track" className="form-control"  ref="track">
              { tracksOptions }
            </select>
          </div>
        </div>
        <div className="error" hidden={this.state.errors.length == 0 }>
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
    let name = this.refs.name.value.trim();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let track = this.refs.track.value.trim()

    if(!name){
      errors.push('Please fill the name field')
    }
    if(!email){ // else prompt for an error
      errors.push('Please fill the email field')
    }
    if(!password){ // else prompt for an error
      errors.push('Please fill the password field')
    }
    if(!track){ // else prompt for an error
      errors.push('Please fill the track field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
      // in callback, get the new track id and branch name then push to the parent
      this.props.addStudent({name: name, track: track})
    }

  }

}

export default NewStudent;
