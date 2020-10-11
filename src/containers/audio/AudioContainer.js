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
  setAudio,
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
      audioLength: this.props.audioLength,
      currentTime: currentTime,
      startSnipTime: 0,
      playing: false,
      playAfterDrag: false
    }
  }

  togglePlay = () => {

    if (this.props.playing && this.audioRef.current.src === this.props.audioUrl) {
      this.props.pause()
      this.audioRef.current.pause()
    } else {
      let endTime = this.props.audioType === 'snippet' ? this.props.stopTime : this.state.audioLength
      if (!(this.audioRef.current.currentTime >= endTime)) {
        this.props.play()
        this.audioRef.current.play()
      }
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
    let currentTime
    if (this.props.audioType === 'snippet') {
      currentTime = this.audioRef.current.currentTime >= this.props.stopTime ? this.props.stopTime : this.audioRef.current.currentTime
    } else {
      currentTime = this.audioRef.current.currentTime >= this.state.audioLength ? this.state.audioLength : this.audioRef.current.currentTime
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
      currentTime = this.props.startTime + (this.state.audioLength*offsetRatio)
    } else {
      currentTime = this.state.audioLength*offsetRatio
    }

    this.setState({
      ...this.state,
      currentTime: currentTime
    }, () => {
      this.audioRef.current.currentTime = this.state.currentTime
    })
  }

  handlePlay = () => {
    this.props.setAudio(this.props.id, this.props.audio, this.props.podcastName, this.props.podcastId, this.props.description)
  }

  renderSnippingContainer = () => {
    if(this.props.id === this.props.audioId && this.props.audioType !== 'snippet') {
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
          audio={this.props.audio}
          title={this.props.title}
          description={this.props.description}
          podcastName={this.props.podcastName}
          podcastId={this.props.podcastId}
          audioUrl={this.props.audioUrl}
          snipping={this.props.snipping}
          src={this.props.audio}
          audioType={this.props.audioType}
        />
      )
    }
  }

  render() {
    let offsetRatio
    let timeFromEnd
    if (this.props.audioType === 'snippet') {
      offsetRatio = ((this.state.currentTime - this.props.startTime)/this.state.audioLength)*100
      timeFromEnd = (this.props.stopTime - this.state.currentTime) + this.props.startTime
    } else {
      offsetRatio = (this.state.currentTime/this.state.audioLength)*100
      timeFromEnd = this.state.audioLength - this.state.currentTime
    }

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
    currentTime: state.currentAudio.audioCurrentTime,
    duration: state.currentAudio.audioDuration,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAudio: (audioId, audioUrl, podcastName, podcastId, description) => dispatch(setAudio(audioId, audioUrl, podcastName, podcastId, description)),
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
