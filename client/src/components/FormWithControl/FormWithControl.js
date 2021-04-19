import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index'

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
    if (this.props.userData != prevprops.userData) {
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
      "id": this.props.userData.id, 
      "role": 'user',
      "email": this.props.userData.email, 
      "salution": this.state.salution,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }    
    console.log("Handle updataUserData userData:", userData)
    this.props.updateUserData (userData)
    this.props.toggleShowUserDataTable(!this.props.showUserDataTable)
    } 

  render() {
    const { firstName, lastName, email, salution } = this.state 
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
        {/* <Form.Group>
          <Form.TextArea label='Lisätiedot' placeholder='Muuta tietämisen arvoista...' />
          <Form.Checkbox label='Hyväksyn tietosuoja selosteen' />
        </Form.Group> */}
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