import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import * as actions from '../../store/actions/index'

const options = [
  { key: 'm', text: 'Mies', value: 'Hra' },
  { key: 'f', text: 'Nainen', value: 'Rva' },
  { key: 'o', text: 'Muu', value: 'other' },
]

class FormWithControl extends Component {
  
  state = {
    email: "",
    firstName:"",
    lastName:"",
    salution:"",
  }

  componentDidMount() {
    this.props.getUser().then( res =>{ 
      let userData = {email: this.props.userData.email}
      this.props.getUserData(userData)
    })
  }

  componentDidUpdate() {
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    let userData = {
      "id": uuidv4(), 
      "role": 'user',
      "email": this.props.userData.email, 
      "salution": this.props.userData.salution,
      "firstName": this.props.userData.firstName,
      "lastName": this.props.userData.lastName
    } 
    console.log("addUser", userData)
    this.props.addUser(userData)
    this.props.setUserData(userData)
    } 

  render() {
    const { firstName, lastName, email, salution } = this.state 
    return (
      
      <Form >
        <Form.Group widths='equal'>
          <Form.Input 
            fluid label='Etunimi' 
            placeholder='Etunimi'
            name='firstName'
            defaultValue={this.props.userData.firstName}
            onChange={this.handleChange} 
            /> 
          <Form.Input 
            fluid label='Sukunimi' 
            placeholder='Sukunimi'
            name='lastName'
            defaultValue={this.props.userData.lastName}
            onChange={this.handleChange} />
          <Form.Input
            fluid label='Puhuttelu'
            // options={options}
            placeholder='Sukupuoli'
            name='salution'
            defaultValue={this.props.userData.salution}
            onChange={this.handleChange} 
          />
        </Form.Group>
        <Form.Group width='200'>
            <Form.Input
              fluid label='Käyttäjänimi'
              iconPosition='left'
              icon='at'
              placeholder='Käyttäjänimi'
              name='email'
              defaultValue={this.props.userData.email}
              onChange={this.handleChange} 
              style={{width:'290px'}} />
        </Form.Group>
        <Form.Group>
          <Form.TextArea label='Lisätiedot' placeholder='Muuta tietämisen arvoista...' />
          <Form.Checkbox label='Hyväksyn tietosuoja selosteen' />
        </Form.Group>
        <Form.Group>
        <div className="flex-row">
          <Form.Button onClick={(props)=>{
            this.handleSubmit(props)}}
            >Päivitä käyttäjä</Form.Button>
        </div>
        </Form.Group>
      </Form>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.userData
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actions.getUser()),
    getUserData: (userData) => dispatch(actions.getUserData(userData)),
    setUserData: (userData) => dispatch(actions.setUserData(userData)),
    updateUserData: (userData) => dispatch(actions.updateUserData(userData)),
    helloWorld: () => dispatch(actions.helloWorld()),
    addUser: (userData) => dispatch(actions.addUser(userData)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWithControl)