import React, { Component } from 'react'

export default class LogOut extends Component {

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.props.logout()}>Log Out</button>
      </div>
    )
  }
}
