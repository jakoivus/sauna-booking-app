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

  signIn = (e) => {
    console.log("SIGNIN" ,)
    e.preventDefault();
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({ uiState: 'newPasswordRequired', user: user, password: ''});
        } 
      })
      .catch(err => {
        console.log (err.code)
        if (err.code === "UserNotFoundException") {
        window.alert("Käyttäjänimeä ei löytynyt",err.code)
        }
        else if (err.code === 'NotAuthorizedException') {
          window.alert("Väärä käyttäjänimi tai salasana, ole hyvä yritä uudelleen")
        }
        else if (err.message === "PreAuthentication failed with error Wrong clientId.") {   
          window.alert("Väärä käyttäjätunnus, ole hyvä yritä uudelleen")
        }
      });
  }

  signUp = (e) => {

    e.preventDefault();

    if (this.state.email.length === 0 || this.state.password.length === 0) {
      window.alert("Anna nimesi, sähköpostiosoitteesi ja salasanasi.")
      return;
    }

    Auth.signUp({
      username: this.state.email,
      password: this.state.password
    })
    .then(data => {this.setState({uiState: "confirm"})})
    .catch(err => {
      if (err.code === 'InvalidParameterException') {
        if (err.message.includes('password') || err.message.includes('Password')) {
          window.alert("Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita.")
        } else if (err.message.includes('email')) {
          window.alert("Virheellinen sähköpostiosoite.")
        }
      } 
      else if (err.code === 'InvalidPasswordException') {
        window.alert("Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita.")
      } else if (err.code === 'UsernameExistsException') {
        window.alert("Käyttäjä tili on jo rekisteröity")
      }
    });
  }


  confirm = (e) => {
    e.preventDefault()
    window.alert("Vahvistaminen")
    Auth.confirmSignUp(this.state.email, this.state.confirmCode)
    .then(data => this.changeUI("signIn"))
    .catch(err => {
      var errorText = err.message;
      if (err.code === 'NotAuthorizedException') {
        window.alert("Käyttäjänimi on jo vahvistettu")
      } else if (err.code === 'UserNotFoundException') {
        window.alert("Käyttäjänimeä ei löytynyt",err.code)
      } else if (err.code === 'CodeMismatchException') {
        window.alert("Antamasi vahvistuskoodi on virheellinen, olehyvä ja tarkista saamasi sähköposti")
      } 
      this.setState({error: errorText})        
    });
  }

  newPasswordRequired = (e) => {
    console.log("NEW PWD REQUIRED" ,)
    e.preventDefault();

    if (this.state.password !== this.state.password2) {
        window.alert("Antamasi salasanat eivät ole samat.")
      return;
    }

    Auth.completeNewPassword(
      this.state.user,           // the Cognito User Object
      this.state.password,       // the new password
    ).then(user => {
      this.setState({uiState: 'signIn'});
    })
    .catch(err => {
      console.log(err);
      if (err.code === "InvalidPasswordException") {
        window.alert("Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita.",err.code)
      }
    });
  }

  forgottenPassword = (e) => {

    e.preventDefault();

    if (this.state.passwordResetConfirmation) {
      if (this.state.email.length === 0 || this.state.confirmCode.length === 0 || this.state.password.length === 0) {
        window.alert("Anna sähköpostiosoitteesi, vahvistuskoodi ja uusi salasana kahteen kertaan.")
        return;
      }
      if (this.state.password !== this.state.password2) {
        window.alert("Salasanat eivät ole identtiset.")
        return;
      }
      Auth.forgotPasswordSubmit(this.state.email, this.state.confirmCode, this.state.password)
        .then(data => {
          this.setState({passwordResetConfirmation: false});
          this.changeUI("signIn");
        })
        .catch(err => {
          if (err.code === "CodeMismatchException") {
            window.alert("Antamasi vahvistuskoodi on virheellinen")
          } 
          else if (err.code === 'UserNotFoundException') {
            window.alert("Antamallasi sähköpostiosoitteella ei ole tiliä.")
          }
          else if (err.code === 'InvalidPasswordException') {
            window.alert("Virheellinen salasana.")
          }
          else if (err.code === 'InvalidParameterException') {
            if (err.message.includes('password') || err.message.includes('Password')) {
              window.alert("Virhellinen salasana.")
            } 
            else if (err.message.includes('email')) {
              window.alert("Virheellinen sähköpostiosoite.")
            } 
            else if (err.message.includes('confirmationCode')) {
              window.alert("Antamasi vahvistuskoodi on virheellinen")
            }
          } 
          else if (err.code === 'ExpiredCodeException') {
            window.alert("Vahvistuskoodi on vanhentunut. Voit tilata uuden vahvistuskoodin")
          }
        });
    } else {
      if (this.state.email.length === 0) {
        window.alert("Ei sähköpostisoitetta")
        return;
      }
      Auth.forgotPassword(this.state.email)
      .then(data => this.setState({passwordResetConfirmation: true}))
      .catch(err => {
        var errorText = err.message;
        if (err.code === "UserNotFoundException") {
          window.alert("Antamallasi sähköpostiosoitteella ei ole tiliä.")
        }
        else if (err.code === "NotAuthorizedException") {
          window.alert("Salasanan vaihto ei sallittu.")
        }
        this.setState({error: errorText})        
      });
    }
  }

  changeUI(newState) {
      console.log ("uiState: " ,newState)
      this.setState({ uiState: newState, password: "", password2: "", confirmCode: "" });
    }

  getContent = () => {

    if (this.state.uiState === "signIn") {
      return (
          <div className="SingInPage flex-column">
            <div className="SignInContainer">
              <h1>Kirjaudu sisään</h1>
              <Form>
              <Form.Field>
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
              <Form.Button 
                size="large"
                color="orange"
                onClick={() => {this.changeUI("confirm")}}
                className="mainButton"
              >
                Vahvista sähköposti     
              </Form.Button>
              <Form.Button
                type="button"
                size="large"
                color="orange"
                onClick={() => {this.changeUI("signUp")}}
                className="mainButton"
              >
                Rekisteröidy     
              </Form.Button>
            </Form>         
          </div>
          </div>
      )}
      else if (this.state.uiState === "signUp") {
        return (
            <div className="SingInPage flex-column">
              <div className="SignInContainer">
                <h1>Rekisteröidy</h1>
                <Form>
                <Form.Field>
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
              </Form.Field>              <Form.Button 
                size="large"
                color="orange"
                onClick={this.signUp} 
                className="mainButton"
                disabled={!this.state.email || !this.state.password}
              >
                Rekisteröidy
              </Form.Button>

                <Button 
                type="button"
                size="large"
                color="orange"
                onClick={() => {this.changeUI("signIn")}}
                className="mainButton"
              >
                Takaisin kirjautumiseen        
              </Button>
              </Form>
              </div>
          </div>
        )
      }
      else if (this.state.uiState === "confirm") {
      return (
          <div className="SingInPage flex-column">
            <div className="SignInContainer">
              <h1>Vahvista sähköposti</h1>
              <Form>
              <Form.Field>
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
                  fluid label='Vahvistuskoodi' 
                  value={this.state.confirmCode} 
                  type="confirmCode" 
                  placeholder="Vahvistuskoodi" 
                  onChange={e => this.setState({confirmCode: e.target.value})} 
                />
              </Form.Field>
              <Form.Button 
                size="large"
                color="orange"
                onClick={this.confirm} 
                className="mainButton"
                disabled={!this.state.email || !this.state.confirmCode}
              >
                Vahvista        
              </Form.Button>
              <Button 
                type="button"
                size="large"
                color="orange"
                onClick={() => {this.changeUI("signIn")}}
                className="mainButton"
              >
                Takaisin kirjautumiseen    
              </Button>
            </Form>         
          </div>
          </div>
      )}
     else if (this.state.uiState === "newPasswordRequired") {
      return(
        <div className="SingInPage flex-column">
        <div className="SignInContainer">
         <h1>Uusi salasana</h1>
            <Form>
              <Form.Field>
                <Form.Input
                  value={this.state.email} 
                  type="email" 
                  placeholder="sähköposti" 
                  onChange={e => this.setState({email: e.target.value})} 
                />
              </Form.Field>
              <Form.Field error={this.state.password2 && this.state.password2 !== this.state.password}>
                <Form.Input 
                  value={this.state.password} 
                  type="password" 
                  placeholder="Uusi salasana" 
                  onChange={e => this.setState({password: e.target.value})} 
                />
              </Form.Field>
              <Form.Field error={this.state.password2 && this.state.password2 !== this.state.password}>
                <Form.Input 
                  value={this.state.password2} 
                  type="password" 
                  placeholder="Uusi salasana uudelleen" 
                  onChange={e => this.setState({password2: e.target.value})} 
                  error={this.state.password2 && this.state.password2 !== this.state.password 
                    ? "Salasanat eivät ole samat"
                    : null
                  }
                />
              </Form.Field>
              <Button 
                primary  
                size="large" 
                onClick={this.newPasswordRequired} 
                className="mainButton"
                disabled={!this.state.email || !this.state.password || !this.state.password2 || this.state.password !== this.state.password2}
              >
                <Icon name="send" />
                Lähetä
              </Button>
            </Form>
          </div>
          <div className="navi">
          <Button 
            secondary 
            basic 
            size="small"
            onClick={() => {
              this.changeUI("signIn")}}
          >
            <Icon name="arrow left" />  
            Peruuta
          </Button>
        </div>
      </div>
      )
    }
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