import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

export default class SignUpForm extends Component {

  state = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
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
      <Container>
        <Form className="m-4" onSubmit={this.handleSubmit}>
          <Form.Group controlId="signup-email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              onChange={this.handleChange}
              value={this.state.email}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="signup-password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="signup-password-confirmation">
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Confirm password"
              onChange={this.handleChange}
              value={this.state.password_confirmation}
              autoComplete="on"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Sign up
          </Button>
        </Form>
      </Container>
    )
  }
}
