import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import FacebookLoginButton from '../../components/user/FacebookLoginButton'
import { loginWithFacebook } from '../../actions/user'

class OauthContainer extends Component {
  render() {
    return (
      <Container id="oauth-container">
        <div className="m-4">
          OR
        </div>
        <div className="m-4">
          <FacebookLoginButton
            facebookAppId={this.props.facebookAppId}
            loginWithFacebook={this.props.loginWithFacebook}
          />
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginWithFacebook: (user) => dispatch(loginWithFacebook(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthContainer)
