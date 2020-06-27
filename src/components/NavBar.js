import React, { PureComponent } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'

class NavBar extends PureComponent {

  render() {
    if(this.props.authenticated) {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" eventKey="/">snippr</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/search" eventKey="/search">search</Nav.Link>
            <Nav.Link href="/library" eventKey="/library">library</Nav.Link>
            <Nav.Link href="/logout" eventKey="/logout">logout</Nav.Link>
          </Nav>
        </Navbar>
      )
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" eventKey="/">snippr</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/login" eventKey="/login">login</Nav.Link>
            <Nav.Link href="/signup" eventKey="/signup">signup</Nav.Link>
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
