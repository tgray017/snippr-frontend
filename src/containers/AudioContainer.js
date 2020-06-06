import React, { Component } from 'react'
import Bar from '../components/Audio/Bar'
import PlayPause from '../components/Audio/PlayPause'
import StartSnip from '../components/buttons/StartSnip'
import StopSnip from '../components/buttons/StopSnip'
import GeneratePreview from '../components/buttons/GeneratePreview'
import DiscardSnip from '../components/buttons/DiscardSnip'
import { setSnipStartTime } from '../actions/setSnipStartTime'
import { stopSnipping } from '../actions/stopSnipping'
import { setAudio } from '../actions/setAudio'
import { setAudioDuration } from '../actions/setAudioDuration'
import { setAudioCurrentTime } from '../actions/setAudioCurrentTime'
import { connect } from 'react-redux'

import '../stylesheets/Audio.css'


class AudioContainer extends Component {

  constructor(props) {
    super(props)
    this.audioRef = React.createRef()
    this.state = {
      audioLength: this.props.audioLength,
      currentTime: 0,
      startSnipTime: 0,
      playing: false,
      playAfterDrag: false
    }
  }

  togglePlay = () => {
    this.setState({
      ...this.state,
      playing: this.state.playAfterDrag ? true : !this.state.playing
    }, () => {
      this.state.playing && (this.audioRef.current.paused || this.state.playAfterDrag) ? this.audioRef.current.play() : this.audioRef.current.pause()
      this.setState({
        ...this.state,
        playAfterDrag: false
      })
    })
  }

  handleTimeUpdate = () => {
    this.setState({
      ...this.state,
      currentTime: this.audioRef.current.currentTime
    })
  }

  handleMouseUp = async () => {
    if(this.state.playAfterDrag) {
      await this.togglePlay()
      this.setState({
        ...this.state,
        playAfterDrag: false
      })
    }
  }

  handleTimeDrag = (offsetRatio) => {
    let currentTime = this.state.audioLength*offsetRatio
    this.setState({
      ...this.state,
      currentTime: currentTime
    }, () => {
      this.audioRef.current.currentTime = this.state.currentTime
    })
  }

  handleStartSnipKnobMove = () => {

  }

  handleKnobClick = () => {
    let playAfterDrag = this.state.playing ? true : false
    this.setState({
      ...this.state,
      playAfterDrag: playAfterDrag
    })
  }

  handlePlay = () => {
    this.props.setAudio(this.props.id, this.props.audio)
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems:'center'}}>
        <audio
          src={this.props.audio}
          ref={this.audioRef}
          onTimeUpdate={this.handleTimeUpdate}
          onPlay={this.handlePlay}
        />
        <PlayPause
          togglePlay={this.togglePlay}
          playing={this.state.playing}
        />
        <Bar
          audioRef={this.audioRef}
          audioLength={this.state.audioLength}
          timeFromEnd={this.state.audioLength - this.state.currentTime}
          timeFromStart={this.state.currentTime}
          offsetRatio={(this.state.currentTime/this.state.audioLength)*100}
          startSnipOffsetRatio={(this.state.snipStartTime/this.state.audioLength)*100}
          snipStartTime={this.state.snipStartTime}
          handleKnobClick={this.handleKnobClick}
          handleTimeDrag={this.handleTimeDrag}
          handleMouseUp={this.handleMouseUp}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    audioId: state.currentAudio.audioId,
    audioUrl: state.currentAudio.audioUrl,
    snipping: state.currentAudio.snipping,
    snipStartTime: state.currentAudio.snipStartTime,
    endTime: state.currentAudio.endTime,
    showGeneratePreview: state.currentAudio.showGeneratePreview,
    currentTime: state.currentAudio.audioCurrentTime,
    duration: state.currentAudio.audioDuration
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAudio: (audioId, audioUrl) => dispatch(setAudio(audioId, audioUrl)),
    setSnipStartTime: (startTime) => dispatch(setSnipStartTime(startTime)),
    stopSnipping: (endTime) => dispatch(stopSnipping(endTime)),
    setAudioDuration: (duration) => dispatch(setAudioDuration(duration)),
    setAudioCurrentTime: (currentTime) => dispatch(setAudioCurrentTime(currentTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
