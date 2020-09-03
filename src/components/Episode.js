import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import AudioContainer from '../containers/AudioContainer'
import Moment from 'react-moment'
import { AnimationWrapper } from 'react-hover-animation'
import { connect } from 'react-redux'
import TextTruncate from 'react-text-truncate'


class Episode extends Component {

  state = {
    showDescription: false
  }

  handleClick = () => {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  renderDescription = () => {
    if(this.props.description) {
      if(this.state.showDescription) {
        return (
          <div>
            {this.props.description}
            <a href="#" onClick={this.handleClick}><br/>Hide</a>
          </div>
        )
      } else {
        return (
          <TextTruncate
            line={2}
            truncateText=""
            text={this.props.description}
            textTruncateChild={<a href="#" onClick={this.handleClick}><br/>... Show more</a>}
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
    if (this.props.audioType !== 'searchEpisode') {
      let link = `/podcasts/${this.props.podcastId}`
      return (
        <Card.Text>
          {this.renderSourceEpisode()}
          See more from <Card.Link href={link}>{this.props.podcastName}</Card.Link>
        </Card.Text>
      )
    }
  }

  renderDate = () => {
    if (this.props.audioType === 'snippet') {
      return (
        <Card.Subtitle className="mb-2 text-muted">
          {'Snipped '}
          <Moment
            format="MMM Do, YYYY">
            {this.props.createdAt}
          </Moment>
        </Card.Subtitle>
      )
    } else if (this.props.audioType === 'episode') {
      return (
        <Card.Subtitle className="mb-2 text-muted">
          {'Added '}
          <Moment
            format="MMM Do, YYYY">
            {this.props.airDate}
          </Moment>
        </Card.Subtitle>
      )
    } else {
      return (
        <Card.Subtitle className="mb-2 text-muted">
          {'Aired '}
          <Moment
            format="MMM Do, YYYY">
            {this.props.airDate}
          </Moment>
        </Card.Subtitle>
      )
    }
  }

  renderIndicator = () => {

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
            <Card.Title>{this.props.title}</Card.Title>
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
            />
          </Card.Footer>
        </Card>
      </AnimationWrapper>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentAudioId: state.currentAudio.audioId
  }
}

export default connect(mapStateToProps)(Episode)
