import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends Component {
  render() {
    if(this.props.authenticated) {
      return (
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/search"
          >
            Search
          </NavLink>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/library"
          >
            Library
          </NavLink>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/logout"
          >
            Log Out
          </NavLink>
        </div>
      )
    } else {
      return (
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/login"
          >
            Log In
          </NavLink>
          <NavLink
            style={{ marginRight: '10px' }}
            to="/signup"
          >
            Sign Up
          </NavLink>
        </div>
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
