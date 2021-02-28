import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Row'
import FacebookLoginButton from '../../components/user/FacebookLoginButton'
import { loginWithFacebook } from '../../actions/user'

class OauthContainer extends Component {
  render() {
    return (
      <Container className="mt-5">
        <hr className="oauth-divider"/>
        <Col className="mt-5">
          <FacebookLoginButton
            facebookAppId={this.props.facebookAppId}
            loginWithFacebook={this.props.loginWithFacebook}
          />
        </Col>
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
