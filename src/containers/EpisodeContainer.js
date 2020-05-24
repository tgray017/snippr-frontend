import React, { Component } from 'react'
import Episode from '../components/Episode'
import { connect } from 'react-redux'

class EpisodeContainer extends Component {

  render() {
    return (
      <Episode
        title={this.props.title}
        description={this.props.description.replace(/(<([^>]+)>)/ig,"")}
        airDate={this.props.airDate}
        audio={this.props.audio}
        audioLength={this.props.audioLength}
      />
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(EpisodeContainer)
