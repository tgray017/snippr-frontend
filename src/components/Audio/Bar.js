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
      timeWidthClass: timeWidthClass,
      snipStartTime: null,
      snipStopTime: null
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
    e.preventDefault()
    if(e.target === this.barProgressKnob) {
      this.setState({
        ...this.state,
        dragElement: this.barProgressKnobContainer
      }, () => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    }
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
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

    if(this.stopSnipHandleContainer && handlePosition > this.stopSnipHandleContainer.offsetLeft) {
      this.stopSnipMouseMove(e)
    }

    let startSnipHandleTime

    if(handlePosition >= 0 && handlePosition <= timelineWidth) {
      this.startSnipHandleContainer.style.marginLeft = `${offsetRatio*100}%`
      startSnipHandleTime = this.props.audioLength*offsetRatio
      this.startSnipHandleTime.innerText = moment.duration(startSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if(handlePosition < 0) {
      this.startSnipHandleContainer.style.marginLeft = "0%"
      startSnipHandleTime = 0
      this.startSnipHandleTime.innerText = moment.duration(startSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if(handlePosition > timelineWidth) {
      this.startSnipHandleContainer.style.marginLeft = "100%"
      startSnipHandleTime = this.props.audioLength
      this.startSnipHandleTime.innerText = moment.duration(startSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }

    this.setState({
      ...this.state,
      snipStartTime: startSnipHandleTime
    })
  }

  stopSnipMouseMove = (e) => {
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

    if(this.startSnipHandleContainer && handlePosition < this.startSnipHandleContainer.offsetLeft) {
      this.startSnipMouseMove(e)
    }

    let stopSnipHandleTime

    if(handlePosition >= 0 && handlePosition <= timelineWidth) {
      this.stopSnipHandleContainer.style.marginLeft = `${offsetRatio*100}%`
      stopSnipHandleTime = this.props.audioLength*offsetRatio
      this.stopSnipHandleTime.innerText = moment.duration(stopSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if(handlePosition < 0) {
      this.stopSnipHandleContainer.style.marginLeft = "0%"
      stopSnipHandleTime = 0
      this.stopSnipHandleTime.innerText = moment.duration(stopSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }
    if(handlePosition > timelineWidth) {
      this.stopSnipHandleContainer.style.marginLeft = "100%"
      stopSnipHandleTime = this.props.audioLength
      this.stopSnipHandleTime.innerText = moment.duration(stopSnipHandleTime, 'seconds').format(this.state.timeFormat, {
        trim: false
      })
    }

    this.setState({
      ...this.state,
      snipStopTime: stopSnipHandleTime
    })
  }

  startSnipMouseDown = (e) => {
    e.preventDefault()
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

  stopSnipMouseDown = (e) => {
    e.preventDefault()
    if(e.target === this.stopSnipHandle) {
      this.setState({
        ...this.state,
        dragElement: this.stopSnipHandleContainer
      }, () => {
        window.addEventListener('mousemove', this.stopSnipMouseMove)
        window.addEventListener('mouseup', this.stopSnipMouseUp)
      })
    }
  }

  startSnipMouseUp = (e) => {
    window.removeEventListener('mousemove', this.startSnipMouseMove)
    window.removeEventListener('mouseup', this.startSnipMouseUp)
    if(this.state.snipStartTime || this.state.snipStartTime === 0) {
      this.props.setSnipStartTime(this.state.snipStartTime)
    }
    if(this.state.snipStopTime || this.state.snipStopTime === 0) {
      this.props.setSnipStopTime(this.state.snipStopTime)
    }
  }

  stopSnipMouseUp = (e) => {
    window.removeEventListener('mousemove', this.stopSnipMouseMove)
    window.removeEventListener('mouseup', this.stopSnipMouseUp)
    if(this.state.snipStartTime || this.state.snipStartTime === 0) {
      this.props.setSnipStartTime(this.state.snipStartTime)
    }
    if(this.state.snipStopTime || this.state.snipStopTime === 0) {
      this.props.setSnipStopTime(this.state.snipStopTime)
    }
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
    let offsetRatio = (this.props.snipStartTime/this.props.audioLength)*100

    if(this.props.snipping && (this.props.snipStartTime || this.props.snipStartTime === 0) && this.props.audioId === this.props.currentAudioId) {
      return (
        <div
          className="bar__snipping__knob__container"
          ref={(startSnipHandleContainer) => { this.startSnipHandleContainer = startSnipHandleContainer }}
          style={{
            marginLeft: `${offsetRatio}%`
          }}
        >
          <span
            className="bar__snip__start__knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            onMouseDown={this.startSnipMouseDown}
          >
          </span>
          <span
            className="bar__snip__start__knob__time"
            ref={(startSnipHandleTime) => { this.startSnipHandleTime = startSnipHandleTime }}
          >
          {moment.duration(this.props.snipStartTime, 'seconds').format(this.state.timeFormat, {
            trim: false
          })}
          </span>
        </div>
      )
    }
  }

  renderStopSnipKnob = () => {
    let offsetRatio = (this.props.snipStopTime/this.props.audioLength)*100

    if(this.props.snipping && (this.props.snipStopTime || this.props.snipStopTime === 0) && this.props.audioId === this.props.currentAudioId) {
      return (
        <div
          className="bar__snipping__knob__container"
          ref={(stopSnipHandleContainer) => { this.stopSnipHandleContainer = stopSnipHandleContainer }}
          style={{
            marginLeft: `${offsetRatio}%`
          }}
        >
          <span
            className="bar__snip__stop__knob"
            ref={(stopSnipHandle) => { this.stopSnipHandle = stopSnipHandle }}
            onMouseDown={this.stopSnipMouseDown}
          >
          </span>
          <span
            className="bar__snip__stop__knob__time"
            ref={(stopSnipHandleTime) => { this.stopSnipHandleTime = stopSnipHandleTime }}
          >
          {moment.duration(this.props.snipStopTime, 'seconds').format(this.state.timeFormat, {
            trim: false
          })}
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
          {this.renderStopSnipKnob()}
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
