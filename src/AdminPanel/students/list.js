import React, { Component } from 'react';
import Student from './student'
class Students extends Component {

  constructor(props){
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.state = {  students: [{
        id: '1',
        name:'hassan',
        email: 'hassan@hassan.com',
        track: 'open source'
      },{
        id: '2',
        name:'habib',
        email: 'habib@habib.com',
        track: 'open source'
      },{
        id: '3',
        name:'kazafy',
        email: 'kazafy@kazafy.com',
        track: 'open source'
      },
    ]}
  }
  render() {

    let students = this.state.students.map((student) => {return <Student key={student.id} deleteStudent={this.deleteStudent} student={student} />} )
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Track</th>
          </tr>
        </thead>
        <tbody>
          {students}
        </tbody>
      </table>
    );
  }

  deleteStudent(id){
    if (confirm('Are you sure you want to delete this item ?')) {
      // make ajax to api and in success perform deleteListItem
      this.deleteListItem(id)
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
}

export default Students;
