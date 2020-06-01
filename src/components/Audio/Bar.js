import React, { Component } from 'react'
import moment from 'moment'
import '../../stylesheets/Audio.css'
var momentDurationFormatSetup = require('moment-duration-format')

export default class Bar extends Component {

  state = {}

  mouseMove = e => {
    if(e.target.className === 'bar__progress') {
      let timelineWidth = this.timeline.offsetWidth
      let handleWidth = this.handle.getBoundingClientRect().width
      let handlePosition = e.pageX - this.timeline.offsetLeft - (handleWidth/2)

      let offsetRatio

      if(handlePosition/timelineWidth < 0) {
        offsetRatio = 0
      } else if (handlePosition/timelineWidth > 1) {
        offsetRatio = 1
      } else {
        offsetRatio = handlePosition/timelineWidth
      }

      if (handlePosition >= 0 && handlePosition <= timelineWidth) {
        this.handle.style.marginLeft = `${offsetRatio*100}%`
      }
      if (handlePosition < 0) {
        this.handle.style.marginLeft = "0%"
      }
      if (handlePosition > timelineWidth) {
        this.handle.style.marginLeft = "100%"
      }
      this.props.handleTimeDrag("playProgressKnob", offsetRatio)
    }
  }

  mouseDown = (e) => {
    this.props.handleKnobClick()
    if(e.target.className === "bar__progress__knob") {
      this.setState({
        ...this.state,
        dragElement: "playProgressKnob"
      }, () => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
        console.log(this.state)
        console.log(this.props.audioLength)
      })
    }
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    this.props.handleMouseUp()
  }

  startSnipMouseMove = (e) => {
    console.log(`startSnipMouseMove (prior to if statement): ${e.pageX}`)
    /*
    if(e.target.className === 'bar__snipping__knob') {
    */
      console.log(`startSnipMouseMove (within if statement): ${e.pageX}`)
      let timelineWidth = this.timeline.offsetWidth
      let handleWidth = this.startSnipHandle.getBoundingClientRect().width
      let handlePosition = e.pageX - this.timeline.offsetLeft - (handleWidth/2)

      console.log(handlePosition)

      let offsetRatio

      if(handlePosition/timelineWidth < 0) {
        offsetRatio = 0
      } else if (handlePosition/timelineWidth > 1) {
        offsetRatio = 1
      } else {
        offsetRatio = handlePosition/timelineWidth
      }

      console.log(offsetRatio)

      /*this.startSnipHandle.style.marginLeft = `${offsetRatio*100}%`*/

      this.props.handleTimeDrag("startSnipKnob", offsetRatio)
      /*
    }
    */
  }

  startSnipMouseDown = (e) => {
    console.log(`startSnipMouseDown: ${e.pageX}`)
    if(e.target.className === "bar__snipping__knob") {
      this.setState({
        ...this.state,
        dragElement: "startSnipKnob"
      }, () => {
        window.addEventListener('mousemove', this.startSnipMouseMove)
        window.addEventListener('mouseup', this.startSnipMouseUp)
        console.log(this.state)
      })
    }
  }

  startSnipMouseUp = (e) => {
    console.log(`startSnipMouseUp: ${e.pageX}`)
    window.removeEventListener('mousemove', this.startSnipMouseMove)
    window.removeEventListener('mouseup', this.startSnipMouseUp)
  }

  render() {
    let format
    let widthClass
    if(this.props.audioLength >= 3600) {
      format = 'HH:mm:ss'
      widthClass = 'lg'
    } else {
      format = 'mm:ss'
      widthClass = 'sm'
    }

    return (
      <div className="bar">
        <span className={`bar__time ${widthClass}`}>
          {moment.duration(this.props.timeFromStart, 'seconds').format(format, {
            trim: false
          })}
        </span>
        <div
          className="bar__progress"
          ref={(timeline) => { this.timeline = timeline }}
          onClick={this.mouseMove}
        >
          <span
            className="bar__progress__knob"
            ref={(handle) => { this.handle = handle }}
            onMouseDown={this.mouseDown}
            style={{
              marginLeft: `${this.props.offsetRatio}%`
            }}
          />

          <span
            className="bar__snipping__knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            style={{
              marginLeft: `${this.props.startSnipOffsetRatio}%`
            }}
            onMouseDown={this.startSnipMouseDown}
          />
        </div>
        <span className={`bar__time ${widthClass}`}>
          {moment.duration(this.props.timeFromEnd, 'seconds').format(format, {
            trim: false
          })}
        </span>
      </div>
    )
  }

}
