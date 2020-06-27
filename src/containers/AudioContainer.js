import React, { Component } from 'react'
import Bar from '../components/Audio/Bar'
import PlayPause from '../components/Audio/PlayPause'
import StartSnip from '../components/buttons/StartSnip'
import StopSnip from '../components/buttons/StopSnip'
import GeneratePreview from '../components/buttons/GeneratePreview'
import DiscardSnip from '../components/buttons/DiscardSnip'
import SnippingContainer from './SnippingContainer'
import { setSnipStartTime } from '../actions/setSnipStartTime'
import { setSnipStopTime } from '../actions/setSnipStopTime'
import { startSnipping } from '../actions/startSnipping'
import { stopSnipping } from '../actions/stopSnipping'
import { discardSnip } from '../actions/discardSnip'
import { play } from '../actions/play'
import { pause } from '../actions/pause'
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

    if(this.props.playing && this.audioRef.current.src === this.props.audioUrl) {
      this.props.pause()
      this.audioRef.current.pause()
    } else {
      this.props.play()
      this.audioRef.current.play()
    }

    /*
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
    */
  }

  handleTimeUpdate = () => {
    let currentTime = this.audioRef.current.currentTime >= this.props.audioLength ? this.props.audioLength : this.audioRef.current.currentTime
    this.setState({
      ...this.state,
      currentTime: currentTime
    })
  }

  /*

  handleMouseUp = async () => {
    if(this.state.playAfterDrag) {
      await this.togglePlay()
      this.setState({
        ...this.state,
        playAfterDrag: false
      })
    }
  }
  */

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

  /*
  handleKnobClick = () => {
    let playAfterDrag = this.state.playing ? true : false
    this.setState({
      ...this.state,
      playAfterDrag: playAfterDrag
    })
  }
  */

  handlePlay = () => {
    this.props.setAudio(this.props.id, this.props.audio)
  }

  renderSnippingContainer = () => {
    if(this.props.id === this.props.audioId) {
      return (
        <SnippingContainer
          currentTime={this.state.currentTime}
          audioLength={this.state.audioLength}
          startSnipping={this.props.startSnipping}
          stopSnipping={this.props.stopSnipping}
          discardSnip={this.props.discardSnip}
          setSnipStartTime={this.props.setSnipStartTime}
          setSnipStopTime={this.props.setSnipStopTime}
          snipStartTime={this.props.snipStartTime}
          snipStopTime={this.props.snipStopTime}
          audioUrl={this.props.audioUrl}
          snipping={this.props.snipping}
          src={this.props.audio}
        />
      )
    }
  }

  render() {
    return (
      <>
        <div style={{display: 'flex', alignItems:'center'}}>
          <audio
            src={this.props.audio}
            ref={this.audioRef}
            onTimeUpdate={this.handleTimeUpdate}
            onPlay={this.handlePlay}
          />
          <PlayPause
            togglePlay={this.togglePlay}
            playing={this.props.playing}
            currentAudioUrl={this.props.audioUrl}
            audioRef={this.audioRef}
            currentAudioId={this.props.audioId}
            audioId={this.props.id}
            stopSnipping={this.props.stopSnipping}
          />
          <Bar
            audioRef={this.audioRef}
            audioLength={this.state.audioLength}
            audioId={this.props.id}
            currentAudioId={this.props.audioId}
            timeFromEnd={this.state.audioLength - this.state.currentTime}
            timeFromStart={this.state.currentTime}
            offsetRatio={(this.state.currentTime/this.state.audioLength)*100}
            /*handleKnobClick={this.handleKnobClick}*/
            handleTimeDrag={this.handleTimeDrag}
            /*handleMouseUp={this.handleMouseUp}*/
            snipping={this.props.snipping}
            snipStartTime={this.props.snipStartTime}
            snipStopTime={this.props.snipStopTime}
            setSnipStartTime={this.props.setSnipStartTime}
            setSnipStopTime={this.props.setSnipStopTime}
          />
        </div>
        {this.renderSnippingContainer()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    audioId: state.currentAudio.audioId,
    audioUrl: state.currentAudio.audioUrl,
    snipping: state.currentAudio.snipping,
    playing: state.currentAudio.playing,
    snipStartTime: state.currentAudio.snipStartTime,
    snipStopTime: state.currentAudio.snipStopTime,
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
    setSnipStopTime: (stopTime) => dispatch(setSnipStopTime(stopTime)),
    startSnipping: () => dispatch(startSnipping()),
    stopSnipping: () => dispatch(stopSnipping()),
    discardSnip: () => dispatch(discardSnip()),
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    setAudioDuration: (duration) => dispatch(setAudioDuration(duration)),
    setAudioCurrentTime: (currentTime) => dispatch(setAudioCurrentTime(currentTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
