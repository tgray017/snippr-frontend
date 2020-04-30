import React, { Component } from 'react'
import SearchInput from '../components/SearchInput'
import SearchResults from '../components/SearchResults'
import { connect } from 'react-redux'
import { fetchPodcasts } from '../actions/fetchPodcasts'

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <h2>Search!</h2>
        <SearchInput
          fetchPodcasts={this.props.fetchPodcasts}
          results={this.props.results}
        />
        <SearchResults
          results={this.props.results}
        />
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
