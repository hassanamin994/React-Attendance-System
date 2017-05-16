import React, { Component } from 'react';
import TrackItem from './trackItem'
import {Link} from 'react-router'
class Tracks extends Component {

  constructor(props){
    super(props)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.state = {  tracks: [{
        id: '1',
        name:'open source',
        branch: 'nasr city'
      },{
        id: '2',
        name:'cyber security ',
        branch: 'mansoura'
      },{
        id: '3',
        name:'Java',
        branch: 'Smart Village'
      },
    ]}
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
        this.deleteListItem(id)
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
  addTrack(track){
      console.log(track);
      let tracks = this.state.tracks ;
      tracks.push(track)
      this.setState({tracks: tracks})
  }
}

export default Tracks;
