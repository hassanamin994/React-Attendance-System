import React, { Component } from 'react';
import TrackItem from './trackItem'
class Tracks extends Component {

  constructor(props){
    super(props)
    this.deleteTrack = this.deleteTrack.bind(this)
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
    return (
      <div class="tracks">
      <table className="table">
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
      { this.props.children }
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
}

export default Tracks;
