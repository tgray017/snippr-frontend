import React, { Component } from 'react'
import LogInForm from '../components/LogInForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/login'


export class LogInContainer extends Component {
  render() {
    return this.props.authenticated ? <Redirect to='/' /> : <LogInForm login={this.props.login}/>
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer)
