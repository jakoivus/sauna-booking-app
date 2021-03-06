import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'semantic-ui-react'
import * as actions from "../../store/actions/index";


class DataTable extends Component {

  componentDidMount() {
    this.props.getUser()
  } 

  handleModifyUserData = () => {
    this.props.toggleShowUserDataTable(!this.props.showUserDataTable)
    } 
  
  render () {
    
    return(
      <div>
        
      <h1 className="flex-column flex-justify-center">OMAT TIEDOT</h1>
      <Table >

        <Table.Body>
         <Table.Row>
            <Table.Cell >{this.props.user.lastName}</Table.Cell>
            <Table.Cell>{this.props.user.firstName}</Table.Cell>
            <Table.Cell>{this.props.user.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Tekniikan tohtori, TkT</Table.Cell>
            <Table.Cell>2000</Table.Cell>
            <Table.Cell>Oulun Yliopisto</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Master or Business Administration,  MBA</Table.Cell>
            <Table.Cell>2007</Table.Cell>
            <Table.Cell>Henley Business School</Table.Cell>
            {/* <Table.Cell>Strategia ja Muutosjohtaminen</Table.Cell> */}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Filosofian Maisteri, FM</Table.Cell>
            <Table.Cell>1996</Table.Cell>
            <Table.Cell>Oulun Ylioposto</Table.Cell>
            {/* <Table.Cell>Kokeellinen</Table.Cell> */}
          </Table.Row>
        </Table.Body>

        <Table.Footer>


        </Table.Footer>
      </Table>
              <div >
              <Button className="flex-column flex-justify-center" onClick={(props)=>{this.handleModifyUserData(props)}}
                >Muokkaa tietoja  </Button>
            </div>
            </div>
  )

}}
// const EducationTable = () => (


  const mapStateToProps = (state) => {
    return {
      user: state.user.userData,
      showUserDataTable: state.user.showUserDataTable
  };
}
    
  const mapDispatchToProps = (dispatch) => {
    return {
      getUser: () => dispatch(actions.getUser()),
      toggleShowUserDataTable: (data) => dispatch(actions.toggleShowUserDataTable(data)),
      // getComments: (comments) => dispatch(actions.getComments(comments))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)