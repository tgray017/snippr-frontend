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
              <Card.Subtitle className="text-muted">
                {'Aired '}
                <Moment
                  format="MMM Do, YYYY">
                  {this.props.airDate}
                </Moment>
              </Card.Subtitle>
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