import React, { Component } from 'react';
import TrackItem from './trackItem'
class NewTrack extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: [], branches: [] }
  }
  componentDidMount(){
      // get the branches from api and in success callback function set state
      let branches = [{
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
      ]
      this.setState({branches: branches})
  }
  render() {

   let selectOptions = this.state.branches.map(branch => <option value={branch.id} >{branch.name} / { branch.city }</option> )

    return (
      <form onSubmit={this.handleFormSubmit} >
        <div class='form-group'>
          <label for="name">Track Name </label>
          <input type="text" id="branch-name"  ref="name"  />
        </div>
        <div class='form-group'>
          <label for="name">Branch </label>
          <select ref="branch">
            { selectOptions }
          </select>
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
      errors.push('Please fill the Name field')
    }
    if(!this.refs.branch.value.trim()){ // else prompt for an error
      errors.push('Please fill the Branch field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
    }

  }

}

export default NewTrack;
