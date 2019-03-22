import React, { Component } from 'react';
import {Button, Panel, Badge, Table, CardBody, CardTitle, Card, Collapse, CardText} from 'reactstrap'

class Attendance extends React.Component {
    constructor(props){
        super(props)
        this.state = { open: "" }
    }

  toggle(title) {
    if(title === this.state.open){
      title = "";
    }

    this.setState({open: title});
  }

    render(){
      //Calculate missed labs
        let missed_labs = 0;
        let lab_attendance_list = this.props.lab_attendance.map(function(la){
          let badge = <Badge color={la.attended ? "success" : "danger"}
                             style={{marginLeft:'1rem'}}>{la.attended ? "Attended" : "Absent"}</Badge>
            let date = new Date().toISOString()
            if(!la.attended){
              missed_labs++
            }
            return <div className="border" style={{background: '#fff', marginBottom: '1rem'}}>
              <Card outline color = {la.attended ? "success" : "danger"}>
                <CardBody>
                  <CardTitle>{la.date}{badge}</CardTitle>
                </CardBody>
              </Card>
            </div>;
        }.bind(this))
      let eval_score = 0;
      let num_evals = 0;
      this.props.team_evals_received.map(function(e) {
        num_evals++
        eval_score += e.rating
        return null
      })

      //Calculate missed guided practices
        let missed_gps = 0;
        let gp_list = this.props.guided_practices.map(function(gp){
          console.log(gp)
          if(!gp.passed) missed_gps++
          let isopen = gp.title === this.state.open;
          let badge = <Badge color={gp.passed ? "success" : "danger"}
                             style={{marginLeft:'1rem'}}>{gp.passed ? "Complete" : "Incomplete"}</Badge>
          return <div className="border" style={{background: '#fff', marginBottom: '1rem'}}>
                <Card outline color = {gp.passed ? "success" : "danger"}>
                  <CardBody>
                    <CardTitle>{gp.title}{badge}</CardTitle>
                    <CardText>{gp.date}</CardText>
                  </CardBody>
                </Card>
          </div>;
        }.bind(this));

        let total = lab_attendance_list.length
        let total_gps = gp_list.length
        let isopen = "gp" === this.state.open
     return <div style={{background: "#e6e6e6", paddingBottom:'1rem', paddingTop:'1rem'}}>
        <div className="text-center">
            <h1><strong>Class Partcipation</strong></h1>
        <h2>Labs Attendance: {total-missed_labs}/{total}</h2>
        <h2>Guided Practices: {total_gps - missed_gps}/{total_gps}</h2>
        <h2> Team Evaluation Score: {eval_score/num_evals}</h2>
        </div>
        <div>
      <Card body outline color style={{ margin: '1rem' }}>
      <h3  onClick={() => this.toggle("gp")} style={{margin: '0' }}><u>Guided Practices: {total_gps - missed_gps}/{total_gps}</u></h3>
        <Collapse isOpen={this.state.open === "gp"}>
      <CardBody>
            {gp_list}
      </CardBody>
        </Collapse>
                </Card>
      <Card body outline color style={{ margin: '1rem' }}>
        <h3 onClick={() => this.toggle("lab")} style={{margin: '0' }}><u>Lab Attendances: {total-missed_labs}/{total}</u></h3>
                <Collapse isOpen={this.state.open === "lab"}>
                  <CardBody>
                {lab_attendance_list}
              </CardBody>
                </Collapse>
            </Card>

        </div>
        </div>
    }
}
//{lab_attendance_list}
export default Attendance;
