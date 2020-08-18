import React, { PureComponent } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'

class NavBar extends PureComponent {

  render() {
    let logo = require('../images/snippr-logo-gray.svg')
    if(this.props.authenticated) {
      return (
        <Navbar bg="dark" variant="dark" className="navbar-snippr">
          <Navbar.Brand href="/" eventKey="/">
            <img
              src={logo}
              style={{
                color: 'blue'
              }}
              width="60"
              alt="snippr logo"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="pt-0" href="/search" eventKey="/search">search</Nav.Link>
            <Nav.Link className="pt-0" href="/library" eventKey="/library">library</Nav.Link>
            <Nav.Link className="pt-0" href="/logout" eventKey="/logout">logout</Nav.Link>
          </Nav>
        </Navbar>
      )
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" eventKey="/">
            <img
              src={logo}
              style={{
                color: 'blue'
              }}
              width="60"
              alt="snippr logo"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="pt-0" href="/search" eventKey="/search">search</Nav.Link>
            <Nav.Link className="pt-0" href="/login" eventKey="/login">login</Nav.Link>
            <Nav.Link className="pt-0" href="/signup" eventKey="/signup">signup</Nav.Link>
          </Nav>
        </Navbar>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user,
    authenticated: state.session.authenticated
  }
}

export default connect(mapStateToProps)(NavBar)
