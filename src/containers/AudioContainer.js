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
import { connect } from 'react-redux'

import '../stylesheets/Audio.css'


class AudioContainer extends Component {

  constructor() {
    super()
    this.audioRef = React.createRef()
  }

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

  handlePlayClick = () => {
    console.log(this.audioRef)
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems:'center'}}>
        <audio
          src={this.props.audio}
          ref={this.audioRef}
        />
        <PlayPause
          audioRef={this.audioRef}
        />
        <Bar/>

        {/*
        <AudioElement
          audio={this.props.audio}
          setAudio={this.props.setAudio}
          snipping={this.props.snipping}
          currentAudio={this.props.currentAudio}
          ref={(input) => {this.audioRef = input}}
        />
        */}
        {this.renderSnipButton()}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    snipping: state.currentAudio.snipping,
    currentAudio: state.currentAudio.audioUrl,
    startTime: state.currentAudio.startTime,
    endTime: state.currentAudio.endTime,
    showGeneratePreview: state.currentAudio.showGeneratePreview
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAudio: (audioUrl) => dispatch(setAudio(audioUrl)),
    startSnipping: (startTime) => dispatch(startSnipping(startTime)),
    stopSnipping: (endTime) => dispatch(stopSnipping(endTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
