import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {
  setSnipStartTime,
  setSnipStopTime,
  startSnipping,
  stopSnipping,
  discardSnip
} from '../../actions/audio'
import {
  addSnipToLibrary,
  addEpisodeToLibrary,
  downloadSnip
} from '../../actions/library'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import RingLoader from 'react-spinners/RingLoader'
import '../../stylesheets/Audio.css'

class SnippingContainer extends Component {

  handleSnipClick = () => {
    if (this.props.snipStatus === 'NOT_STARTED') {
      this.props.startSnipping()
      this.props.setSnipStartTime(this.props.currentTime)
    } else if (this.props.snipStatus === 'START_TIME_SET') {
      this.props.stopSnipping()
      this.props.setSnipStopTime(this.props.currentTime < this.props.snipStartTime ? this.props.snipStartTime : this.props.currentTime)
    } else {
      this.props.discardSnip()
    }
  }

  handleActionClick = (type) => {
    if (type === 'snippet-library') {
      this.props.addSnipToLibrary(this.props.userId, this.props.title, this.props.audio, this.props.audioLength, this.props.podcastName, this.props.podcastId, this.props.src, this.props.snipStartTime, this.props.snipStopTime)
    } else if (type === 'snippet-download') {
      if (this.props.audioType === 'snippet') {
        this.props.downloadSnip(this.props.title, this.props.audio.split('#t=')[0], this.props.audioLength, this.props.startTime, this.props.stopTime)
      } else {
        this.props.downloadSnip(this.props.title, this.props.audio, this.props.audioLength, this.props.snipStartTime, this.props.snipStopTime)
      }
    } else if (type === 'episode-library') {
      this.props.addEpisodeToLibrary(this.props.userId, this.props.title, this.props.description, this.props.audio, this.props.audioLength, this.props.podcastName, this.props.podcastId, this.props.src)
    }
  }

  renderTooltip = (type, text) => {
    let snipToolTipText
    if (type === 'snippet') {
      snipToolTipText = text
    } else if (type === 'episode-library') {
      snipToolTipText = this.props.authenticated ? 'Add episode to library' : 'Log in to add episode to library'
    } else if (type === 'snippet-library') {
      snipToolTipText = this.props.authenticated ? 'Add snippet to library' : 'Log in to add snippet to library'
    } else if (type === 'snippet-download') {
      snipToolTipText = 'Download snippet'
    }

    return (
      <Tooltip className="button-tooltip">
        {snipToolTipText}
      </Tooltip>
    )
  }

  renderDownloadSnipButton = () => {
    let downloadSnippetImage = this.props.downloading ? require('../../assets/images/icons/downloading-snippet.gif') : require('../../assets/images/icons/download-snippet-new.svg')

    let disableSnipOption
    if (this.props.snipStatus === 'STOP_TIME_SET' || this.props.audioType === 'snippet') {
      disableSnipOption = false
    } else {
      disableSnipOption = true
    }

    if (this.props.downloading) {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet-download')}
        >
          <Button
             variant="outline-secondary"
             className="m-2 p-1 button-container"
             disabled={disableSnipOption}
             onClick={() => this.handleActionClick('snippet-download')}
          >
            <RingLoader
              loading={this.props.downloading}
              size={50}
              margin={0}
              padding={0}
            />
          </Button>
        </OverlayTrigger>
      )
    } else {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet-download')}
        >
          <Button
             variant="outline-secondary"
             className="m-2 p-1 button-container"
             disabled={disableSnipOption}
             onClick={() => this.handleActionClick('snippet-download')}
          >
            <img className='button' src={`${downloadSnippetImage}`} alt='download snippet'></img>
          </Button>
        </OverlayTrigger>
      )
    }
  }

  renderSnipButton = () => {
    let snipImage
    let snipToolTipText

    if (this.props.snipStatus === 'NOT_STARTED') {
      snipImage = require('../../assets/images/icons/start-snip.svg')
      snipToolTipText = 'Start snipping'
    } else if (this.props.snipStatus === 'START_TIME_SET') {
      snipImage = require('../../assets/images/icons/stop-snip.svg')
      snipToolTipText = 'Stop snipping'
    } else {
      snipImage = require('../../assets/images/icons/trash-can.svg')
      snipToolTipText = 'Discard snip'
    }

    if (this.props.audioType !== 'snippet') {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet', snipToolTipText)}
        >
          <div>
            <Button
               variant="outline-secondary"
               className="m-2 p-1 button-container"
               onClick={this.handleSnipClick}
            >
              <img className='button' src={`${snipImage}`} alt= 'snip button'></img>
            </Button>
          </div>
        </OverlayTrigger>
      )
    }
  }

  renderAddEpisodeToLibrary = () => {
    let addEpisodeToLibraryImage = require('../../assets/images/icons/add-episode-to-library.svg')

    if (this.props.audioType === 'search-episode') {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('episode-library')}
        >
          <div>
            <Button
               variant="outline-secondary"
               className="m-2 p-1 button-container"
               disabled={!this.props.authenticated}
               onClick={() => this.handleActionClick('episode-library')}
            >
              <img className='button' src={`${addEpisodeToLibraryImage}`} alt='add episode to library'></img>
            </Button>
          </div>
        </OverlayTrigger>
      )
    }
  }

  renderAddSnippetToLibrary = () => {
    let addSnippetToLibraryImage = require('../../assets/images/icons/add-snippet-to-library.svg')

    let disableSnipOption
    if (this.props.snipStatus === 'STOP_TIME_SET') {
      disableSnipOption = false
    } else {
      disableSnipOption = true
    }

    if (this.props.audioType !== 'snippet') {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet-library')}
        >
          <div>
            <Button
               variant="outline-secondary"
               className="m-2 p-1 button-container"
               disabled={disableSnipOption || !this.props.authenticated}
               onClick={() => this.handleActionClick('snippet-library')}
            >
              <img className='button' src={`${addSnippetToLibraryImage}`} alt='add snippet to library'></img>
            </Button>
          </div>
        </OverlayTrigger>
      )
    }
  }

  renderForwardButton = () => {
    let forwardImage = require('../../assets/images/icons/forward-10.svg')
    return (
      <div id="forward-10-button">
        <input
          type="image"
          src={forwardImage}
          onClick={this.props.handleFastForward}
        />
      </div>
    )
  }

  renderRewindButton = () => {
    let rewindImage = require('../../assets/images/icons/rewind-10.svg')
    return (
      <div id="rewind-10-button">
        <input
          type="image"
          src={rewindImage}
          onClick={this.props.handleRewind}
        />
      </div>
    )
  }

  renderEpisodeName = () => {
    return (
      <div id="current-audio-podcast-name">
        {this.props.podcastName} - {this.props.title}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderEpisodeName()}
        <div className="mt-1 snipping-container">
          {this.renderRewindButton()}
          {this.renderSnipButton()}
          {this.renderAddEpisodeToLibrary()}
          {this.renderAddSnippetToLibrary()}
          {this.renderDownloadSnipButton()}
          {this.renderForwardButton()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated,
    userId: state.session.user.id,
    downloading: state.alerts.downloading,
    title: state.currentAudio.title,
    audioLength: state.currentAudio.audioLength,
    snipStartTime: state.currentAudio.snipStartTime,
    snipStopTime: state.currentAudio.snipStopTime,
    podcastName: state.currentAudio.podcastName,
    podcastId: state.currentAudio.podcastId,
    description: state.currentAudio.description,
    audio: state.currentAudio.audioUrl,
    src: state.currentAudio.audioUrl,
    snipping: state.currentAudio.snipping,
    snipStatus: state.currentAudio.snipStatus,
    startTime: state.currentAudio.startTime,
    stopTime: state.currentAudio.stopTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSnipping: () => dispatch(startSnipping()),
    stopSnipping: () => dispatch(stopSnipping()),
    discardSnip: () => dispatch(discardSnip()),
    setSnipStartTime: (startTime) => dispatch(setSnipStartTime(startTime)),
    setSnipStopTime: (stopTime) => dispatch(setSnipStopTime(stopTime)),
    addSnipToLibrary: (userId, title, audio, audioLength, podcastName, podcastId, rawSrc, snipStartTime, snipStopTime) => dispatch(addSnipToLibrary(userId, title, audio, audioLength, podcastName, podcastId, rawSrc, snipStartTime, snipStopTime)),
    addEpisodeToLibrary: (userId, title, description, audio, audioLength, podcastName, podcastId, rawSrc) => dispatch(addEpisodeToLibrary(userId, title, description, audio, audioLength, podcastName, podcastId, rawSrc)),
    downloadSnip: (title, audio, audioLength, snipStartTime, snipStopTime) => dispatch(downloadSnip(title, audio, audioLength, snipStartTime, snipStopTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippingContainer)
