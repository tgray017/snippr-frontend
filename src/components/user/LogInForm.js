import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

export default class LogInForm extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.login(this.state)
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <Container>
        <Form className="m-4" onSubmit={this.handleSubmit}>
          <Form.Group controlId="login-email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              onChange={this.handleChange}
              value={this.state.email}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group controlId="login-password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              autoComplete="on"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Log in
          </Button>
        </Form>
      </Container>
    )
  }
}
