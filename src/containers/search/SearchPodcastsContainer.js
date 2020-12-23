import React, { Component } from 'react'
import SearchPodcastsInput from '../../components/search/SearchPodcastsInput'
import SearchPodcastsResults from '../../components/search/SearchPodcastsResults'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import { fetchPodcasts, updateSearchInput } from '../../actions/search'
import PaginationContainer from './PaginationContainer'

class SearchPodcastsContainer extends Component {

  renderResults = () => {
    if (this.props.results) {
      return (
        this.props.results.map((result, idx) => {
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
      )
    } else {
      return null
    }
  }

  renderPaginationContainer = () => {
    if(this.props.results && this.props.results.length !== 0) {
      return (
        <PaginationContainer paginationType={"podcasts"}/>
      )
    }
  }

  renderListenNotesLogo = () => {
      return (
        <div
          className="mb-4 text-center"
        >
          <img
            src={require('../../assets/images/logos/listen-notes-logo.png')}
            width='200'
            alt='listen-notes-logo'
          />
        </div>
      )
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
        {this.renderListenNotesLogo()}
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
