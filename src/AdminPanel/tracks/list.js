import React, { Component } from 'react';
import TrackItem from './trackItem'
import {Link} from 'react-router'
import $ from 'jquery'
import ApiRoutes from '../api_routes'
import Authentication from '../../authentication'

class Tracks extends Component {

  constructor(props){
    super(props)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.editTrack = this.editTrack.bind(this)
    this.editTrackItem = this.editTrackItem.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    // this.refreshTracks = this.refreshTracks.bind(this)
    this.state = {  tracks: []}
    this.apiRoutes = new ApiRoutes()
    this.auth = new Authentication()
  }
  componentDidMount(){
    var _this = this;
    $.ajax({
      url: this.apiRoutes.get_tracks_route(),
      method: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(data){
        _this.setState({tracks: data})
        // console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  render() {

    let tracks = this.state.tracks.map((track) => {return <TrackItem key={track.id} deleteTrack={this.deleteTrack} track={track} />} )

    return (
      <div className="tracks">
        <h2> Tracks </h2>
          <Link className="btn btn-primary pull-right" to="/tracks/new">New Track</Link>
        <table className="table text-left" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks}
          </tbody>
        </table>
        { this.props.children?  React.cloneElement(this.props.children, { addTrack: this.addTrack, editTrack: this.editTrack }): "" }
      </div>
    );

  }

  deleteTrack(id){
    if (confirm('Are you sure you want to delete this item ?')) {
        // make ajax to api and in success perform deleteListItem
        var _this = this;
        $.ajax({
          url: this.apiRoutes.get_tracks_route()+"/"+id,
          method: 'DELETE',
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
          success: function(resp){
            _this.deleteListItem(id)
          },
          error: function(err){
            console.log(err);
          }
        })
    }
  }
  deleteListItem(id){
    let tracks = this.state.tracks ;
    for (var i = 0; i < tracks.length; i++) {
      if(tracks[i].id == id ){
          tracks.splice(i, 1)
          console.log('matched');
          console.log(tracks);
      }
    }
    this.setState({tracks: tracks})
  }

  // add track
  addTrack(track){
    var _this = this ;
    $.ajax({
      url: this.apiRoutes.get_tracks_route(),
      method:'POST',
      data: {name: track.name, branch_id: track.branch},
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(resp){
        console.log(resp, 'track added');
        _this.addTrackItem(resp)
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  // refreshTracks(){
  //   var _this = this;
  //   $.ajax({
  //     url: this.apiRoutes.get_tracks_route(),
  //     method: "GET",
  //     beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
  //     success: function(data){
  //       _this.setState({tracks: data})
  //     },
  //     error: function(err){
  //       console.log(err);
  //     }
  //   })
  // }
  addTrackItem(track){
    console.log(track);
    let tracks = this.state.tracks ;
    tracks.push(track)
    this.setState({tracks: tracks})
  }
  editTrack(track){
    let  _this = this;
    $.ajax({
      url: this.apiRoutes.get_tracks_route()+"/"+track.id,
      method: 'PUT',
      data: {id: track.id, name: track.name, branch_id: track.branch },
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Bearer "+ _this.auth.get_access_token());},
      success: function(resp){
        // _this.editTrackItem(track) // get track from api and send to this function
        console.log(resp, 'track edited');
        _this.editTrackItem(resp)
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  editTrackItem(track){
    console.log(track.branch);
    let tracks = this.state.tracks;
    for (var i = 0; i < tracks.length; i++) {
      if(tracks[i].id == track.id){
        tracks[i].branch= track.branch;
        tracks[i].name = track.name;
      }
    }
    this.setState({tracks: tracks});
  }
}

export default Tracks;
