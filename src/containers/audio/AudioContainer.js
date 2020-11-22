import React, { Component } from 'react'
import Bar from '../../components/audio/Bar'
import PlayPause from '../../components/audio/PlayPause'
import SnippingContainer from './SnippingContainer'
import {
  play,
  pause,
  expand,
  collapse,
  updateAudioDuration,
  setSnipStartTime,
  setSnipStopTime,
  startLoading,
  stopLoading
} from '../../actions/audio'
import { connect } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay'
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
      this.props.pause(this.audioRef.current)
    } else {
      this.props.play(this.audioRef.current)
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
      this.props.pause(this.audioRef.current)
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
    if(this.props.expanded) {
      return (
        <SnippingContainer
          currentTime={this.state.currentTime}
          audioType={this.props.audioType}
        />
      )
    }
  }

  toggleExpandCollapse = () => {
    if (this.props.expanded) {
      this.props.collapse()
    } else {
      this.props.expand()
    }
  }

  renderExpandCollapseButton = () => {
    const expandCollapseImg = this.props.expanded ? require("../../assets/images/icons/collapse-arrow.svg") : require("../../assets/images/icons/expand-arrow.svg")

    return (
      <div>
        <input
          type="image"
          className="expand-collapse-button"
          src={expandCollapseImg}
          onClick={this.toggleExpandCollapse}
        />
      </div>
    )
  }

  updateAudioDuration = () => {
    let audio = document.getElementById(this.props.audioId)
    this.props.updateAudioDuration(audio.duration)
  }

  startLoading = () => {
    this.props.startLoading()
  }

  stopLoading = () => {
    this.props.stopLoading()
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

    if (this.props.showing) {
      return (
        <LoadingOverlay
          active={this.props.loading}
          spinner
        >
        <div id='current-audio-player-container'>
          <div id='current-audio-player'>
            <audio
              id={this.props.audioId}
              src={this.props.audioUrl}
              ref={this.audioRef}
              onTimeUpdate={this.handleTimeUpdate}
              onLoadedMetadata={this.updateAudioDuration}
              onLoadStart={this.startLoading}
              onCanPlay={this.stopLoading}
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
              handleTimeDrag={this.handleTimeDrag}
              snipping={this.props.snipping}
              snipStartTime={this.props.snipStartTime}
              snipStopTime={this.props.snipStopTime}
              setSnipStartTime={this.props.setSnipStartTime}
              setSnipStopTime={this.props.setSnipStopTime}
            />
            {this.renderExpandCollapseButton()}
          </div>
          {this.renderSnippingContainer()}
        </div>
      </LoadingOverlay>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    audioId: state.currentAudio.audioId,
    audioUrl: state.currentAudio.audioUrl,
    snipping: state.currentAudio.snipping,
    playing: state.currentAudio.playing,
    showing: state.currentAudio.showing,
    expanded: state.currentAudio.expanded,
    snipStartTime: state.currentAudio.snipStartTime,
    snipStopTime: state.currentAudio.snipStopTime,
    audioLength: state.currentAudio.audioLength,
    loading: state.currentAudio.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    play: (audioElement) => dispatch(play(audioElement)),
    pause: (audioElement) => dispatch(pause(audioElement)),
    expand: () => dispatch(expand()),
    collapse: () => dispatch(collapse()),
    updateAudioDuration: (duration) => dispatch(updateAudioDuration(duration)),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading()),
    setSnipStartTime: (startTime) => dispatch(setSnipStartTime(startTime)),
    setSnipStopTime: (stopTime) => dispatch(setSnipStopTime(stopTime)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
