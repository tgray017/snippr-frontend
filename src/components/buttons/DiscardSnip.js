import React, { Component } from 'react'

export default class DiscardSnip extends Component {

  handleClick = () => {

  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Discard snip.
      </button>
    )
  }
}
