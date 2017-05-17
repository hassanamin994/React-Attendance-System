import React, { Component } from 'react';

class Student extends Component {
  constructor(props){
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
  }
  render() {
    return (
      <tr>
        <td>{this.props.student.name}</td>
        <td>{this.props.student.type == 1? "Student": "Admin"}</td>
        <td>{this.props.student.track.name}</td>
        <td><a onClick={this.deleteStudent} className="btn btn-danger btn-xs" href="#">Delete</a> <a href="#" className="btn btn-primary btn-xs">Edit</a></td>
      </tr>
    );
  }
  deleteStudent(e){
    e.preventDefault();
    this.props.deleteStudent(this.props.student.id);
  }
}

export default Student;
