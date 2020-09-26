import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import AudioContainer from '../../containers/audio/AudioContainer'
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
    this.props.removeFromLibrary(this.props.id, this.props.userId)
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
             onClick={() => this.removeFromLibrary()}
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

  render() {
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
          <Card.Footer>
            <AudioContainer
              id={this.props.id}
              audio={this.props.audio}
              audioLength={this.props.audioLength}
              title={this.props.title}
              description={this.props.description}
              audioType={this.props.audioType}
              startTime={this.props.startTime}
              stopTime={this.props.stopTime}
              podcastName={this.props.podcastName}
              podcastId={this.props.podcastId}
            />
          </Card.Footer>
        </Card>
      </AnimationWrapper>
      </div>
    )
  }
}
