import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import axios from "axios";
import * as actions from "../../store/actions/index";
import './Page3.css';
import { EducationTable } from '../../components'
import { Modal } from '../../components'

class Page3 extends Component {
// const Page3 = (props) => {
  

  handleClick = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(resp => {
        this.props.upDateComments (resp.data) 
      }
    )
  }      
  
  render ( ) {

    let commentsArray = this.props.comments

    return (
      <div className="home page-content flex-column flex-justify-center">
        <h1 className="main-header inverted-text">Sivu 3</h1>
          <h2>
            <Modal ui inverted ></Modal>
          </h2>           
        <Button ui inverted size="huge" onClick={(props)=>{
          console.log ("CLICK")
          this.handleClick(props)
        }}
          >Lue data APIsta</Button> 
            {commentsArray.length ?  
            <h1 className="page-content flex-column flex-justify-center paragraph-text">Taulukossa  dataa </h1>
            : <h1 className="paragraph-text">Taulukossa EI dataa</h1>}
          <EducationTable />     
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
    upDateComments: (comments) => dispatch(actions.upDateComments(comments))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3);