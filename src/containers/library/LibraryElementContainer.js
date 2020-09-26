import React, { Component } from 'react'
import LibraryElement from '../../components/library/LibraryElement'
import { removeFromLibrary } from '../../actions/removeFromLibrary'
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
        userId={this.props.userId}
        removeFromLibrary={this.props.removeFromLibrary}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromLibrary: (audioId, userId) => dispatch(removeFromLibrary(audioId, userId))
  }
}

export default connect(null, mapDispatchToProps)(LibraryElementContainer)
