import React, { Component } from 'react'
import SearchInput from '../components/SearchInput'
import SearchResults from '../components/SearchResults'
import { connect } from 'react-redux'
import { fetchPodcasts } from '../actions/fetchPodcasts'

class SearchContainer extends Component {

  renderResults = () => this.props.results.map((result, idx) => {
    let date = new Date(result.pub_date_ms).toString()
    return (
      <SearchResults
        key={idx}
        podcastTitle={result.podcast_title_original}
        episodeTitle={result.title_original}
        audio={result.audio}
        airDate={date}
      />
    )
  })

  render() {
    this.renderResults()
    return (
      <div>
        <h2>Search!</h2>
        <SearchInput
          fetchPodcasts={this.props.fetchPodcasts}
          results={this.props.results}
        />
        {this.renderResults()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPodcasts: () => dispatch(fetchPodcasts())
  }
}

const mapStateToProps = state => {
  return {
    results: state.podcasts.results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
