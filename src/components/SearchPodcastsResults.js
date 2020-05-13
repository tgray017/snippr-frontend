import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import TextTruncate from 'react-text-truncate'
import { AnimationWrapper } from 'react-hover-animation'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default class SearchPodcastsResults extends Component {
  render() {
    return (
      <AnimationWrapper
      config={{
        color: {
          initial: 'black',
          onHover: 'blue',
        },
      }}
      animationConfig='wobbly'
      >
        <Card>
          <Container>
            <Row className="align-items-center">
              <Col>
                <Image src={this.props.image} thumbnail/>
              </Col>
              <Col xs={10}>
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
                    {'Last aired '}
                    <Moment
                      format="MMM Do, YYYY">
                      {this.props.lastAirDate}
                    </Moment>
                  </Card.Subtitle>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </AnimationWrapper>
    )
  }
}
