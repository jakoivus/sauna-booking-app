import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Label, Menu, Tab, Table } from 'semantic-ui-react'
import * as actions from "../../store/actions/index";

const initialState = {
  comments: []
} 

class DataTable extends Component {

  componentDidMount() {
    this.props.getUser()
  } 

  handleSubmit = () => {
    console.log("Handle submite userData:")
    this.props.toggleShowUserDataTable(!this.props.showUserDataTable)
    } 
  
  render () {
    
    return(
      <div>
        
      <h1 className="flex-column flex-justify-center">OMAT TIEDOT</h1>
      <Table >
        {/* <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tämä on Malli Taulukko </Table.HeaderCell>
            <Table.HeaderCell>Vuosi</Table.HeaderCell>
            <Table.HeaderCell>Oppilaitos</Table.HeaderCell>
            <Table.HeaderCell>Pääaineet</Table.HeaderCell>
          </Table.Row>
        </Table.Header> */}

        <Table.Body>
         <Table.Row>
            <Table.Cell >
              {this.props.user.lastName}
                      </Table.Cell>
            <Table.Cell>{this.props.user.firstName}</Table.Cell>
            <Table.Cell>{this.props.user.email}</Table.Cell>
            {/* <Table.Cell>Mikroelektroniikka ja materiaalifysiikka</Table.Cell> */}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Master or Business Administration,  MBA</Table.Cell>
            <Table.Cell>2007</Table.Cell>
            <Table.Cell>Reading University, Henley Business School</Table.Cell>
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
              <Button className="flex-column flex-justify-center" onClick={(props)=>{this.handleSubmit(props)}}
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