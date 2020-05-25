import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import AudioContainer from '../containers/AudioContainer'
import SnippingContainer from '../containers/SnippingContainer'
import Moment from 'react-moment'
import { AnimationWrapper } from 'react-hover-animation'
import { connect } from 'react-redux'
import TextTruncate from 'react-text-truncate'


class Episode extends Component {

  renderSnippingContainer = () => {
    if(this.props.id === this.props.currentAudioId) {
      return (
        <SnippingContainer/>
      )
    }
  }

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
              id={this.props.id}
              audio={this.props.audio}
              audioLength={this.props.audioLength}
            />
            {this.renderSnippingContainer()}
          </Card.Footer>
        </Card>
      </AnimationWrapper>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentAudioId: state.currentAudio.audioId
  }
}

export default connect(mapStateToProps)(Episode)
