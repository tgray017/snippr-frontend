import React, { Component } from 'react'
import Episode from '../components/Episode'
import { connect } from 'react-redux'

class EpisodeContainer extends Component {

  render() {
    console.log(this.props.description)
    return (
      <Episode
        title={this.props.title}
        description={this.props.description.replace(/(<([^>]+)>)/ig,"")}
        airDate={this.props.airDate}
        audio={this.props.audio}
      />
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(EpisodeContainer)
