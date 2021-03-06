import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import { AnimationWrapper } from 'react-hover-animation'
import TextTruncate from 'react-text-truncate'
import { Button } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
/*import EditableLabel from 'react-inline-editing'*/

export default class LibraryElement extends Component {

  state = {
    showDescription: false
  }

  handleClick = () => {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  removeFromLibrary = () => {
    if (window.confirm("Are you sure you want to remove this from your library?")) {
      this.props.removeFromLibrary(this.props.id, this.props.userId)
    }
  }

  renderDescription = () => {
    if(this.props.description) {
      if(this.state.showDescription) {
        return (
          <div>
            {this.props.description}
            <a href="#/" onClick={this.handleClick}><br/>Hide</a>
          </div>
        )
      } else {
        return (
          <TextTruncate
            line={2}
            truncateText=""
            text={this.props.description}
            textTruncateChild={<a href="#/" onClick={this.handleClick}><br/>... Show more</a>}
          />
        )
      }
    }
  }

  renderSourceEpisode = () => {
    if (this.props.audioType === 'snippet') {
      return (
        <>
          Source episode: {this.props.originalEpisodeName}
          <br/>
        </>
      )
    }
  }

  renderSourceDetails = () => {
    let link = `/podcasts/${this.props.podcastId}`
    return (
      <Card.Text>
        {this.renderSourceEpisode()}
        See more from <Card.Link href={link}>{this.props.podcastName}</Card.Link>
      </Card.Text>
    )
  }

  renderDate = () => {
    if (this.props.audioType === 'snippet') {
      return (
        <Card.Subtitle className="text-muted">
          {'Snipped '}
          <Moment
            format="MMM Do, YYYY">
            {this.props.createdAt}
          </Moment>
        </Card.Subtitle>
      )
    } else {
      return (
        <Card.Subtitle className="text-muted">
          {'Added '}
          <Moment
            format="MMM Do, YYYY">
            {this.props.airDate}
          </Moment>
        </Card.Subtitle>
      )
    }
  }

  renderTooltip = () => {
    return (
      <Tooltip className="button-tooltip">
        Remove from library
      </Tooltip>
    )
  }

  renderAudioTypeIndicator = () => {
    let audioType = this.props.audioType === 'snippet' ? 'snippet' : 'episode'
    return (
      <div className='float-right library-indicator-remove-container'>
        <span className={`audio-type-indicator audio-type-${audioType}`}>
          {audioType}
        </span>
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 100 }}
          overlay={this.renderTooltip()}
        >
          <Button
             className='ml-2 p-0'
             onClick={this.removeFromLibrary}
             variant='link'
          >
            <img
              src={require('../../assets/images/icons/remove-from-library.svg')}
              width='30'
              alt='delete'
            />
          </Button>
        </OverlayTrigger>
      </div>
    )
  }

  setAudio = () => {
    this.props.setAudio(
      this.props.id,
      this.props.audio,
      this.props.audioLength,
      this.props.title,
      this.props.description,
      this.props.audioType,
      this.props.startTime,
      this.props.stopTime,
      this.props.podcastName,
      this.props.podcastId
    )
  }

  togglePlay = async () => {
    let currentAudioElement

    if (this.props.playing && this.props.id === this.props.currentAudioId) {
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      this.props.pause(currentAudioElement)
    } else if (this.props.id === this.props.currentAudioId) {
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      this.props.play(currentAudioElement)
    } else {
      this.props.discardSnip()
      await this.setAudio()
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      this.props.play(currentAudioElement)
    }
  }

  render() {
    const playPauseImg = (this.props.playing && this.props.id === this.props.currentAudioId) ? require("../../assets/images/icons/pause-circle-outline.svg") : require("../../assets/images/icons/play-circle-outline.svg")

    return (
      <div className = "m-3 episode">
        <AnimationWrapper
          reset={true}
          config={{
            color: {
              initial: 'black',
              onHover: '#4e54c8',
            },
          }}
        >
          <Card
            className="mb-3"
          >
            <div className="clearfix">
              <div className="custom-column episode-play-pause">
                <input
                  type="image"
                  alt="play pause button"
                  src={playPauseImg}
                  onClick={this.togglePlay}
                />
              </div>
              <div className="custom-column episode-details">
                <Card.Body>
                  <Card.Title>
                    {this.props.title}
                    {this.renderAudioTypeIndicator()}
                  </Card.Title>
                  <Card.Text>
                    {this.renderDescription()}
                  </Card.Text>
                    {this.renderSourceDetails()}
                    {this.renderDate()}
                </Card.Body>
              </div>
            </div>
          </Card>
        </AnimationWrapper>
      </div>
    )
  }
}
