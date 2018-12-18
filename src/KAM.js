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
        let eval_score = 0;
        let num_evals = 0;
        this.props.team_evals_received.map(function(e) {
            num_evals++
            eval_score += e.rating
            return null
        })
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
        let eval_score_header = eval_score > 0 ? <div>
            <h2> Team Evaluation Score: {eval_score/num_evals}</h2>
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
                {eval_score_header}
                {ka_list}
            </div>
            </div>);
    }
}

export default KAM;
