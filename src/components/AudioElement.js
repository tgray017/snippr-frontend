import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'

export default class AudioElement extends Component {

  handlePlayClick = () => {
    if(this.props.audio !== this.props.currentAudio) {
      this.props.setAudio(this.props.audio)
    }
  }

  /* url would look like this: https://www.listennotes.com/e/p/a8497523212142c9bd67f67fe4016433/#t=3,5 */

  render() {

    return (
      <div>

        <audio
          src={this.props.audio}
          controls
          ref={(input) => {this.audioRef = input}}
          onPlay={this.handlePlayClick}
        />
      </div>
    )
  }
}
