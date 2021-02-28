import React, { Component } from 'react'
import Episode from '../../components/search/Episode'
import { setAudio, play, pause, discardSnip } from '../../actions/audio'
import { connect } from 'react-redux'
/*import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'*/

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
        podcastName={this.props.podcastName}
        podcastId={this.props.podcastId}
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
  /* a bunch of this isn't being used; update here, in the reducer, and in the child components */
  return {
    setAudio: (audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId) => dispatch(setAudio(audioId, audioUrl, audioLength, title, description, audioType, startTime, stopTime, podcastName, podcastId)),
    play: (audioElement) => dispatch(play(audioElement)),
    pause: (audioElement) => dispatch(pause(audioElement)),
    discardSnip: () => dispatch(discardSnip())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)
