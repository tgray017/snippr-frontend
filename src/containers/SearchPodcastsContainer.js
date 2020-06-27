import React, { Component } from 'react'
import SearchPodcastsInput from '../components/SearchPodcastsInput'
import SearchPodcastsResults from '../components/SearchPodcastsResults'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import { fetchPodcasts } from '../actions/fetchPodcasts'
import { updateSearchInput } from '../actions/updateSearchInput'
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
      <Container>
        <SearchPodcastsInput
          updateSearchInput={this.props.updateSearchInput}
          searchInput={this.props.searchInput}
          fetchPodcasts={this.props.fetchPodcasts}
          results={this.props.results}
          offset={this.props.offset}
        />
        {this.renderResults()}
        {this.renderPaginationContainer()}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchInput: (input) => dispatch(updateSearchInput(input)),
    fetchPodcasts: (input, offset) => dispatch(fetchPodcasts(input, offset))
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
