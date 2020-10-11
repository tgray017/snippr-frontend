import React, { Component } from 'react'
import SignUpForm from '../../components/user/SignUpForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../../actions/user'


export class SignUpContainer extends Component {
  render() {
    return this.props.authenticated ? <Redirect to='/' /> : <SignUpForm signup={this.props.signup}/>
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => dispatch(signup(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
