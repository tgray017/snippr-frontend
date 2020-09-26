import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class NavBar extends PureComponent {

  renderLogo = () => {
    let logo = require('../images/snippr-logo-gray.svg')
    return (
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="60"
          alt="snippr logo"
        />
      </Navbar.Brand>
    )
  }

  renderNavLinks = () => {
    if (this.props.authenticated) {
      return (
        <Nav>
          <Nav.Link as={Link} className="pt-0" to="/search" eventKey="/search">search</Nav.Link>
          <Nav.Link as={Link} className="pt-0" to="/library" eventKey="/library">library</Nav.Link>
          <Nav.Link as={Link} className="pt-0" to="/logout" eventKey="/logout">logout</Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <Nav.Link as={Link} className="pt-0" to="/search" eventKey="/search">search</Nav.Link>
          <Nav.Link as={Link} className="pt-0" to="/login" eventKey="/login">login</Nav.Link>
          <Nav.Link as={Link} className="pt-0" to="/signup" eventKey="/signup">signup</Nav.Link>
        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top" className="navbar-snippr">
        {this.renderLogo()}
        {this.renderNavLinks()}
      </Navbar>
    )
  }
}
