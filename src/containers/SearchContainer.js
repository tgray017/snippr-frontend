import React, { Component } from 'react'
import SearchInput from '../components/SearchInput'
import SearchResults from '../components/SearchResults'
import { connect } from 'react-redux'
import { fetchEpisodes } from '../actions/fetchEpisodes'

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
          fetchEpisodes={this.props.fetchEpisodes}
          results={this.props.results}
        />
        {this.renderResults()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEpisodes: (input) => dispatch(fetchEpisodes(input))
  }
}

const mapStateToProps = state => {
  return {
    results: state.podcasts.results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
