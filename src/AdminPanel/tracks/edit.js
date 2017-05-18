import React, { Component } from 'react';
import TrackItem from './trackItem'
import $ from 'jquery'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'

class EditTrack extends Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTracknameChange = this.handleTracknameChange.bind(this)
    this.handleBrancheChange = this.handleBrancheChange.bind(this)
    this.updateTrack = this.updateTrack.bind(this)
    this.state = {errors: [], branches: [], track: {} }
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()

  }
  componentWillMount(){
      var _this = this;
      // getting list of branches
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
      // get the current track data
      this.updateTrack(this.props)
  }
  updateTrack(props){
    let _this = this;
    $.ajax({
      url: this.apiRoutes.get_tracks_route()+"/"+props.params.id,
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        _this.setState({track: data})
        console.log(data, 'track data');
      },
      error: function(err){
        console.log(err, 'errorrrrrrrrrrrrrrrrrrrrrrrrrrr');
      }
    })
  }
  componentWillReceiveProps(nextProps){
    this.updateTrack(nextProps);
  }
  render() {

   let selectOptions = this.state.branches.map(branch => <option value={branch.id}  >{branch.name} / { branch.city }</option> )

    return (
      <form className="form-horizontal" onSubmit={this.handleFormSubmit} >
       <h2> Edit Track </h2>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Track Name </label>
          <div className="col-xs-10">
            <input type="text" id="track-name" className="form-control" value={this.state.track.name}  onInput={this.handleTracknameChange} ref="name"  />
          </div>
        </div>
        <div className='form-group'>
          <label for="name" className="col-xs-2" >Branch </label>
          <div className="col-xs-10">
            <select onChange={this.handleBrancheChange} value={ this.state.track.branch ? this.state.track.branch.id: ""  } className="form-control"  ref="branch">
              { selectOptions }
            </select>
          </div>
        </div>
        <div className="error" hidden={this.state.errors.length == 0 }>
          <ul>
            { this.state.errors.map(error=> <li> {error} </li> )}
          </ul>
        </div>
        <input className="btn btn-success" type="submit" value="Edit" />
      </form>
    );
  }
  handleBrancheChange(e){
    let track = this.state.track;
    track.branch.id= e.target.value;
    console.log('new id ', track.branch.id  );
    this.setState({track: track})
  }
  handleTracknameChange(e){
    let track = this.state.track;
    track.name = e.target.value;
    this.setState({track: track})
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
      console.log(branch, name);
      // in callback, get the new track id and branch name then push to the parent
      this.props.editTrack({id: this.state.track.id, name: name, branch: branch})
    }

  }

}

export default EditTrack;
