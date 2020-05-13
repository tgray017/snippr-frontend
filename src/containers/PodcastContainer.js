import React, { Component } from 'react'
import PaginationComponent from '../components/PaginationComponent'
import { connect } from 'react-redux'
import { setPodcast } from '../actions/setPodcast'
import { fetchEpisodes } from '../actions/fetchEpisodes'


class PodcastContainer extends Component {

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.setPodcast(params.podcastId)
    this.props.fetchEpisodes(params.podcastId)
    console.log(params.podcastId)
  }

  render() {
    return (
      'Podcasts container!'
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPodcast: (id) => dispatch(setPodcast(id)),
    fetchEpisodes: (podcastId) => dispatch(fetchEpisodes(podcastId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastContainer)
