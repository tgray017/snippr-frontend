import React, { Component } from 'react'
import LogOut from '../components/LogOut'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/logout'


export class LogOutContainer extends Component {
  render() {
    return this.props.authenticated ? <LogOut logout={this.props.logout}/> : <Redirect to='/' />
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (user) => dispatch(logout(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutContainer)
