import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/logout'


class LogOutContainer extends Component {
  render() {
    this.props.logout()
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutContainer)
