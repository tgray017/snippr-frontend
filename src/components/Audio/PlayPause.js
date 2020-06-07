import React, { Component } from 'react'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'

export default class PlayPause extends Component {

  renderButton = () => {
    if(this.props.playing && this.props.currentAudioId === this.props.audioId) {
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
    /* should togglePlay in audioContainer accept a url instead? */
    /* this feels messy */
    let prevAudio = document.querySelector(`audio[src='${this.props.currentAudioUrl}']`)
    if(prevAudio && this.props.currentAudioUrl !== this.props.audioRef.current.src) {
      prevAudio.pause()
      this.props.stopSnipping()
    }
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
