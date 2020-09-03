import React, { Component } from 'react'
import Episode from '../components/Episode'
/*import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'*/
import { connect } from 'react-redux'

class EpisodeContainer extends Component {

  createDescription = () => {
    return this.props.description ? this.props.description.replace(/(<([^>]+)>)/ig,"") : null
  }

  render() {
    return (
      <Episode
        title={this.props.title}
        description={this.createDescription()}
        airDate={this.props.airDate}
        audio={this.props.audio}
        audioLength={this.props.audioLength}
        id={this.props.id}
        audioType={this.props.audioType}
        startTime={this.props.startTime}
        stopTime={this.props.stopTime}
        originalEpisodeName={this.props.originalEpisodeName}
        podcastName={this.props.podcastName}
        podcastId={this.props.podcastId}
        audioType={this.props.audioType}
      />
    )
  }
}




const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(EpisodeContainer)
