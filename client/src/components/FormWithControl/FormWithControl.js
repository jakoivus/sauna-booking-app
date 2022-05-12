import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index'
import { v4 as uuidv4 } from 'uuid'

class FormWithControl extends Component {
  
  state = {
    email: "",
    firstName:"",
    lastName:"",
    role:"",
    salution:"",
    showUserDataTable: false
  }

  componentDidMount() {
      this.props.getUser()
    }

  componentDidUpdate(prevprops) {
    if (this.props.userData !== prevprops.userData) {
    let userData = Object.assign({}, this.props.userData);
    this.setState({
      ...userData
    })
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    let userData = {
      "id": this.state.id || uuidv4(), 
      "role": 'user',
      "email": this.state.email, 
      "salution": this.state.salution,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }    
    this.props.updateUserData (userData)
    this.props.toggleShowUserDataTable(!this.props.showUserDataTable)
    } 

  render() {
    return (
      <div >
        
      <h1 className="flex-column flex-justify-center">MUOKKAA TIETOJA</h1>
      <Form >
        <Form.Group widths='equal'>
          <Form.Input 
            fluid label='Etunimi' 
            placeholder='Etunimi'
            name='firstName'
            defaultValue={this.state.firstName}
            onChange={this.handleChange} 
            /> 
          <Form.Input 
            fluid label='Sukunimi' 
            placeholder='Sukunimi'
            name='lastName'
            defaultValue={this.state.lastName}
            onChange={this.handleChange} />
          <Form.Input
            fluid label='Puhuttelu'
            // options={options}
            placeholder='Sukupuoli'
            name='salution'
            defaultValue={this.state.salution}
            onChange={this.handleChange} 
          />
        </Form.Group>
        <Form.Field className="flex-column flex-justify-center">
            <Form.Input
              fluid label='Käyttäjänimi'
              iconPosition='left'
              icon='at'
              placeholder='Käyttäjänimi'
              name='email'
              value={this.state.email}
              onChange={this.handleChange} 
              style={{width:'300px'}} 
              />
        </Form.Field>
        <Form.Field>
        <div className="flex-row">
          <Form.Button
            type="button"
            onClick={(props)=>{
            this.handleSubmit(props)}}
            >Päivitä tiedot</Form.Button>
        </div>
        </Form.Field>
      </Form>
      
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    showUserDataTable: state.user.showUserDataTable
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (userData) => dispatch(actions.addUser(userData)),
    getUser: () => dispatch(actions.getUser()),
    getUserData: (userData) => dispatch(actions.getUserData(userData)),
    setUserData: (userData) => dispatch(actions.setUserData(userData)),
    toggleShowUserDataTable: (data) => dispatch(actions.toggleShowUserDataTable(data)),
    updateUserData: (userData) => dispatch(actions.updateUserData(userData)),
    helloWorld: () => dispatch(actions.helloWorld()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWithControl)