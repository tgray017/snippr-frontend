import React, { Component } from 'react'
import LibraryElement from '../components/LibraryElement'
import { connect } from 'react-redux'

class LibraryElementContainer extends Component {

  render() {
    return (
      <LibraryElement
        title={this.props.title}
        description={this.props.description}
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

export default connect(null, mapDispatchToProps)(LibraryElementContainer)
