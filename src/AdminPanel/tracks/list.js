import React, { Component } from 'react';
import TrackItem from './trackItem'
import {Link} from 'react-router'
import $ from 'jquery'
import ApiRoutes from '../api_routes'

class Tracks extends Component {

  constructor(props){
    super(props)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.state = {  tracks: []}
    this.apiRoutes = new ApiRoutes()

  }
  componentDidMount(){
    // let tracks = [
    //   {
    //       id: '1',
    //       name:'open source',
    //       branch: 'nasr city'
    //     },{
    //       id: '2',
    //       name:'cyber security ',
    //       branch: 'mansoura'
    //     },{
    //       id: '3',
    //       name:'Java',
    //       branch: 'Smart Village'
    //     }
    //
    // ];
    var _this = this;
    $.ajax({
      url: this.apiRoutes.get_tracks_route(),
      method: "GET",
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
    // let childs = React.cloneElement(this.props.children, { appState: this.state });

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
        { this.props.children?  React.cloneElement(this.props.children, { addTrack: this.addTrack }): "" }
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
      success: function(resp){
        console.log(resp);
        _this.addTrackItem(track)
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  addTrackItem(track){
    console.log(track);
    let tracks = this.state.tracks ;
    tracks.push(track)
    this.setState({tracks: tracks})
  }
}

export default Tracks;
