import React, { Component } from 'react'

export default class GeneratePreview extends Component {

  handleClick = () => {
    this.props.generatePreview()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Generate Preview!
      </button>
    )
  }
}
