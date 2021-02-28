import React, { Component } from 'react'
import LogInForm from '../../components/user/LogInForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/user'


class LogInContainer extends Component {
  render() {
    if (this.props.authenticated) {
      return <Redirect to='/' />
    } else {
      return (
        <LogInForm
          login={this.props.login}
        />
      )
    }
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
