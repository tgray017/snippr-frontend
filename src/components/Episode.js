import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import AudioContainer from '../containers/AudioContainer'
import Moment from 'react-moment'
import { AnimationWrapper } from 'react-hover-animation'
import TextTruncate from 'react-text-truncate'


export default class Episode extends Component {

  render() {
    return (
      <AnimationWrapper
        reset={true}
        config={{
          color: {
            initial: 'black',
            onHover: 'blue',
          },
        }}
      >
        <Card>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>
              <TextTruncate
                line={2}
                truncateText="…"
                text={this.props.description}
              />
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              {'Aired '}
              <Moment
                format="MMM Do, YYYY">
                {this.props.airDate}
              </Moment>
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <AudioContainer
              audio={this.props.audio}
              audioLength={this.props.audioLength}
            />
          </Card.Footer>
        </Card>
      </AnimationWrapper>
    )
  }
}
