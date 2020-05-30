import React, { Component } from 'react'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'

export default class PlayPause extends Component {

  renderButton = () => {
    if(this.props.playing) {
      return (
        <PauseCircleFilled/>
      )
    } else {
      return (
        <PlayCircleFilled/>
      )
    }
  }

  handleClick = () => {
    this.props.togglePlay()
  }

  render() {
    return (
      <button className="player__button btn btn-outline-dark" onClick={() => this.handleClick()}>
        {this.renderButton()}
      </button>
    )
  }

}
