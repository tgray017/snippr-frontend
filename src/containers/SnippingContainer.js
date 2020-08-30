import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { addSnipToLibrary } from '../actions/addSnipToLibrary'
import { addEpisodeToLibrary } from '../actions/addEpisodeToLibrary'
import { downloadSnip } from '../actions/downloadSnip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import RingLoader from 'react-spinners/RingLoader'
import '../stylesheets/Audio.css'

class SnippingContainer extends Component {

  state = {
    clickNumber: 0
  }

  handleSnipClick = () => {
    /* the following condition is meant to handle the third click */
    if(this.props.snipping && this.props.snipStartTime && this.props.snipStopTime) {
      this.props.discardSnip()
      this.setState({
        clickNumber: 0
      })
    /* the following two conditions are meant to handle the second click */
    /* the first of the two conditions handles the case where the snipStart handle */
    /* is ahead of the current time, to prevent the stopSnip handle from appearing */
    /* before the startSnip handle */
    } else if (this.props.snipping && this.props.snipStartTime && this.props.currentTime < this.props.snipStartTime) {
      this.props.setSnipStopTime(this.props.snipStartTime)
      this.setState({
        clickNumber: 2
      })
    } else if (this.props.snipping) {
      this.props.setSnipStopTime(this.props.currentTime)
      this.setState({
        clickNumber: 2
      })
    /* the following condition is meant to handle the first click */
    } else {
      this.props.startSnipping()
      this.props.setSnipStartTime(this.props.currentTime)
      this.setState({
        clickNumber: 1
      })
    }
  }

  handleActionClick = (type) => {
    if (type === 'snippet-library') {
      this.props.addSnipToLibrary(this.props.userId, this.props.title, this.props.audio, this.props.audioLength, this.props.podcastName, this.props.podcastId, this.props.src, this.props.snipStartTime, this.props.snipStopTime)
    } else if (type === 'snippet-download') {
      this.props.downloadSnip(this.props.title, this.props.audio, this.props.audioLength, this.props.snipStartTime, this.props.snipStopTime)
    } else if (type === 'episode-library') {
      this.props.addEpisodeToLibrary(this.props.userId, this.props.title, this.props.description, this.props.audio, this.props.audioLength, this.props.podcastName, this.props.podcastId, this.props.src)
    }
  }

  renderTooltip = (type, text) => {
    let snipToolTipText
    if (type === 'snippet') {
      snipToolTipText = text
    } else if (type === 'episode-library') {
      snipToolTipText = (this.props.authenticated || this.state.clickNumber !== 2)  ? 'Add episode to library' : 'Log in to add episode to library'
    } else if (type === 'snippet-library') {
      snipToolTipText = (this.props.authenticated) ? 'Add snippet to library' : 'Log in to add snippet to library'
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
    let downloadSnippetImage = this.props.downloading ? require('../images/downloading-snippet.gif') : require('../images/download-snippet-new.svg')

    let addSnipOption
    if (this.state.clickNumber === 0) {
      addSnipOption = true
    } else if (this.state.clickNumber === 1) {
      addSnipOption = true
    } else {
      addSnipOption = false
    }

    if (this.props.downloading) {
      return (
        <Button
           variant="outline-secondary"
           className="m-2 p-1 button-container"
           disabled={addSnipOption}
           onClick={() => this.handleActionClick('snippet-download')}
        >
          <RingLoader
            loading={this.props.downloading}
            size={50}
            margin={0}
            padding={0}
          />
        </Button>
      )
    } else {
      return (
        <Button
           variant="outline-secondary"
           className="m-2 p-1 button-container"
           disabled={addSnipOption}
           onClick={() => this.handleActionClick('snippet-download')}
        >
          <img className='button' src={`${downloadSnippetImage}`}></img>
        </Button>
      )
    }
  }

  render() {
    let snipImage
    let snipToolTipText
    let addSnipOption
    if (this.state.clickNumber === 0) {
      snipImage = require('../images/start-snip-icon.svg')
      snipToolTipText = 'Start snipping'
      addSnipOption = true
    } else if (this.state.clickNumber === 1) {
      snipImage = require('../images/stop-snip-icon.svg')
      snipToolTipText = 'Stop snipping'
      addSnipOption = true
    } else {
      snipImage = require('../images/trash-can-icon.svg')
      snipToolTipText = 'Discard snip'
      addSnipOption = false
    }

    let addEpisodeToLibraryImage = require('../images/add-episode-to-library.svg')
    let addSnippetToLibraryImage = require('../images/add-snippet-to-library.svg')

    return (
      <div className="mt-3 snipping-container">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet', snipToolTipText)}
        >
          <div>
            <Button
               variant="outline-secondary"
               className="m-2 p-1 button-container"
               onClick={this.handleSnipClick}
            >
              <img className='button' src={`${snipImage}`}></img>
            </Button>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
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
              <img className='button' src={`${addEpisodeToLibraryImage}`}></img>
            </Button>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet-library')}
        >
          <div>
            <Button
               variant="outline-secondary"
               className="m-2 p-1 button-container"
               disabled={addSnipOption || !this.props.authenticated}
               onClick={() => this.handleActionClick('snippet-library')}
            >
              <img className='button' src={`${addSnippetToLibraryImage}`}></img>
            </Button>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip('snippet-download')}
        >
          <div>
            {this.renderDownloadSnipButton()}
          </div>
        </OverlayTrigger>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.session.authenticated,
    userId: state.session.user.id,
    podcastName: state.podcasts.currentPodcast.title,
    podcastId: state.podcasts.currentPodcast.id,
    downloading: state.alerts.downloading
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addSnipToLibrary: (userId, title, audio, audioLength, podcastName, podcastId, rawSrc, snipStartTime, snipStopTime) => dispatch(addSnipToLibrary(userId, title, audio, audioLength, podcastName, podcastId, rawSrc, snipStartTime, snipStopTime)),
    addEpisodeToLibrary: (userId, title, description, audio, audioLength, podcastName, podcastId, rawSrc) => dispatch(addEpisodeToLibrary(userId, title, description, audio, audioLength, podcastName, podcastId, rawSrc)),
    downloadSnip: (title, audio, audioLength, snipStartTime, snipStopTime) => dispatch(downloadSnip(title, audio, audioLength, snipStartTime, snipStopTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippingContainer)
