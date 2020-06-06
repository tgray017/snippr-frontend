import React, { Component } from 'react'
import moment from 'moment'
import '../../stylesheets/Audio.css'
var momentDurationFormatSetup = require('moment-duration-format')

export default class Bar extends Component {

  constructor(props) {
    super(props)
    let timeFormat
    let timeWidthClass
    if(props.audioLength >= 3600) {
      timeFormat = 'HH:mm:ss'
      timeWidthClass = 'lg'
    } else {
      timeFormat = 'mm:ss'
      timeWidthClass = 'sm'
    }

    this.state = {
      timeFormat: timeFormat,
      timeWidthClass: timeWidthClass
    }
  }

  mouseMove = e => {
    if(e.target.className !== "bar__snipping__knob") {
      let timelineWidth = this.timeline.offsetWidth
      let handleWidth = this.state.dragElement.getBoundingClientRect().width
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
        this.state.dragElement.style.marginLeft = `${offsetRatio*100}%`
      }
      if (handlePosition < 0) {
        this.state.dragElement.style.marginLeft = "0%"
      }
      if (handlePosition > timelineWidth) {
        this.state.dragElement.style.marginLeft = "100%"
      }
      this.props.handleTimeDrag(offsetRatio)
    }
  }

  mouseDown = (e) => {
    this.setState({
      ...this.state,
      dragElement: this.handle
    }, () => {
      this.props.handleKnobClick()
      window.addEventListener('mousemove', this.mouseMove)
      window.addEventListener('mouseup', this.mouseUp)
    })
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    this.props.handleMouseUp()
  }

  startSnipMouseMove = (e) => {
    let timelineWidth = this.timeline.offsetWidth
    let handleWidth = this.state.dragElement.getBoundingClientRect().width
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
      this.state.dragElement.style.marginLeft = `${offsetRatio*100}%`
      this.startSnipHandleTime.style.marginLeft = `${offsetRatio*100}%`
      this.startSnipHandleTime.innerText = moment.duration(this.props.audioLength*offsetRatio, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if (handlePosition < 0) {
      this.state.dragElement.style.marginLeft = "0%"
      this.startSnipHandleTime.style.marginLeft = "0%"
      this.startSnipHandleTime.innerText = moment.duration(0, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if (handlePosition > timelineWidth) {
      this.state.dragElement.style.marginLeft = "100%"
      this.startSnipHandleTime.style.marginLeft = "100%"
      this.startSnipHandleTime.innerText = moment.duration(this.props.audioLength, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
  }

  startSnipMouseDown = (e) => {
    this.setState({
      ...this.state,
      dragElement: this.startSnipHandle
    }, () => {
      window.addEventListener('mousemove', this.startSnipMouseMove)
      window.addEventListener('mouseup', this.startSnipMouseUp)
    })
  }

  startSnipMouseUp = (e) => {
    window.removeEventListener('mousemove', this.startSnipMouseMove)
    window.removeEventListener('mouseup', this.startSnipMouseUp)
  }

  renderStartSnipKnob = () => {
    if(true) {
      return (
        <div className="bar__snipping__knob__container"
          ref={(startSnipContainer) => {this.startSnipContainer = startSnipContainer}}
        >
          <span
            className="bar__snipping__knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            onMouseDown={this.startSnipMouseDown}
          >
          </span>
          <span
            className="bar__snipping__knob__time"
            ref={(startSnipHandleTime) => { this.startSnipHandleTime = startSnipHandleTime}}
          >
          {this.state.timeWidthClass === 'lg' ? '00:00:00' : '00:00'}
          </span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="bar">
        <span className={`bar__time ${this.state.timeWidthClass}`}>
          {moment.duration(this.props.timeFromStart, 'seconds').format(this.state.timeFormat, {
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
          {this.renderStartSnipKnob()}
        </div>
        <span className={`bar__time ${this.state.timeWidthClass}`}>
          {moment.duration(this.props.timeFromEnd, 'seconds').format(this.state.timeFormat, {
            trim: false
          })}
        </span>
      </div>
    )
  }

}
