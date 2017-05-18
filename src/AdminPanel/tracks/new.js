import React, { Component } from 'react';
import TrackItem from './trackItem'
import $ from 'jquery'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'

class NewTrack extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {errors: [], branches: [] }
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
          _this.setState({branches: data})
          console.log(data);
        },
        error: function(err){
          console.log(err);
        }
      })
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
