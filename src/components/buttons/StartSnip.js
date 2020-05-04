import React, { Component } from 'react'

export default class StartSnip extends Component {

  handleClick = () => {
    this.props.startSnipping(Math.floor(this.props.audioRef.currentTime))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Snip!
      </button>
    )
  }
}
