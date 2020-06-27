import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { addSnipToLibrary } from '../actions/addSnipToLibrary'
import '../stylesheets/Audio.css'

class SnippingContainer extends Component {

  state = {
    clickNumber: 0
  }

  handleSnipClick = () => {
    /* the following condition is meant to handle the third click */
    if(this.props.snipping && this.props.snipStartTime && this.props.snipStopTime) {
      this.props.discardSnip()
      this.setState({
        clickNumber: 0
      })
    /* the following two conditions are meant to handle the second click */
    /* the first of the two conditions handles the case where the snipStart handle */
    /* is ahead of the current time, to prevent the stopSnip handle from appearing */
    /* before the startSnip handle */
    } else if (this.props.snipping && this.props.snipStartTime && this.props.currentTime < this.props.snipStartTime) {
      this.props.setSnipStopTime(this.props.snipStartTime)
      this.setState({
        clickNumber: 2
      })
    } else if (this.props.snipping) {
      this.props.setSnipStopTime(this.props.currentTime)
      this.setState({
        clickNumber: 2
      })
    /* the following condition is meant to handle the first click */
    } else {
      this.props.startSnipping()
      this.props.setSnipStartTime(this.props.currentTime)
      this.setState({
        clickNumber: 1
      })
    }
  }

  handleActionClick = (type) => {
    if(type === 'snip') {
      this.props.addSnipToLibrary(this.props.userId, this.props.audioUrl, this.props.src, this.props.snipStartTime, this.props.snipStopTime)
    }
  }

  renderActions = () => {
    let addSnipOption = (this.state.clickNumber === 0 || this.state.clickNumber === 1) ? true : false
    return (
      <>
        <Dropdown.Item eventKey="2"
          disabled={addSnipOption}
          onClick={() => this.handleActionClick('snip')}
        >
          Add selected snip to library
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">
          Add episode to library
        </Dropdown.Item>
      </>
    )
  }

  render() {
    let image
    if (this.state.clickNumber === 0) {
      image = require('../images/start-snip-icon.png')
    } else if (this.state.clickNumber === 1) {
      image = require('../images/stop-snip-icon.png')
    } else {
      image = require('../images/trash-can.png')
    }

    return (
      <div className="mt-3 snipping-container">
        <Button
           variant="outline-secondary"
           className="m-2 p-1 button-container"
           onClick={this.handleSnipClick}
        >
          <img className='button' src={`${image}`}></img>
        </Button>
        <DropdownButton
          drop="top"
          variant="outline-secondary"
          title={
            <img className='button-options' src={require('../images/menu.svg')}></img>
          }
          className="m-2 p-1 menu-options"
        >
          {this.renderActions()}
        </DropdownButton>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.session.user.id
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addSnipToLibrary: (userId, audioUrl, src, snipStartTime, snipStopTime) => dispatch(addSnipToLibrary(userId, audioUrl, src, snipStartTime, snipStopTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippingContainer)
