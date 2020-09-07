import React, { Component } from 'react'
import { fetchLibrary } from '../actions/fetchLibrary'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import LibraryElementContainer from './LibraryElementContainer'


class LibraryContainer extends Component {

  componentDidUpdate(prevProps) {
    if(this.props.userId && (prevProps.userId !== this.props.userId)) {
      this.props.fetchLibrary(this.props.userId)
    }
  }

  renderLibrary = () => {
    if (this.props.library && this.props.library.length > 0) {
      return (
        this.props.library.map((audioElement, idx) => {
          let audioType = audioElement.audio_type === 'Snippet' ? 'snippet' : 'library-episode'
          return (
            <LibraryElementContainer
              key={idx}
              id={audioElement.id}
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
              userId={this.props.userId}
            />
          )
        })
      )
    } else if (this.props.library && this.props.library.length === 0){
      return (
        <Container className="mt-4 text-center text-secondary">
          <h3 className="mb-3">There's nothing in your library.</h3>
          <h5><a href="/search">Search podcasts</a> to add snips and episodes to it.</h5>
        </Container>
      )
    } else {
      return null
    }
  }

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
