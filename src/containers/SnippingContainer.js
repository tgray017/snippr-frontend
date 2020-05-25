import React, { Component } from 'react'
import { connect } from 'react-redux'
import snip from '../images/snip.png'
import { mdiContentCut } from '@mdi/js'

class SnippingContainer extends Component {

  render() {
    return (
      <div className="mt-3">
        <button>
          <img src={require('../images/snip.png')}></img>
        </button>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(SnippingContainer)
