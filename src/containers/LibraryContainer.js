import React, { Component } from 'react'
import { fetchLibrary } from '../actions/fetchLibrary'
import { connect } from 'react-redux'
import LibraryElementContainer from './LibraryElementContainer'


class LibraryContainer extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.userId && prevProps.userId !== this.props.userId) {
      this.props.fetchLibrary(this.props.userId)
    }
  }

  renderLibrary = () => this.props.library ? this.props.library.map((audioElement, idx) => {
    let audioType = audioElement.audio_type === 'Snippet' ? 'snippet' : 'library-episode'
    return (
      <LibraryElementContainer
        key={idx}
        id={audioElement.audio.id}
        audio={audioElement.audio.audio}
        audioLength={audioElement.audio.audio_length_sec}
        title={audioElement.audio.title}
        description={audioElement.audio.description}
        createdAt={audioElement.audio.created_at}
        audioType={audioType}
        startTime={audioElement.audio.start_time}
        stopTime={audioElement.audio.stop_time}
        originalEpisodeName={audioElement.audio.original_episode_name}
        podcastName={audioElement.audio.podcast_name}
        podcastId={audioElement.audio.podcast_id}
      />
    )
  }) : null

  //* rename src to audio in snippets and episodes tables
  //* add audio_length_sec to snippets and episodes

  render() {
    return (
      <>
        {this.renderLibrary()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.session.user.id,
    library: state.library.library
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLibrary: (userId) => dispatch(fetchLibrary(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)
