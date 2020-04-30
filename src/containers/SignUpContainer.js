import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import { connect } from 'react-redux'
import { signup } from '../actions/signup'


export class SignUpContainer extends Component {
  render() {
    return (
      <SignUpForm signup={this.props.signup}/>
    )
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
