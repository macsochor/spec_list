import React, { Component } from 'react'; import logo from './logo.svg';
import {Button, Panel, Badge, CardBody, Card, Collapse, Jumbotron} from 'reactstrap';
class KAM extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { display_header: false, open: "", completed: 0, total: 0 };
    }

    toggle(ka) {
        let title = ka.ka.title;
        if(title === this.state.open){
            title = "";
        }
        this.setState({open: title});
    }

    render(){
        let completed = 0;
        let course_project_score = this.props.course_project_score;
        let num_evals = 0;
        let ka_list = this.props.masteries.map(function(ka) {
            let title = ka.title;
            let isopen = ka.title === this.state.open;
            if(ka.completed){
                completed++;
            }
            let check = ka.completed ? <Badge color="success" style={{marginLeft: '1rem'}}>Complete</Badge> :
                                       <Badge color="danger" style={{marginLeft: '1rem'}}>Incomplete</Badge>;
            return <div className="border" style={{background: '#fff', marginBottom: '1rem'}}>
            <h3  onClick={() => this.toggle({ka})} style={{margin: '1rem' }}><u>{ka.title}</u>{check}</h3>
            <Collapse isOpen={isopen}>
            <Card style={{ margin: '1rem' }}>
                    <CardBody>
                        {ka.comment}
                    </CardBody>
                </Card>
            </Collapse>
            </div>;
        }.bind(this));
        let total = ka_list.length;
        let course_project_score_header = course_project_score > 0 ? <div>
            <h2> Course Project Score: {course_project_score}</h2>
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
                {ka_list}
            </div>
            </div>);
    }
}

export default KAM;
