import React, { Component } from 'react'
import PaginationComponent from '../components/PaginationComponent'
import { fetchPodcasts } from '../actions/fetchPodcasts'
import { updateOffset } from '../actions/updateOffset'
import { connect } from 'react-redux'

class PaginationContainer extends Component {

  render() {
    return (
      <PaginationComponent
        offset={this.props.offset}
        nextOffset={this.props.nextOffset}
        fetchPodcasts={this.props.fetchPodcasts}
        searchInput={this.props.searchInput}
        updateOffset={this.props.updateOffset}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    offset: state.podcasts.offset,
    nextOffset: state.podcasts.nextOffset,
    searchInput: state.podcasts.searchInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPodcasts: (input, offset) => dispatch(fetchPodcasts(input, offset)),
    updateOffset: (offset) => dispatch(updateOffset(offset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
