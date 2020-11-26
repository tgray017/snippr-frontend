import React, { Component } from 'react'
import LibraryElement from '../../components/library/LibraryElement'
import { setAudio, play, pause, discardSnip } from '../../actions/audio'
import { removeFromLibrary } from '../../actions/library'
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
        setAudio={this.props.setAudio}
        currentAudioId={this.props.currentAudioId}
        playing={this.props.playing}
        play={this.props.play}
        pause={this.props.pause}
        discardSnip={this.props.discardSnip}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentAudioId: state.currentAudio.audioId,
    playing: state.currentAudio.playing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromLibrary: (audioId, userId) => dispatch(removeFromLibrary(audioId, userId)),
    setAudio: (audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId) => dispatch(setAudio(audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId)),
    play: (audioElement) => dispatch(play(audioElement)),
    pause: (audioElement) => dispatch(pause(audioElement)),
    discardSnip: () => dispatch(discardSnip())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryElementContainer)
