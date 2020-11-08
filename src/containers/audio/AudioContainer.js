import React, { Component } from 'react'
import Bar from '../../components/audio/Bar'
import PlayPause from '../../components/audio/PlayPause'
import SnippingContainer from './SnippingContainer'
import {
  setSnipStartTime,
  setSnipStopTime,
  startSnipping,
  stopSnipping,
  discardSnip,
  play,
  pause,
  setAudioDuration,
  setAudioCurrentTime
} from '../../actions/audio'
import { connect } from 'react-redux'
import '../../stylesheets/Audio.css'


class AudioContainer extends Component {

  constructor(props) {
    super(props)
    this.audioRef = React.createRef()
    let currentTime = this.props.audioType === 'snippet' ? this.props.startTime : 0

    this.state = {
      currentTime: currentTime,
      startSnipTime: 0,
      playing: false,
      playAfterDrag: false
    }
  }

  togglePlay = () => {
    if (this.props.playing) {
      this.props.pause()
      this.audioRef.current.pause()
    } else {
      this.props.play()
      this.audioRef.current.play()
    }
  }

  handleTimeUpdate = () => {
    let currentTime
    if (this.props.audioType === 'snippet') {
      currentTime = this.audioRef.current.currentTime >= this.props.stopTime ? this.props.stopTime : this.audioRef.current.currentTime
    } else {
      currentTime = this.audioRef.current.currentTime >= this.props.audioLength ? this.props.audioLength : this.audioRef.current.currentTime
    }

    if (currentTime >= this.props.stopTime) {
      this.props.pause()
      this.audioRef.current.pause()
    }

    this.setState({
      ...this.state,
      currentTime: currentTime
    })
  }

  handleTimeDrag = (offsetRatio) => {
    let currentTime
    if (this.props.audioType === 'snippet') {
      currentTime = this.props.startTime + (this.props.audioLength*offsetRatio)
    } else {
      currentTime = this.props.audioLength*offsetRatio
    }

    this.setState({
      ...this.state,
      currentTime: currentTime
    }, () => {
      this.audioRef.current.currentTime = this.state.currentTime
    })
  }

  renderSnippingContainer = () => {
    if(this.props.audioType !== 'snippet') {
      return (
        <SnippingContainer
          currentTime={this.state.currentTime}
          audioLength={this.props.audioLength}
          startSnipping={this.props.startSnipping}
          stopSnipping={this.props.stopSnipping}
          discardSnip={this.props.discardSnip}
          setSnipStartTime={this.props.setSnipStartTime}
          setSnipStopTime={this.props.setSnipStopTime}
          snipStartTime={this.props.snipStartTime}
          snipStopTime={this.props.snipStopTime}
          audio={this.props.audioUrl}
          title={this.props.title}
          description={this.props.description}
          podcastName={this.props.podcastName}
          podcastId={this.props.podcastId}
          audioUrl={this.props.audioUrl}
          snipping={this.props.snipping}
          src={this.props.audioUrl}
          audioType={this.props.audioType}
        />
      )
    }
  }

  render() {
    let offsetRatio
    let timeFromEnd
    if (this.props.audioType === 'snippet') {
      offsetRatio = ((this.state.currentTime - this.props.startTime)/this.props.audioLength)*100
      timeFromEnd = (this.props.stopTime - this.state.currentTime) + this.props.startTime
    } else {
      offsetRatio = (this.state.currentTime/this.props.audioLength)*100
      timeFromEnd = this.props.audioLength - this.state.currentTime
    }

    return (
      <div id='current-audio-player-container'>
        <div id='current-audio-player'>
          <audio
            id={this.props.audioId}
            src={this.props.audioUrl}
            ref={this.audioRef}
            onTimeUpdate={this.handleTimeUpdate}
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
            audioLength={this.props.audioLength}
            audioId={this.props.id}
            currentAudioId={this.props.audioId}
            timeFromEnd={timeFromEnd}
            timeFromStart={this.state.currentTime}
            offsetRatio={offsetRatio}
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
      </div>
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
    currentTime: state.currentAudio.audioCurrentTime,
    audioLength: state.currentAudio.audioLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
