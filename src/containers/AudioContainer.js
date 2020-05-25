import React, { Component } from 'react'
import Bar from '../components/Audio/Bar'
import PlayPause from '../components/Audio/PlayPause'
import StartSnip from '../components/buttons/StartSnip'
import StopSnip from '../components/buttons/StopSnip'
import GeneratePreview from '../components/buttons/GeneratePreview'
import DiscardSnip from '../components/buttons/DiscardSnip'
import { startSnipping } from '../actions/startSnipping'
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
      playing: false,
      playAfterDrag: false
    }
  }

  /*
  renderSnipButton = () => {
    if(this.props.audio === this.props.currentAudio) {
      if(this.props.snipping) {
        return (
          <StopSnip
            stopSnipping={this.props.stopSnipping}
            audioRef={this.audioRef.audioRef}
          />
        )
      } else {
        if(this.props.showGeneratePreview) {
          return (
            <>
              <GeneratePreview/>
              <DiscardSnip/>
            </>
          )
        } else {
          return (
            <StartSnip
              startSnipping={this.props.startSnipping}
              audioRef={this.audioRef.audioRef}
            />
          )
        }
      }
    }
  }
  */

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
          handleKnobClick={this.handleKnobClick}
          handleTimeDrag={this.handleTimeDrag}
          handleMouseUp={this.handleMouseUp}
        />
      {/*
        {this.renderSnipButton()}
      */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    audioId: state.currentAudio.audioId,
    audioUrl: state.currentAudio.audioUrl,
    snipping: state.currentAudio.snipping,
    startTime: state.currentAudio.startTime,
    endTime: state.currentAudio.endTime,
    showGeneratePreview: state.currentAudio.showGeneratePreview,
    currentTime: state.currentAudio.audioCurrentTime,
    duration: state.currentAudio.audioDuration
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAudio: (audioId, audioUrl) => dispatch(setAudio(audioId, audioUrl)),
    startSnipping: (startTime) => dispatch(startSnipping(startTime)),
    stopSnipping: (endTime) => dispatch(stopSnipping(endTime)),
    setAudioDuration: (duration) => dispatch(setAudioDuration(duration)),
    setAudioCurrentTime: (currentTime) => dispatch(setAudioCurrentTime(currentTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
