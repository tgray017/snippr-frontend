import React, { Component } from 'react'
import PaginationContainer from './PaginationContainer'
import EpisodeContainer from './EpisodeContainer'
import { connect } from 'react-redux'

class EpisodesContainer extends Component {

  renderEpisodes = () => this.props.episodes ? this.props.episodes.map((episode, idx) => {
    return (
      <EpisodeContainer
        key={idx}
        id={episode.id}
        audio={episode.audio}
        audioLength={episode.audio_length_sec}
        title={episode.title}
        description={episode.description}
        podcastName={this.props.podcastName}
        podcastId={this.props.podcastId}
        airDate={episode.pub_date_ms}
      />
    )
  }) : null

  renderPaginationContainer = () => {
    if(this.props.episodes && this.props.episodes.length !== 0) {
      return (
        <PaginationContainer
          paginationType={"episodes"}
          nextEpisodePubDate={this.props.nextEpisodePubDate}
        />
      )
    }
  }

  render() {
    return (
      <>
        {this.renderEpisodes()}
        {this.renderPaginationContainer()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.podcasts.currentPodcast.episodes,
    nextEpisodePubDate: state.podcasts.currentPodcast.nextEpisodePubDate,
    podcastName: state.podcasts.currentPodcast.title,
    podcastId: state.podcasts.currentPodcast.id
  }
}

export default connect(mapStateToProps)(EpisodesContainer)
