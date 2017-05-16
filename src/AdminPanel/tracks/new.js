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
      <form className="form-horizontal" onSubmit={this.handleFormSubmit} >
       <h2> Add Track </h2>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Track Name </label>
          <div className="col-xs-10">
            <input type="text" id="branch-name" className="form-control"  ref="name"  />
          </div>
        </div>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Branch </label>
          <div className="col-xs-10">
            <select className="form-control"  ref="branch">
              { selectOptions }
            </select>
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
    let branch = this.refs.branch.value.trim();
    if(!name){
      errors.push('Please fill the Name field')
    }
    if(!branch){ // else prompt for an error
      errors.push('Please fill the Branch field')
    }
    if(errors.length > 0 )
      this.setState({errors: errors})
    else {
      // push to the API
      console.log('form is valid');
      // in callback, get the new track id and branch name then push to the parent
      this.props.addTrack({id: Math.random() * 100, name: name, branch: branch})
    }

  }

}

export default NewTrack;
