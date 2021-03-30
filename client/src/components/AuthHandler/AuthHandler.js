import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
// import {
//   BrowserView,
//   MobileView,
//   isMobile,
// } from "react-device-detect";
import { FormattedMessage, injectIntl } from 'react-intl';
import awsconfig from '../../aws-exports';
// import { amplifyConf } from "../../configuration";

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
    msg: "",
    user: {},
    lang: 'fi',
    showDialog: false,
    showProdUpdate: true,
    loading: false,
    link_Token: ""
  }

  // constructor(props) {
  //   super(props);
  //   this.onResize = this.resize.bind(this);
  // }

  componentDidMount() {
    Amplify.configure(awsconfig);
    // amplifyConf.then(conf => { // TÄMÄ PITÄÄ katsos
    //   const endpoint = conf.API.endpoints[0].endpoint;
    //   this.props.fetchProdUpdateWithAxios(endpoint);
    // })
      // .catch(() => {
      //   // ignore for now
      // });
  }

  resize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  signIn = (e) => {
    window.alert("Kukkuu")

    const noEmailOrPwd = this.props.intl.formatMessage({
      id: "authHandler.error.noEmailOrPwd",
      defaultMessage: "Anna sähköpostiosoitteesi ja salasanasi."
    });
    const noAccount = this.props.intl.formatMessage({
      id: "authHandler.error.noAccount",
      defaultMessage: "Antamallasi sähköpostiosoitteella ei ole tiliä."
    });
    const errEmailOrPwd = this.props.intl.formatMessage({
      id: "authHandler.error.emailOrPwd",
      defaultMessage: "Virheellinen sähköpostiosoite tai salasana."
    });
    const invalidLicense = this.props.intl.formatMessage({
      id: "authHandler.error.invalidLicense",
      defaultMessage: "Käyttöoikeutesi palveluun ei ole voimassa."
    });
    this.setState({ loading: true });
    e.preventDefault();
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: noEmailOrPwd, loading: false })
      return;
    }
    this.setState({ error: "" });
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({ uiState: 'newPasswordRequired', user: user, password: '', loading: false });
        }
        // else {
        //   Analytics.record({
        //     name: 'client_front_signin_ok',
        //     attributes: { email: this.state.email }
        //   });
        // }
      })
      .catch(err => {
        var errorText = err.message;
        if (err.code === "UserNotFoundException") {
          errorText = noAccount
        }
        else if (err.code === 'NotAuthorizedException') {
          errorText = errEmailOrPwd
        }
        else if (err.message === "PreAuthentication failed with error Wrong clientId.") {
          errorText = noAccount
        }
        else if (err.code === 'UserLambdaValidationException') {
          errorText = invalidLicense;
        }
        this.setState({ error: errorText, loading: false })
      });
  }


  newPasswordRequired = (e) => {
    e.preventDefault();

    const errPasswordNotSame = this.props.intl.formatMessage({
      id: "authHandler.error.passwordNotSame",
      defaultMessage: "Antamasi salasanat eivät ole samat."
    });

    if (this.state.password !== this.state.password2) {
      this.setState({ error: errPasswordNotSame });
      return;
    }

    const errPassword = this.props.intl.formatMessage({
      id: "authHandler.error.password",
      defaultMessage: "Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita."
    });

    Auth.completeNewPassword(
      this.state.user,           // the Cognito User Object
      this.state.password,       // the new password
    ).then()
      .catch(err => {
        console.log(err);
        var errorText = err.message;
        if (err.code === "InvalidPasswordException") {
          errorText = errPassword;
        }
        this.setState({ error: errorText });
      });
  }

  signUp = (e) => {

    e.preventDefault();

    const noNameEmailOrPwd = this.props.intl.formatMessage({
      id: "authHandler.error.noNameOrEmailOrPwd",
      defaultMessage: "Anna nimesi, sähköpostiosoitteesi ja salasanasi."
    });

    const errPasswordNotSame = this.props.intl.formatMessage({
      id: "authHandler.error.passwordNotSame",
      defaultMessage: "Antamasi salasanat eivät ole samat."
    });

    const errPassword = this.props.intl.formatMessage({
      id: "authHandler.error.password",
      defaultMessage: "Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita."
    });

    const confirmCodeSent = this.props.intl.formatMessage({
      id: "authHandler.confirmCodeSent",
      defaultMessage: "Lähetimme sinulle sähköpostitse vahvistuskoodin. Syötä se ylläolevaan kenttään."
    });

    const errEmail = this.props.intl.formatMessage({
      id: "authHandler.error.email",
      defaultMessage: "Virheellinen sähköpostiosoite."
    });

    const hasAlreadyAccount = this.props.intl.formatMessage({
      id: "authHandler.error.hasAlreadyAccount",
      defaultMessage: "Antamallasi sähköpostiosoitteella on jo olemassa tili."
    });

    if (this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: noNameEmailOrPwd })
      return;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({ error: errPasswordNotSame });
      return;
    }

    this.setState({ error: "" });
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
    })
      .then(data => { this.setState({ uiState: "confirm", msg: confirmCodeSent }) })
      .catch(err => {
        var errorText = err.message;
        if (err.code === 'InvalidParameterException') {
          if (err.message.includes('password') || err.message.includes('Password')) {
            errorText = errPassword
          } else if (err.message.includes('email')) {
            errorText = errEmail;
          }
        }
        else if (err.code === 'InvalidPasswordException') {
          errorText = errPassword;
        } else if (err.code === 'UsernameExistsException') {
          errorText = hasAlreadyAccount;
        }
        this.setState({ error: errorText })
      });
  }

  confirm = (e) => {
    e.preventDefault();

    const noEmailOrCode = this.props.intl.formatMessage({
      id: "authHandler.error.noEmailOrPwdOrCode",
      defaultMessage: "Anna sähköpostiosoitteesi ja vahvistuskoodi."
    });

    const alreadyConfirmed = this.props.intl.formatMessage({
      id: "authHandler.error.alreadyConfirmed",
      defaultMessage: "Antamallasi sähköpostiosoitteella oleva tili on jo varmennettu."
    });

    const noAccount = this.props.intl.formatMessage({
      id: "authHandler.error.noAccount",
      defaultMessage: "Antamallasi sähköpostiosoitteella ei ole tiliä."
    });

    const registerationSuccess = this.props.intl.formatMessage({
      id: "authHandler.registerationSuccess",
      defaultMessage: "Rekisteröityminen onnistui, ole hyvä ja kirjaudu sisään."
    });

    if (this.state.email.length === 0 || this.state.confirmCode.length === 0) {
      this.setState({ error: noEmailOrCode })
      return;
    }

    const userAdditionFailed = this.props.intl.formatMessage({
      id: "authHandler.error.userAdditionFailed",
      defaultMessage: "Käyttäjän lisäys ei onnistunut."
    });

    const invalidCode = this.props.intl.formatMessage({
      id: "authHandler.error.invalidCode",
      defaultMessage: "Virheellinen vahvistuskoodi. Yritä uudelleen."
    });

    this.setState({ error: "" });
    Auth.confirmSignUp(this.state.email, this.state.confirmCode)
      .then(data => this.changeUI("signIn", registerationSuccess))
      .catch(err => {
        var errorText = err.message;
        if (err.code === 'NotAuthorizedException') {
          errorText = alreadyConfirmed
        } else if (err.code === 'UserNotFoundException') {
          errorText = noAccount
        } else if (err.code === 'UserLambdaValidationException') {
          errorText = userAdditionFailed;
        } else if (err.code === 'CodeMismatchException') {
          errorText = invalidCode;
        }
        this.setState({ error: errorText })
      });
  }

  forgottenPassword = (e) => {

    const noEmailOrPwdOrCode = this.props.intl.formatMessage({
      id: "authHandler.error.noEmailOrPwdOrCode",
      defaultMessage: "Anna sähköpostiosoitteesi, vahvistuskoodi ja uusi salasana kahteen kertaan."
    });
    const errConfirmCode = this.props.intl.formatMessage({
      id: "authHandler.error.confirmCode",
      defaultMessage: "Antamasi vahvistuskoodi on virheellinen."
    });
    const errPassword = this.props.intl.formatMessage({
      id: "authHandler.error.password",
      defaultMessage: "Varmista, että salasana on vähintään 8 merkkiä pitkä. Salasanan pitää sisältää isoja ja pieniä kirjaimia sekä numeroita."
    });
    const errEmail = this.props.intl.formatMessage({
      id: "authHandler.error.email",
      defaultMessage: "Virheellinen sähköpostiosoite."
    });
    const incorrectCode = this.props.intl.formatMessage({
      id: "authHandler.error.incorrectConfirmCode",
      defaultMessage: "Vahvistuskoodi on väärä. Voit tilata uuden vahvistuskoodin."
    });
    const noEmail = this.props.intl.formatMessage({
      id: "authHandler.error.noEmail",
      defaultMessage: "Anna sähköpostiosoitteesi."
    });
    const noAccount = this.props.intl.formatMessage({
      id: "authHandler.error.noAccount",
      defaultMessage: "Antamallasi sähköpostiosoitteella ei ole tiliä."
    });
    const pwdChangeNotAllowed = this.props.intl.formatMessage({
      id: "authHandler.error.pwdChangeNotAllowed",
      defaultMessage: "Voit vaihtaa salasanan ensimmäisen kirjautumiskerran jälkeen."
    });

    const errPasswordNotSame = this.props.intl.formatMessage({
      id: "authHandler.error.passwordNotSame",
      defaultMessage: "Antamasi salasanat eivät ole samat."
    });

    e.preventDefault();

    if (this.state.passwordResetConfirmation) {
      if (this.state.email.length === 0 || this.state.confirmCode.length === 0 || this.state.password.length === 0) {
        this.setState({ error: noEmailOrPwdOrCode })
        return;
      }
      if (this.state.password !== this.state.password2) {
        this.setState({ error: errPasswordNotSame });
        return;
      }
      Auth.forgotPasswordSubmit(this.state.email, this.state.confirmCode, this.state.password)
        .then(data => {
          this.setState({ passwordResetConfirmation: false });
          this.changeUI("signIn");
        })
        .catch(err => {
          var errorText = err.message;
          if (err.code === "CodeMismatchException") {
            errorText = errConfirmCode
          }
          else if (err.code === 'UserNotFoundException') {
            errorText = noAccount;
          }
          else if (err.code === 'InvalidPasswordException') {
            errorText = errPassword;
          }
          else if (err.code === 'InvalidParameterException') {
            if (err.message.includes('password') || err.message.includes('Password')) {
              errorText = errPassword
            }
            else if (err.message.includes('email')) {
              errorText = errEmail;
            }
            else if (err.message.includes('confirmationCode')) {
              errorText = errConfirmCode;
            }
          }
          else if (err.code === 'ExpiredCodeException') {
            errorText = incorrectCode;
          }
          this.setState({ error: errorText })
        });
    } else {
      if (this.state.email.length === 0) {
        this.setState({ error: noEmail })
        return;
      }
      Auth.forgotPassword(this.state.email)
        .then(data => this.setState({ passwordResetConfirmation: true }))
        .catch(err => {
          var errorText = err.message;
          if (err.code === "UserNotFoundException") {
            errorText = noAccount
          }
          else if (err.code === "NotAuthorizedException") {
            errorText = pwdChangeNotAllowed
          }
          this.setState({ error: errorText })
        });
    }
  }

  changeUI(newState, msg = "") {
    this.setState({ uiState: newState, error: "", msg: msg, password: "", password2: "", confirmCode: "", firstName: "", lastName: "" });
  }

  getContent = () => {

    const firstName = this.props.intl.formatMessage({
      id: "common.firstName",
      defaultMessage: "Etunimi"
    });
    const lastName = this.props.intl.formatMessage({
      id: "common.lastName",
      defaultMessage: "Sukunimi"
    });
    const email = this.props.intl.formatMessage({
      id: "authHandler.email",
      defaultMessage: "Sähköposti"
    });
    const password = this.props.intl.formatMessage({
      id: "authHandler.password",
      defaultMessage: "Salasana"
    });
    const password2 = this.props.intl.formatMessage({
      id: "authHandler.password2",
      defaultMessage: "Salasana uudestaan"
    });
    const confirmCode = this.props.intl.formatMessage({
      id: "authHandler.confirmCode",
      defaultMessage: "Vahvistuskoodi"
    });
    const newPassword = this.props.intl.formatMessage({
      id: "authHandler.newPassword",
      defaultMessage: "Uusi salasana"
    });
    const newPassword2 = this.props.intl.formatMessage({
      id: "authHandler.newPassword2",
      defaultMessage: "Uusi salasana uudestaan"
    });
    const sendInformation = this.props.intl.formatMessage({
      id: "authHandler.sendInformation",
      defaultMessage: "Lähetä tiedot"
    });

    // let signFormDivCss = "signFormDiv";
    // if (isMobile) {
    //   signFormDivCss = "signFormDivMobile";
    // }

    const spinner =
      <div className="spinner3">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
      ;

    if (this.state.uiState === "signIn") {
      return (
        <div className="signIn">
          {/* <div className={signFormDivCss}> */}
            <form onSubmit={this.signIn} className="form-group">
              <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({email: e.target.value})} />
              <input className="form-control" value={this.state.password} type="password" placeholder={password} onChange={e => this.setState({password: e.target.value})} />
              <button className="buttonBG" onClick={this.signIn} style={{textAlign: "center", width: '100%'}}>{this.state.loading ? spinner : null}<FormattedMessage id="authHandler.signIn" defaultMessage="Kirjaudu"/></button>
              SignUp is temporarily removed. 
              When it is added back you need to add the registration instructions to authHandler.info. 
              Also to translation files.
              <h1 className="pageHeader" style={{marginBottom: '12px'}}><FormattedMessage id="authHandler.newUser" defaultMessage="Uusi käyttäjä?"/></h1>
              <button className="buttonBG" type="button" onClick={() => this.changeUI("signUp")} style={{textAlign: "center", width: '100%'}}><FormattedMessage id="authHandler.register" defaultMessage="Rekisteröidy"/></button>
             
            </form>
          {/* </div> */}
          {/* <HelpIcon
            style={{ color: "#F7941D", fontSize: "30px" }}
            tabIndex="0"
            role="button"
            onClick={this.showInfoDialog}
            onKeyPress={(event) => {
              if (event.key === " " || event.key === "Enter") {
                // Prevent the default action to stop scrolling when space is pressed
                event.preventDefault();
                this.showInfoDialog();
              }
            }}
          /> */}
          <div className="navi">
            <a role="link" tabIndex="0"
              onClick={() => this.changeUI("forgot")}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("forgot");
                }
              }}>
              <FormattedMessage id="authHandler.forgotPassword" defaultMessage="Unohtunut salasana" />
            </a>
          </div>
        </div>
      );
    } else if (this.state.uiState === "signUp") {
      return (
        <div className="signUp">
          {/* <div className={signFormDivCss}> */}
            <form onSubmit={this.signUp} className="form-group">
              <input className="form-control" value={this.state.firstName} type="text" placeholder={firstName} onChange={e => this.setState({ firstName: e.target.value })} />
              <input className="form-control" value={this.state.lastName} type="text" placeholder={lastName} onChange={e => this.setState({ lastName: e.target.value })} />
              <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({ email: e.target.value })} />
              <input className="form-control" type="password" placeholder={password} onChange={e => this.setState({ password: e.target.value })} />
              <input className="form-control" type="password" placeholder={password2} onChange={e => this.setState({ password2: e.target.value })} />
              <button className="buttonBG" onClick={this.signUp} style={{ textAlign: "center", width: '100%' }}><FormattedMessage id="authHandler.register" defaultMessage="Rekisteröidy" /></button>
            </form>
          {/* </div> */}
          <div className="navi">
            <a role="link" tabIndex="0"
              onClick={() => this.changeUI("confirm")}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("confirm");
                }
              }}>
              <FormattedMessage id="authHandler.verificationCode" defaultMessage="Syötä vahvistuskoodi" />
            </a>
            <br />
            <a role="link" tabIndex="0"
              onClick={() => this.changeUI("signIn")}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("signIn");
                }
              }}>
              <FormattedMessage id="authHandler.backToSignIn" defaultMessage="Takaisin kirjautumiseen" />
            </a>
          </div>
        </div>
      );
    } else if (this.state.uiState === "confirm") {
      return (
        <div className="confirm">
          {/* <div className={signFormDivCss}> */}
            <form onSubmit={this.confirm} className="form-group">
              <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({ email: e.target.value })} />
              <input className="form-control" value={this.state.confirmCode} type="text" placeholder={confirmCode} onChange={e => this.setState({ confirmCode: e.target.value })} />
              <button className="buttonBG" onClick={this.confirm} style={{ textAlign: "center", width: '100%' }}><FormattedMessage id="authHandler.confirm" defaultMessage="Vahvista" /></button>
            </form>
          {/* </div> */}
          <div className="navi">
            <a role="link" tabIndex="0"
              onClick={() => this.changeUI("signIn")}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("signIn");
                }
              }}>
              <FormattedMessage id="authHandler.backToSignIn" defaultMessage="Takaisin kirjautumiseen" />
            </a>
          </div>
        </div>
      )
    }
    else if (this.state.uiState === "forgot") {
      if (this.state.passwordResetConfirmation) {
        return (
          <div className="forgot">
            {/* <div className={signFormDivCss}> */}
              <form className="form-group">
                <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({ email: e.target.value })}></input>
                <input className="form-control" value={this.state.confirmCode} type="text" placeholder={confirmCode} onChange={e => this.setState({ confirmCode: e.target.value })} />
                <input className="form-control" value={this.state.password} type="password" placeholder={newPassword} onChange={e => this.setState({ password: e.target.value })} />
                <input className="form-control" value={this.state.password2} type="password" placeholder={newPassword2} onChange={e => this.setState({ password2: e.target.value })} />
                <button className="buttonBG" onClick={this.forgottenPassword} style={{ textAlign: "center", width: '100%' }}>{sendInformation}</button>
              </form>
            {/* </div> */}
            <div className="navi">
              <a role="link" tabIndex="0"
                onClick={() => {
                  this.setState({ passwordResetConfirmation: false });
                  this.changeUI("signIn")
                }}
                onKeyPress={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    this.changeUI("signIn");
                  }
                }}>
                <FormattedMessage id="common.cancel" defaultMessage="Peruuta" /></a>
            </div>
          </div>
        )
      }
      return (
        <div className="forgot">
          {/* <div className={signFormDivCss}> */}
            <form className="form-group">
              <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({ email: e.target.value })}></input>
              <button className="buttonBG" onClick={this.forgottenPassword} style={{ textAlign: "center", width: '100%' }}>{sendInformation}</button>
              <a role="link" tabIndex="0"
                onClick={() => this.setState({ passwordResetConfirmation: true })}
                onKeyPress={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    this.setState({ passwordResetConfirmation: true });
                  }
                }}>
                <FormattedMessage id="authHandler.haveConfirmCode" defaultMessage="Minulla on jo salasanan vaihdon vahvistuskoodi" />
              </a>
            </form>
          {/* </div> */}
          <div className="navi">
            <a role="link" tabIndex="0"
              onClick={() => this.changeUI("signIn")}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("signIn");
                }
              }}>
              <FormattedMessage id="common.cancel" defaultMessage="Peruuta" />
            </a>
          </div>
        </div>
      )
    } else if (this.state.uiState === "newPasswordRequired") {
      return (
        <div className="forgot">
          {/* <div className={signFormDivCss}> */}
            <form className="form-group">
              <input className="form-control" value={this.state.email} type="email" placeholder={email} onChange={e => this.setState({ email: e.target.value })} />
              <input className="form-control" value={this.state.password} type="password" placeholder={newPassword} onChange={e => this.setState({ password: e.target.value })} />
              <input className="form-control" value={this.state.password2} type="password" placeholder={newPassword2} onChange={e => this.setState({ password2: e.target.value })} />
              <span style={{ fontWeight: "bold", color: "#006838" }}><FormattedMessage id="authHandler.giveNewPassword" defaultMessage='Anna haluamasi uusi salasana kahteen kertaan ja paina "Lähetä tiedot".' /></span>
              <button className="buttonBG" onClick={this.newPasswordRequired} style={{ textAlign: "center", width: '100%' }}>{sendInformation}</button>
            </form>
          {/* </div> */}
          <div className="navi">
            <a role="link" tabIndex="0"
              onClick={() => {
                this.changeUI("signIn")
              }}
              onKeyPress={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  this.changeUI("signIn");
                }
              }}>
              <FormattedMessage id="common.cancel" defaultMessage="Peruuta" />
            </a>
          </div>
        </div>
      )
    }
  }

  showInfoDialog = () => {
    this.setState({ showDialog: true });
  }

  render() {

    const { classes } = this.props;

    let authFrameCss = "AuthenticatorFrame";
    let authInnerCss = "AuthenticatorInner";
    let authCss = "Authenticator";
    
    // if (isMobile) {
    //   authFrameCss = {};
    //   authInnerCss = {};
    //   authCss = "AuthenticatorMobile";
    // }

    const infoText = this.props.intl.formatMessage({
      id: "authHandler.info",
      defaultMessage: "Näin kirjaudut. Kun olet luonut tunnukset saat sähköpostitse väliaikaisen salasanan.\n\n1." 
    });

    // const dialog = this.state.showDialog ?
    //   <InfoDialog
    //     open={this.state.showDialog}
    //     message={infoText}
    //     onOk={() => {
    //       this.setState({ showDialog: false })
    //     }}
    //   />
    //   : null;

    // let dialogTitle = this.props.intl.formatMessage({ id: "authHandler.pageHeader", defaultMessage: "Kirjaudu sisään" });
    // if (this.state.uiState === "signUp" || this.state.uiState === "confirm") {
    //   dialogTitle = this.props.intl.formatMessage({ id: "authHandler.register", defaultMessage: "Rekisteröidy" });
    // }

    return (
      <div className={authFrameCss}>
        <div className={authCss} role="main" style={{ textAlign: 'center' }}>
          <div className={authInnerCss}>
            {/* <img src={logo}
              alt='Kirjautuminen'
              style={oskarLogoStyle}
              tabIndex="0"
            /> */}
            {/* <h1 className="pageHeader">{dialogTitle}</h1>
            {this.state.msg.length > 0 ? <div className="alert alert-info"><p>{this.state.msg}</p></div> : ''} */}

            {this.getContent()}

          </div>
        </div>
        {/* {dialog} */}
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
export default injectIntl((connect(mapStateToProps, mapDispatchToProps)(AuthHandler)));