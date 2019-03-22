import React, { Component } from 'react'; import logo from './logo.svg';
import {Button, Panel, Badge, CardBody, CardTitle, CardText, Card, Collapse, Jumbotron} from 'reactstrap';
class Sprints extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { display_header: false, open: "", completed: 0, total: 0};
    console.log("Sprints Constructor")
  }

  toggle(sprint) {
    let title = sprint.sprint.title;
    if(title === this.state.open){
      title = "";
    }
    this.setState({open: title});
  }

  render(){
    let completed = 0;
    let course_project_score = this.props.course_project_score;
    let num_evals = 0;
    let sprint_list = this.props.sprints.map(function(sprint) {
      let title = sprint.title;
      let isopen = sprint.title === this.state.open;
      if(sprint.passed){
        completed++;
      }
      let check = sprint.passed ? <Badge color="success" style={{marginLeft: '1rem'}}>Complete</Badge> :
                  <Badge color="danger" style={{marginLeft: '1rem'}}>Incomplete</Badge>;
      return <div className="border" style={{background: '#fff', marginBottom: '1rem'}}>
        <h3  onClick={() => this.toggle({sprint})} style={{margin: '1rem' }}><u>{sprint.title}</u>{check}</h3>
        <Collapse isOpen={isopen}>
          <Card body outline color = {sprint.passed ? "success" : "danger"} style={{ margin: '1rem' }}>
            <CardBody>
              <CardTitle>{sprint.date}</CardTitle>
                <CardText>{sprint.comment}</CardText>
            </CardBody>
          </Card>
        </Collapse>
      </div>;
    }.bind(this));
    let total = sprint_list.length;
    let course_project_score_header = course_project_score > 0 ? <div>
      <h2 className="text-center"> Course Project Score: {course_project_score}</h2>
    </div> : <div/>
    let header = <div className="text-center">
      <h1><strong>{this.props.title}</strong></h1>
      <h2>{completed} / {total} Completed </h2>
    </div>;
    console.log(this.props)
    return(
      <div>
        <div style={{background: "#e6e6e6", padding: '1rem'}}>
          {header}
          {course_project_score_header}
          {sprint_list}
        </div>
      </div>);
  }
}

export default Sprints;
