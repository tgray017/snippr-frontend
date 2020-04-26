import React, { Component } from 'react'

export default class SignUpForm extends Component {

  state = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signup(this.state)
    this.setState({
      email: '',
      password: '',
      password_confirmation: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
              autoComplete="on" />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="on" />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
              value={this.state.password_confirmation}
              autoComplete="on" />
            <label htmlFor="password_confirmation">Password Confirmation</label>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}
