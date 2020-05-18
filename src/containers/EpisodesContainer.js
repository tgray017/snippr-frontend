import React, { Component } from 'react'
import PaginationComponent from '../components/PaginationComponent'
import EpisodeContainer from '../containers/EpisodeContainer'
import { connect } from 'react-redux'

class EpisodesContainer extends Component {

  renderEpisodes = () => this.props.episodes ? this.props.episodes.map((episode, idx) => {
    return (
      <EpisodeContainer
        key={idx}
        title={episode.title}
        description={episode.description}
        airDate={episode.pub_date_ms}
        audio={episode.audio}
      />
    )
  }) : null

  render() {
    return (
      <div>
        {this.renderEpisodes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.podcasts.currentPodcast.episodes
  }
}

export default connect(mapStateToProps)(EpisodesContainer)
