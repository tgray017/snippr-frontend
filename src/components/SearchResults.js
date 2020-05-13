import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import AudioContainer from '../containers/AudioContainer'

export default class SearchResults extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.episodeTitle}</Card.Title>
            <Card.Text>
              {this.props.podcastTitle}
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
            <AudioContainer audio={this.props.audio}/>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}
