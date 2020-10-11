import React, { Component } from 'react'
import PaginationComponent from '../../components/search/PaginationComponent'
import { fetchEpisodes, updateOffset, updatePrevPages } from '../../actions/search'
import { connect } from 'react-redux'

class PaginationContainer extends Component {

  render() {
    return (
      <PaginationComponent
        offset={this.props.offset}
        nextOffset={this.props.nextOffset}
        updateOffset={this.props.updateOffset}
        nextEpisodePubDate={this.props.nextEpisodePubDate}
        earliestEpisodePubDate={this.props.earliestEpisodePubDate}
        podcastId={this.props.podcastId}
        fetchEpisodes={this.props.fetchEpisodes}
        previousPages={this.props.previousPages}
        previousPagePubDate={this.props.previousPagePubDate}
        updatePrevPages={this.props.updatePrevPages}
        paginationType={this.props.paginationType}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    paginationType: ownProps.paginationType,
    offset: state.podcasts.offset,
    nextOffset: state.podcasts.nextOffset,
    nextEpisodePubDate: state.podcasts.currentPodcast.nextEpisodePubDate,
    earliestEpisodePubDate: state.podcasts.currentPodcast.earliestEpisodePubDate,
    previousPagePubDate: state.podcasts.currentPodcast.previousPages[state.podcasts.currentPodcast.previousPages.length - 2],
    previousPages: state.podcasts.currentPodcast.previousPages,
    podcastId: state.podcasts.currentPodcast.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOffset: (offset) => dispatch(updateOffset(offset)),
    updatePrevPages: () => new Promise( () => dispatch(updatePrevPages())),
    fetchEpisodes: (podcastId, nextEpisodePubDate, direction) => dispatch(fetchEpisodes(podcastId, nextEpisodePubDate, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
