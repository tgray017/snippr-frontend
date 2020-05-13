import React, { Component } from 'react'
import SearchPodcastsInput from '../components/SearchPodcastsInput'
import SearchPodcastsResults from '../components/SearchPodcastsResults'
import { connect } from 'react-redux'
import { fetchPodcasts } from '../actions/fetchPodcasts'
import { updateSearchInput } from '../actions/updateSearchInput'
import { setPodcast } from '../actions/setPodcast'
import PaginationContainer from './PaginationContainer'

class SearchPodcastsContainer extends Component {

  renderResults = () => this.props.results.map((result, idx) => {
    return (
      <SearchPodcastsResults
        key={idx}
        title={result.title_original}
        description={result.description_original}
        image={result.image}
        thumbnail={result.thumbnail}
        lastAirDate={result.latest_pub_date_ms}
        id={result.id}
        setPodcast={this.props.setPodcast}
      />
    )
  })

  renderPaginationContainer = () => {
    if(this.props.results.length !== 0) {
      return (
        <PaginationContainer/>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Search!</h2>
        <SearchPodcastsInput
          updateSearchInput={this.props.updateSearchInput}
          searchInput={this.props.searchInput}
          fetchPodcasts={this.props.fetchPodcasts}
          results={this.props.results}
          offset={this.props.offset}
        />
        {this.renderResults()}
        {this.renderPaginationContainer()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchInput: (input) => dispatch(updateSearchInput(input)),
    fetchPodcasts: (input, offset) => dispatch(fetchPodcasts(input, offset)),
    setPodcast: (id) => dispatch(setPodcast(id))
  }
}

const mapStateToProps = state => {
  return {
    searchInput: state.podcasts.searchInput,
    results: state.podcasts.results,
    offset: state.podcasts.offset
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPodcastsContainer)
