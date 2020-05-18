import React, { Component } from 'react'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'

export default class PlayPause extends Component {

  state = {
    playing: false
  }

  renderButton = () => {
    if(this.state.playing) {
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
    this.state.playing ? this.props.audioRef.current.pause() : this.props.audioRef.current.play()
    this.setState({
      playing: !this.state.playing
    })
  }

  render() {
    return (
      <button className="player__button" onClick={() => this.handleClick()}>
        {this.renderButton()}
      </button>
    )
  }

}
