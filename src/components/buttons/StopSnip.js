import React, { Component } from 'react'

export default class StopSnip extends Component {

  handleClick = () => {
    this.props.stopSnipping(Math.ceil(this.props.audioRef.currentTime))
    this.props.audioRef.pause()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Stop snipping!
      </button>
    )
  }
}
