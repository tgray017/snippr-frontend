import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'


class LogOutContainer extends Component {
  render() {
    this.props.logout(this.props.authStrategy)
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated,
    authStrategy: state.session.user.authStrategy
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (authStrategy) => dispatch(logout(authStrategy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutContainer)
