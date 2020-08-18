import React, { Component } from 'react'
import Episode from '../components/Episode'
import { connect } from 'react-redux'

class EpisodeContainer extends Component {

  render() {
    let description = this.props.description ? this.props.description.replace(/(<([^>]+)>)/ig,"") : null
    return (
      <Episode
        title={this.props.title}
        description={description}
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
      />
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(EpisodeContainer)
