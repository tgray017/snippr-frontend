import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import TextTruncate from 'react-text-truncate'

export default class Podcast extends Component {

  state = {
    showDescription: false
  }

  handleClick = () => {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  renderDescription = () => {
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

  render() {

    return (
      <Container className="my-3">
        <Row className="align-items-center">
          <Col sm={2}>
            <Image src={this.props.image} thumbnail/>
          </Col>
          <Col>
            <Card className="border-0">
              <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {'Last aired '}
                  <Moment
                    format="MMM Do, YYYY">
                    {this.props.lastAirDate}
                  </Moment>
                </Card.Subtitle>
                <Card.Text>
                  {this.renderDescription()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
