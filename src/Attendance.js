import React, { Component } from 'react';
import {Button, Panel, Badge, Table, CardBody, Card, Collapse} from 'reactstrap'

class Attendance extends React.Component {
    constructor(props){
        super(props)
        this.state = { open: "" }
    }
    render(){
      //Calculate missed labs
        let missed_labs = 0;
        let lab_attendance_list = this.props.lab_attendance.map(function(la){
            let badge = <Badge color="success" style={{marginLeft:'1rem'}}>Attended</Badge>
            let date = new Date().toISOString()
            console.log(date, la.date)
            if(!la.attended){
                if(date < la.date){
                    badge = <div/>
                } else {
                    badge = <Badge color="danger" style={{marginLeft:'1rem'}}>Absent</Badge>
                    missed_labs++
                }
            }
            return <div>
                <Table bordered style={{marginBottom:'1rem'}}>
                    <tbody>
                        <tr>
                            <th scope="row" style={{background:"#fff", verticalAlign:'middle'}}><h4>{la.date}{badge}</h4></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
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
            let badge = <Badge color="success" style={{marginLeft:'1rem'}}>Completed</Badge>
            let date = new Date().toISOString()
            console.log(date, gp.date)
            console.log(date > gp.date)
            if(!gp.passed){
                //Do not display any future
                if(date < gp.date){
                    badge = <div/>
                } else {
                    badge = <Badge color="danger" style={{marginLeft:'1rem'}}>Incomplete</Badge>
                    missed_gps++
                }
            }
            return <div >
                <Table bordered style={{marginBottom:'1rem'}}>
                    <tbody>
                        <tr>
                            <th scope="row" style={{background: "#fff", verticalAlign:'middle'}}><h4>{gp.title}{badge}</h4></th>
                        </tr>
                    </tbody>
                </Table>
            </div>

        }.bind(this))

        let total = lab_attendance_list.length
        let total_gps = gp_list.length
        return <div style={{background: "#e6e6e6", padding:'1rem'}}>
        <div className="text-center">
            <h1><strong>Class Partcipation</strong></h1>
        <h2>Labs Attendance: {total-missed_labs}/{total}</h2>
        <h2>Guided Practices: {total_gps - missed_gps}/{total_gps}</h2>
        <h2> Team Evaluation Score: {eval_score/num_evals}</h2>
        </div>
        <div >
            {gp_list}
            {lab_attendance_list}
        </div>
        </div>
    }
}

export default Attendance;
