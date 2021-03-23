import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Dropdown, Form, Grid, GridColumn, StatusBubble, Table } from 'semantic-ui-react'
import axios from "axios";
import * as actions from "../../store/actions/index";
import './Page3.css';
import { Modal } from '../../components'

class Page3 extends Component {  

  state = {
    comments: [],
    rowFilter:""
  }

  componentDidMount() {
    this.props.getComments()
  }

  componentDidUpdate(prevprops) {
    if (prevprops.comments !== this.props.comments) {
      // this.props.getComments()
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({[name]: value })}

  handleRemove = (props) => {
    this.props.removeComments()
  }

  handleLoad = () => {
        this.props.getComments () 
  }

  handleDeleteComment = (comment, index) => {
    console.log("handleDelete:", comment, index)
    let newComments = [...this.props.comments]
    newComments.splice(index, 1)
    this.props.deleteComment(comment)
    this.props.removeComment(newComments)
  }
  
  renderTableHeaders=() => {
      let header = Object.keys(this.props.comments[0])
      return header.map((key, index) => {
         return <th>{key.toUpperCase()}</th>
      })
  }

  renderTableData=() => {
    const rows = (()  => {

      return this.props.comments
      .filter(comment=>comment.id > this.state.rowFilter)
      .map((comment, index) => {
        
          return (
            <Table.Row key={index} id={index}>              
              {/* <Table.Cell> {index}</Table.Cell> */}
              <Table.Cell> {comment.title}</Table.Cell>
              <Table.Cell> {comment.email}</Table.Cell>
              <Table.Cell> {comment.comment}</Table.Cell>
              <Table.Cell> 
                <Button icon='trash'
                  onClick={() =>{
                    this.handleDeleteComment(comment, index)} }></Button> </Table.Cell>
            </Table.Row>
          );
      });
    })
  
    return(
      <Table celled >
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>index</Table.HeaderCell> */}
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Comment</Table.HeaderCell>
            <Table.HeaderCell>Poista</Table.HeaderCell>
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
    let rowFilter = this.state.rowFilter
    let options =[ 
      { key: '1', value: '1', text: '1' },
      { key: '2', value: '2', text: '2' },
      { key: '3', value: '3', text: '3' },
      { key: '4', value: '4', text: '4' },
    ]

    return (
      <div className="home page-content flex-column flex-justify-center">
        <h1 className="main-header">Kommentit</h1>
            {this.renderTableData()}
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
    addComment: (comment) => dispatch(actions.addComment(comment)),
    deleteComment: (comment) => dispatch(actions.deleteComment(comment)),
    getComments: (comments) => dispatch(actions.getComments(comments)),
    removeComment: (newComment) => dispatch(actions.removeComment(newComment)),
    removeComments: (comments) => dispatch(actions.removeComments(comments))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3);