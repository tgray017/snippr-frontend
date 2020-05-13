import React, { Component } from 'react'
import PaginationComponent from '../components/PaginationComponent'
import { connect } from 'react-redux'

class PodcastContainer extends Component {

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastContainer)
