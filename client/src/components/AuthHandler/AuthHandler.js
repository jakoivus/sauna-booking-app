import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { BgContainer } from '../../containers';
import { Form, Label, Button, Icon } from 'semantic-ui-react'

import './AuthHandler.css';

class AuthHandler extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    uiState: "signIn",
    confirmCode: "",
    error: "",
  }
  componentDidMount() {
    Amplify.configure(awsconfig);
  }

  // resize() {
  //   this.setState({ windowWidth: window.innerWidth });
  // }

  signIn = (e) => {
    console.log("SIGNIN" ,)
     this.setState({ error: "" });
    e.preventDefault();
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({ uiState: 'newPasswordRequired', user: user, password: '', loading: false });
        }
      })
      .catch(err => {
        console.log (err.code)
        if (err.code === "UserNotFoundException") {
          
        window.alert("STOP",err.code)
        }
        else if (err.code === 'NotAuthorizedException') {
          window.alert("Väärä salasana, ole hyvä yritä uudelleen")
        }
        else if (err.message === "PreAuthentication failed with error Wrong clientId.") {
          
          window.alert("Väärä käyttäjätunnus, ole hyvä yritä uudelleen")
        }
        else if (err.code === 'UserLambdaValidationException') {
          window.alert("Käyttäjätunnus tai salasana ei kelpaa, ole hyvä yritä uudelleen")
        }
        // this.setState({ error: errorText, loading: false })
      });
  }

    changeUI(newState, msg = "") {
      this.setState({ uiState: newState, error: "", msg: msg, password: "", password2: "", confirmCode: "", firstName: "", lastName: "" });
    }

  getContent = () => {

    if (this.state.uiState === "signIn") {
      return (
          <div className="SingInPage flex-column">
            <div className="SignInContainer">
              <h1>Kirjaudu sisään</h1>
              <Form>
              <Form.Field>
                {/* <Label>Sähköposti</Label> */}
                <Form.Input
                  fluid label='Sähköposti'
                  value={this.state.email} 
                  type="email" 
                  placeholder="Sähköposti"
                  onChange={e => this.setState({email: e.target.value})} 
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid label='Salasana' 
                  value={this.state.password} 
                  type="password" 
                  placeholder="salasana" 
                  onChange={e => this.setState({password: e.target.value})} 
                />
              </Form.Field>
              <Form.Button 
                size="large"
                color="orange"
                onClick={this.signIn} 
                className="mainButton"
                disabled={!this.state.email || !this.state.password}
              >
                <Icon name="sign-in" />
                Kirjaudu        
              </Form.Button>
            </Form>         
          </div>
          </div>
      )}
    }
  render() {

    return (
      <div style={{height: "100vh"}}>
        <BgContainer>
          <div className="" style={{ textAlign: 'center', color: 'orange' }}>
              {this.getContent()}
            </div>
        </BgContainer>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const mapStateToProps = state => {
  return {
  };
};

AuthHandler.displayName = "AuthHandler"
export default(connect(mapStateToProps, mapDispatchToProps)(AuthHandler));