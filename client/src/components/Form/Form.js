import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index';

const options = [
  { key: 'm', text: 'Mies', value: 'Hra' },
  { key: 'f', text: 'Nainen', value: 'Rva' },
  { key: 'o', text: 'Muu', value: 'other' },
]

class FormWithControl extends Component {
  state = {
    firstName:"",
    lastName:"",
    salution:"",
    userId:"",
  }

  componentDidMount() {
    let userData = Object.assign({},this.props.userData)
    console.log(userData)
    // console.log(typeof(userData))   
    // console.log(typeof(userData.userId))
 
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
    // const { userId, mame, salution } = this.state
  }

  handleSubmit = () => {
    let userData = {"userId": this.state.userId, "salution": this.state.salution, "name": this.state.firstName + ' ' + this.state.lastName}
    // this.props.helloWorld()
    this.props.addUser(userData)
    this.props.setUserData(userData)
    // window.alert("lähetä nappia painettu")
  } 


  render() {
    const { firstName, lastName, userId, salution } = this.state
    return (
      <Form >
        <Form.Group widths='equal'>
          <Form.Input 
            fluid label='Etunimi' 
            placeholder='Etunimi'
            name='firstName'
            value={firstName}
            onChange={this.handleChange} 
            /> 
          <Form.Input 
            fluid label='Sukunimi' 
            placeholder='Sukunimi'
            name='lastName'
            value={lastName}
            onChange={this.handleChange} />
          <Form.Select
            fluid label='Puhuttelu'
            options={options}
            placeholder='Sukupuoli'
            name='salution'
            value={salution}
            onChange={this.handleChange} 
          />
        </Form.Group>
        <Form.Group width='200'>
            <Form.Input
              size='20'
              fluid label='Käyttäjänimi'
              iconPosition='left'
              icon='at'
              placeholder='Käyttäjänimi'
              name='userId'
              value={userId}
              onChange={this.handleChange} 
              style={{width:'290px'}} />
        </Form.Group>
        <Form.TextArea label='Lisätiedot' placeholder='Muuta tietämisen arvoista...' />
        <Form.Checkbox label='Hyväksyn tietosuoja selosteen' />
        <Form.Button onClick={(props)=>{
          this.handleSubmit(props)}}
          >Lisää käyttäjä</Form.Button>          
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
    setUserData: (userData) => dispatch(actions.setUserData(userData)),
    helloWorld: () => dispatch(actions.helloWorld()),
    addUser: (userData) => dispatch(actions.addUser(userData)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWithControl)