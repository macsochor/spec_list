import React, { Component } from 'react';
import logo from './logo.svg';
import KAM from './KAM.js'
import Attendance from './Attendance.js'
import Sprints from './Sprints.js'
//import './App.css';
import {Button, Panel, Badge, Table, CardBody, Card, Collapse} from 'reactstrap'

class Header extends React.Component{
    render(){
        console.log("inside header", this.props)
        return (
            <div style={{background: "#f6f6f6"}}>
                <h6 style={{color: "#f6f6f6"}}>_</h6>
                <div className="row text-center" style={{marginTop: '5rem'}}>
                    <div className="col">
                        <h3>Role: {this.props.role}</h3>
                        <h3>Team: {this.props.team_name}</h3>
                    </div>
                    <div className="col-6">
                        <h1>Spec Grading for  <strong>{this.props.comp_id}</strong></h1>
                    </div>
                    <div className="col">
                        <h3>Lab: {this.props.lab_section}</h3>
                        <h3>Github: {this.props.github}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isToggleOn: true,
            student: [],
            masteries: [],
            lab_attendance: [],
            guided_practices: [],
            sprints: [],
            team_evals_received: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      //TODO make this url dynamically fetched based on flavor
      let url = "http://localhost:5000/"
        fetch('http://localhost:5000/get/student/1')
            .then(results => {
                return results.json();
            }).then(results => {
                this.setState({student : results,
                               lab_attendance: results.lab_attendances,
                               guided_practices: results.guided_practices,
                               sprints: results.sprint_checks,
                               team_evals_received: results.team_evaluations_received,
                });
                console.log("state", this.state)
            })
      //TODO look into why the get/student/1 does not return kam_pieces
      fetch('http://localhost:5000/get/student/1/knowledge_area_masteries')
            .then(masteries => {
              return masteries.json();
            }).then(masteries => {
              console.log("GET KAMs", masteries.objects)
              for(let ka_index = 0; ka_index < masteries.objects.length; ka_index++){
                let ka = masteries.objects[ka_index]
                for(let pg_index = 0; pg_index < ka.pass_groups.length; pg_index++){
                  let pg = ka.pass_groups[pg_index]
                  pg.pass_group_pieces = []
                  console.log("pg", pg)
                  fetch(url+"get/pass_group/" + pg.id).then(pass_group => {
                    return pass_group.json();
                  }).then(pass_group => {
                    console.log("INSIDE PASS GROUP", pass_group)
                    pg.pass_group_pieces = pass_group.pass_group_pieces
                    this.setState({masteries: masteries.objects})
                  })
                };
                console.log("STATE", this.state)
              }
            })
    }

    handleClick(){
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <div style={{background: "#f6f6f6"}}>
                <div>
                    <Header
                        comp_id={this.state.student.comp_id}
                        name={this.state.student.first_name + " " + this.state.student.last_name}
                        github={this.state.student.github}
                        lab_section={this.state.student.lab_section}
                        team_name={this.state.student.team_id}
                        role={this.state.student.role}
                    />
                </div>
                <div className="row" style={{marginTop: '5rem'}}>
                    <div className="col" style={{marginLeft: '2rem'}}>
                        <div className="mx-auto" style={{flex: 1}}>
                            <KAM masteries={this.state.masteries}
                                 title={"Knowledge Area Masteries"}
                                 team_evals_received={[]}
                            />
                        </div>
                    </div>
                    <div className="col">
                      <Sprints sprints={this.state.sprints}
                               title={"Sprint Checks"}
                               course_project_score={7.5}
                      />
                    </div>
                    <div className="col" style={{marginRight: '2rem'}}>
                        <Attendance lab_attendance={this.state.lab_attendance}
                                    team_evals_received={this.state.team_evals_received}
                                    guided_practices={this.state.guided_practices}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
