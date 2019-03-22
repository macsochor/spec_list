import React, { Component } from 'react'; import logo from './logo.svg';
import {Button, Panel, Badge, CardBody, CardTitle, CardText, Card, Collapse, Jumbotron} from 'reactstrap';
class KAM extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.isFirstCard = true
    this.allSubPiecesComplete = true
    this.state = { display_header: false, open: "", completed: 0, total: 0};
    console.log("KAM Constructor")
  }

  toggle(ka) {
    let title = ka.ka.title;
    if(title === this.state.open){
      title = "";
    }
    this.setState({open: title});
  }

  render(){
    console.log("INSIDE KAM RENDER, PROPS:",this.props)
    this.isFirstCard = true;
    let completed = 0;
    let course_project_score = this.props.course_project_score;
    let num_evals = 0;
    let ka_list = this.props.masteries.map(function(ka) {
      this.kam_complete = false;
      console.log("ka", ka)
      let ka_pieces = <h1>There are no pass groups for this KAM yet</h1>
      if(ka.pass_groups && ka.pass_groups.length > 0){
        ka_pieces = ka.pass_groups.map((group) =>{
          console.log("GROUP", group)
          this.allSubPiecesComplete = true;
          console.log("Group.piece", group.pass_group_pieces)
          let sub_pieces = group.pass_group_pieces.map((piece) => {
            console.log("PIECE", piece)
            let check = piece.completed ? <Badge color="success" style={{marginLeft: '1rem'}}>Complete</Badge>
                      : <Badge color="danger" style={{marginLeft: '1rem'}}>Incomplete</Badge>;
            //I like to think there is a cleaner way to add space between list elements but for now I can't find one.
            let topPadding = this.isFirstCard ? <div/> : <div style={{marginTop:'1rem'}}/>
            this.allSubPiecesComplete = this.allSubPiecesComplete && piece.completed
            let p = <div>
            {topPadding}
              <Card body outline color = {piece.completed ? "success" : "danger"}>
                <CardTitle >{piece.title}{check}</CardTitle>
                  <CardText>{piece.comment}</CardText>
              </Card>
              </div>
            this.isFirstCard = false;
            return p
          })
          console.log("ka.completed: ", ka.completed)
          console.log("this.allsubpiecescomplete", this.allSubPiecesComplete)
          this.kam_complete = this.kam_complete || this.allSubPiecesComplete
          let pg = <Card style={{marginBottom:'1rem'}}
                         body outline color={this.allSubPiecesComplete ? "success" : "danger"}>
                <h3>{group.title}</h3> {sub_pieces} </Card>
          this.isFirstCard = true;
          return pg
        })
      }

      let title = ka.title;
      let isopen = ka.title === this.state.open;
      if(this.kam_complete){
        completed++;
      }

      console.log("BEFORE CHECK KA:", ka)
      let check = this.kam_complete ? <Badge color="success" style={{marginLeft: '1rem'}}>Complete</Badge> :
                  <Badge color="danger" style={{marginLeft: '1rem'}}>Incomplete</Badge>;
      return <div className="border" style={{background: '#fff', marginBottom: '1rem'}}>
        <h3  onClick={() => this.toggle({ka})} style={{margin: '1rem' }}><u>{ka.title}</u>{check}</h3>
        <Collapse isOpen={isopen}>
          <Card body outline color style={{ margin: '1rem' }}>
            <CardBody>
              {ka_pieces}
            </CardBody>
          </Card>
        </Collapse>
      </div>;
    }.bind(this));
    let total = ka_list.length;
    let header = <div className="text-center">
      <h1><strong>{this.props.title}</strong></h1>
      <h2>{completed} / {total} Completed </h2>
    </div>;
    console.log(this.props)
    return(
      <div>
        <div style={{background: "#e6e6e6", padding: '1rem'}}>
          {header}
          {ka_list}
        </div>
      </div>
    );
  }
}

export default KAM;
