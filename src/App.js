import React, { Component } from 'react';
import logo from './logo.svg';
import KAM from './KAM.js'
import Attendance from './Attendance.js'
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
        fetch('https://sherriffspec-api.herokuapp.com/get/student/1')
            .then(results => {
                return results.json();
            }).then(results => {
                this.setState({student : results,
                               masteries : results.knowledge_area_masteries,
                               lab_attendance: results.lab_attendances,
                               guided_practices: results.guided_practices,
                               sprints: results.sprint_checks,
                               team_evals_received: results.team_evaluations_received,
                });
                console.log("state", this.state)
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
                    <div className="col text-center">
                        <KAM masteries={this.state.sprints}
                             title={"Course Project"}
                             team_evals_received={[]}
                             course_project_score={7.3333}
                        //TODO: add course_project_score to API
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
