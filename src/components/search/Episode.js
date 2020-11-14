import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import AudioContainer from '../../containers/audio/AudioContainer'
import Moment from 'react-moment'
import { AnimationWrapper } from 'react-hover-animation'
import TextTruncate from 'react-text-truncate'


export default class Episode extends Component {

  state = {
    showDescription: false
  }

  handleClick = () => {
    this.setState({
      showDescription: !this.state.showDescription
    })
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
    console.log(this.props)

    if (this.props.playing && this.props.id === this.props.currentAudioId) {
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      currentAudioElement.pause()
      this.props.pause()
    } else if (this.props.id === this.props.currentAudioId) {
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      currentAudioElement.play()
      this.props.play()
    } else {
      this.props.discardSnip()
      await this.setAudio()
      currentAudioElement = document.getElementById(this.props.currentAudioId)
      currentAudioElement.play()
      this.props.play()
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
            element="span"
          />
        )
      }
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
                src={playPauseImg}
                onClick={this.togglePlay}
              />
            </div>
            <div className="custom-column episode-details">
              <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Text>
                  {this.renderDescription()}
                </Card.Text>
                  <Card.Subtitle className="text-muted">
                    {'Aired '}
                    <Moment
                      format="MMM Do, YYYY">
                      {this.props.airDate}
                    </Moment>
                  </Card.Subtitle>
              </Card.Body>
            </div>
          </div>
        </Card>
      </AnimationWrapper>
      </div>
    )
  }
}
