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

  mouseDown = (e) => {
    if(e.target === this.barProgressKnob) {
      this.setState({
        ...this.state,
        dragElement: this.barProgressKnobContainer
      }, () => {
        /*this.props.handleKnobClick()*/
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    }
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    /*this.props.handleMouseUp()*/
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
      this.startSnipHandleTime.innerText = moment.duration(this.props.audioLength*offsetRatio, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if (handlePosition < 0) {
      this.state.dragElement.style.marginLeft = "0%"
      this.startSnipHandleTime.innerText = moment.duration(0, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if (handlePosition > timelineWidth) {
      this.state.dragElement.style.marginLeft = "100%"
      this.startSnipHandleTime.innerText = moment.duration(this.props.audioLength, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
  }

  startSnipMouseDown = (e) => {
    if(e.target === this.startSnipHandle) {
      this.setState({
        ...this.state,
        dragElement: this.startSnipHandleContainer
      }, () => {
        window.addEventListener('mousemove', this.startSnipMouseMove)
        window.addEventListener('mouseup', this.startSnipMouseUp)
      })
    }
  }

  startSnipMouseUp = (e) => {
    window.removeEventListener('mousemove', this.startSnipMouseMove)
    window.removeEventListener('mouseup', this.startSnipMouseUp)
  }

  timelineClick = (e) => {
    if(e.target === this.timeline) {
      e.persist()
      this.setState({
        ...this.state,
        dragElement: this.barProgressKnobContainer
      }, () => {
        this.mouseMove(e)
      })
    }
  }

  renderStartSnipKnob = () => {
    if(this.props.snipping && this.props.audioId === this.props.currentAudioId) {
      return (
        <div
          className="bar__snipping__knob__container"
          ref={(startSnipHandleContainer) => { this.startSnipHandleContainer = startSnipHandleContainer }}
        >
          <span
            className="bar__snipping__knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            onMouseDown={this.startSnipMouseDown}
          >
          </span>
          <span
            className="bar__snipping__knob__time"
            ref={(startSnipHandleTime) => { this.startSnipHandleTime = startSnipHandleTime }}
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
          onClick={this.timelineClick}
        >
        <div
          className="bar__progress__knob__container"
          ref={(barProgressKnobContainer) => { this.barProgressKnobContainer = barProgressKnobContainer }}
          style={{
            marginLeft: `${this.props.offsetRatio}%`
          }}
        >
          <span
            className="bar__progress__knob"
            ref={(barProgressKnob) => { this.barProgressKnob = barProgressKnob }}
            onMouseDown={this.mouseDown}
          />
        </div>
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
