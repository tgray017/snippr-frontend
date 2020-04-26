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

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => dispatch(signup(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUpContainer)
