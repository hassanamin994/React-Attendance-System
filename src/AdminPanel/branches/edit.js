import React, { Component } from 'react';
import BranchItem from './branchItem'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'
import $ from 'jquery'
class EditBranch extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleBranchNameChange = this.handleBranchNameChange.bind(this)
    this.state = {errors: [], branch: {}}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()

  }
  componentWillMount(){
    // get branch info from API
    this.updateBranch(this.props)

  }
  componentWillReceiveProps(nextProps){
    this.updateBranch(nextProps);

  }
  updateBranch(props){
    let _this = this;
    $.ajax({
      url: this.apiRoutes.get_branches_route()+"/"+props.params.id,
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        _this.setState({branch: data})
        console.log(data, 'track data');
      },
      error: function(err){
        console.log(err, 'errorrrrrrrrrrrrrrrrrrrrrrrrrrr');
      }
    })
    
  }
  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit} >
        <h2> Edit Branch </h2>
        <div className="row">
          <div className='form-group'>
            <label className="col-xs-2"  for="name">Branch Name </label>
            <div className="col-xs-10">
              <input type="text" className="form-control" value={this.state.branch.name} id="branch-name" onInput={this.handleBranchNameChange} ref="name"  />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='form-group'>
            <label className="col-xs-2" for="name">Branch Location </label>
            <div className="col-xs-10">
              <input type="text" className="form-control" id="branch-location" value={this.state.branch.city} onInput={this.handleCityChange} ref="location" />
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
  handleCityChange(e){
    let branch = this.state.branch ;
    branch.city = e.target.value;
    this.setState({branch: branch})
  }
  handleBranchNameChange(e){
    let branch = this.state.branch ;
    branch.name = e.target.value;
    this.setState({branch: branch})
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
      this.props.editBranch(this.state.branch)
    }

  }

}

export default EditBranch;
