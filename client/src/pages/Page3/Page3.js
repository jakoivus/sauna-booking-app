import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, StatusBubble, Table } from 'semantic-ui-react'
import axios from "axios";
import * as actions from "../../store/actions/index";
import './Page3.css';
import { Modal } from '../../components'

class Page3 extends Component {  

  state = {
    show_1: false,
    show_2: false,
    requestState:""
  }

  filterRow = () => (
    <div className="flex-row filter-container">
      <div className="toggle-container">
        <div className="flex-column">
          <Checkbox 
            onChange={()=>this.setState({show_1: !this.state.show_1})} 
            checked={this.state.show_1} 
            disabled={this.state.requestState === 'sending'}
            toggle 
          />
        </div>
        <div>
          {/* <StatusBubble availability="available" /> */}
        </div>
      </div>
      <div className="toggle-container">
        <div className="flex-column">
          <Checkbox
            onChange={()=>this.setState({show_2: !this.state.show_2})} 
            checked={this.state.show_2} 
            disabled={this.state.requestState === 'sending'}
            toggle
          />
        </div>
        <div>
          {/* <StatusBubble availability="soon available" /> */}
        </div>
      </div>
    </div>
  );

  handleClick = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(resp => {
        this.props.getComments (resp.data) 
      }
    )
  }      

  renderTableHeader=() => {

    {
      let header = Object.keys(this.props.comments[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

  }

  renderTableData=() => {

    const rows = (()  => {
      let col = Object.keys(this.props.comments); 

      return this.props.comments
      .filter(comment=>comment.id > 3)
      .map(comment => {
        console.log(col);
          return (
            <Table.Row>
              <Table.Cell> {comment.postId}</Table.Cell>
              <Table.Cell> {comment.id}</Table.Cell>
              <Table.Cell> {comment.name}</Table.Cell>
              <Table.Cell> {comment.email}</Table.Cell>
              <Table.Cell> {comment.body}</Table.Cell>
            </Table.Row>
          );
      });
    })
  
    return(
      <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PostId</Table.HeaderCell>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Body</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows()}
        </Table.Body>
        </Table>
    )
  }
  
  render ( ) {

    let commentsArray = this.props.comments

    return (
      <div className="home page-content flex-column flex-justify-center">
        <h1 className="main-header inverted-text">Sivu 3</h1>
          <h2>
            <Modal ui inverted > </Modal>
          </h2>           
        <Button ui inverted size="huge" onClick={(props)=>{
          console.log ("CLICK")
          this.handleClick(props)
        }}
          >Tuo taulukko</Button> 
            {this.filterRow()}
            {commentsArray.length ?  this.renderTableData()
            :  
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>PostId</Table.HeaderCell>
                  <Table.HeaderCell>id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Body</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
            }
      </div>  
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userData.user,
    comments: state.user.comments};
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (comments) => dispatch(actions.getComments(comments))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3);