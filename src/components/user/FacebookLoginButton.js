import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'react-bootstrap'

export default class FacebookLoginButton extends Component {

  render() {
    return (
      <FacebookLogin
        appId={this.props.facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.props.loginWithFacebook}
        render={renderProps => (
          <Button
            variant="primary"
            className="submit-button"
            onClick={renderProps.onClick}
          >
            <ion-icon name="logo-facebook" size="large"></ion-icon>
            <span className="facebook-oauth-icon">Log in with Facebook</span>
          </Button>
        )}
      />
    )
  }
}
