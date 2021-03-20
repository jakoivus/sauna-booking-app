import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Auth, Predicates } from 'aws-amplify';
import { Form, Icon } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import * as actions from '../../store/actions/index';

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
    let email = {
      email: "jakoivus@live.com"
    }
    this.props.getUserData(email)

    let session
    session = Auth.currentSession()
    .then(console.log("session: " ,session))
    let userData = Object.assign({},this.props.userData)
    console.log(userData)
  }

  componentDidUpdate(prevprops) {
    if (prevprops !== this.props) {
      console.log ("NEW props")
    }


  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
    // const { userId, mame, salution } = this.state
  }

  handleSubmit = () => {
    let userData = {
      // "id": uuidv4(), 
      "email": this.state.email, 
      "salution": this.state.salution,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    } 
    // this.props.helloWorld()
    this.props.addUser(userData)
    this.props.setUserData(userData)
    // window.alert("lähetä nappia painettu")
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
          >Lisää käyttäjä</Form.Button>
          <Form.Button
            
            onClick={(props)=>{
            this.props.setUserData({})}}
            >
              <Icon name="trash" />
              Poista tiedot  </Form.Button>
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
    getUserData: (email) => dispatch(actions.getUserData(email)),
    setUserData: (userData) => dispatch(actions.setUserData(userData)),
    helloWorld: () => dispatch(actions.helloWorld()),
    addUser: (userData) => dispatch(actions.addUser(userData)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWithControl)