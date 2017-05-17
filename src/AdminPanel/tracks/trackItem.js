import React, { Component } from 'react';
import {Link} from 'react-router'
class TrackItem extends Component {
  constructor(props){
    super(props)
    this.deleteTrack = this.deleteTrack.bind(this)
  }
  render() {
    return (
      <tr>
        <td>{this.props.track.name}</td>
        <td>{this.props.track.branch.name}</td>
        <td><a onClick={this.deleteTrack} href="#" className="btn btn-danger btn-xs">Delete</a> <Link to={"/tracks/edit/"+this.props.track.id} className="btn btn-primary btn-xs" >Edit</Link></td>
      </tr>
    );
  }
  deleteTrack(e){
    e.preventDefault();
    this.props.deleteTrack(this.props.track.id);
  }
}

export default TrackItem;
