import React, { Component } from 'react';
import Student from './student'
import {Link} from 'react-router'
import ApiRoutes from '../api_routes'
import $ from 'jquery'

class Students extends Component {

  constructor(props){
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.addStudent = this.addStudent.bind(this)
    this.state = {  students: []}
    this.apiRoutes = new ApiRoutes()
  }
  componentDidMount(){
    // let students = [
    //   {
    //       id: '1',
    //       name:'hassan',
    //       email: 'hassan@hassan.com',
    //       track: 'open source'
    //     },{
    //       id: '2',
    //       name:'habib',
    //       email: 'habib@habib.com',
    //       track: 'open source'
    //     },{
    //       id: '3',
    //       name:'kazafy',
    //       email: 'kazafy@kazafy.com',
    //       track: 'open source'
    //     },
    //
    // ]
    var _this = this;
    $.ajax({
      url: this.apiRoutes.get_students_route(),
      method: "GET",
      success: function(data){
        console.log(data);
        // _this.setState({tracks: data})
        _this.setState({students: data})
        // console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    })
  }
  render() {

    let students = this.state.students.map((student) => {return <Student key={student.id} deleteStudent={this.deleteStudent} student={student} />} )
    return (
      <div className="students">
      <h2> Students </h2>
      <Link className="btn btn-primary pull-right" to="/students/new">Add Student</Link>
        <table className="table text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Track</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students}
          </tbody>
        </table>
        { this.props.children?  React.cloneElement(this.props.children, { addStudent: this.addStudent }): "" }
      </div>
    );
  }

  deleteStudent(id){
    if (confirm('Are you sure you want to delete this item ?')) {
      // make ajax to api and in success perform deleteListItem
      var _this = this;
      $.ajax({
        url: this.apiRoutes.get_students_route()+"/"+id,
        method: 'DELETE',
        success: function(resp){
          console.log(resp);
          _this.deleteListItem(id)
        },
        error: function(err){
          console.log(err);
        }
      })
    }
  }
  deleteListItem(id){
    let students = this.state.students ;
    for (var i = 0; i < students.length; i++) {
      if(students[i].id == id ){
          students.splice(i, 1)
          console.log('matched');
          console.log(students);
      }
    }
    this.setState({students: students})
  }
  addStudent(student){
    var _this = this
    $.ajax({
      url: this.apiRoutes.get_students_route(),
      method: 'POST',
      data: student,
      success: function(data){
        console.log(data);
        // after return from api the current object, add to the list
        _this.addStudentItem(data);
      },
      error: function(err){
        console.log(err);
      }
    })
  }

  addStudentItem(student){
    // console.log(student);
    let students = this.state.students ;
    students.push(student)
    this.setState({students: students})
  }
}

export default Students;
