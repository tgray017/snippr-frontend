import React, { Component } from 'react'
import { PlayCircleFilled } from '@material-ui/icons'

export default class Play extends Component {

  handleClick = () => {
    console.log('hello')
  }

  render() {
    return (
      <button className="player__button" onClick={this.handleClick()}>
        <PlayCircleFilled />
      </button>
    )
  }

}
