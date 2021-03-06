import React, { Component } from 'react'
import Podcast from '../../components/search/Podcast'
import EpisodesContainer from './EpisodesContainer'
import { connect } from 'react-redux'
import { fetchPodcast, fetchEpisodes } from '../../actions/search'


class PodcastContainer extends Component {

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchPodcast(params.podcastId)
  }

  render() {
    return (
      <div>
        <div id="podcast-container">
          <Podcast {...this.props}/>
        </div>
        <div id="episodes-container">
          <EpisodesContainer/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.podcasts.currentPodcast.title,
    publisher: state.podcasts.currentPodcast.publisher,
    image: state.podcasts.currentPodcast.image,
    thumbnail: state.podcasts.currentPodcast.thumbnail,
    description: state.podcasts.currentPodcast.description,
    lastAirDate: state.podcasts.currentPodcast.lastAirDate,
    nextEpisodePubDate: state.podcasts.currentPodcast.nextEpisodePubDate,
    episodes: state.podcasts.currentPodcast.episodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPodcast: (id) => dispatch(fetchPodcast(id)),
    fetchEpisodes: (podcastId) => dispatch(fetchEpisodes(podcastId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastContainer)
