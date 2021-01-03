import React, { Component } from 'react'
import moment from 'moment'
import '../../stylesheets/Audio.css'

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
    let timelineWidth = document.getElementById('audio-progress-bar').getBoundingClientRect().width
    let handlePosition = e.pageX - document.getElementById('audio-progress-bar').getBoundingClientRect().x

    let offsetRatio

    if(handlePosition/timelineWidth < 0) {
      offsetRatio = 0
    } else if (handlePosition/timelineWidth > 1) {
      offsetRatio = 1
    } else {
      offsetRatio = handlePosition/timelineWidth
    }

    if (handlePosition >= 0 && handlePosition <= timelineWidth) {
      this.barProgressKnobContainer.style.marginLeft = `${offsetRatio*100}%`
    }
    if (handlePosition < 0) {
      this.barProgressKnobContainer.style.marginLeft = "0%"
    }
    if (handlePosition > timelineWidth) {
      this.barProgressKnobContainer.style.marginLeft = "100%"
    }
    this.props.handleTimeDrag(offsetRatio)
  }

  mouseDown = (e) => {
    e.preventDefault()
    if(e.target === this.barProgressKnob) {
      window.addEventListener('mousemove', this.mouseMove)
      window.addEventListener('mouseup', this.mouseUp)
    }
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }

  startSnipMouseMove = (e) => {
    let episodeOffsetLeft = document.getElementById('current-audio-player').offsetLeft
    let timelineWidth = this.timeline.offsetWidth
    let handleWidth = this.startSnipHandleContainer.getBoundingClientRect().width

    let handlePosition = e.pageX - this.timeline.offsetLeft - episodeOffsetLeft - (handleWidth/2)
    timelineWidth = document.getElementById('audio-progress-bar').getBoundingClientRect().width
    handlePosition = e.pageX - document.getElementById('audio-progress-bar').getBoundingClientRect().x

    let offsetRatio

    if(handlePosition/timelineWidth < 0) {
      offsetRatio = 0
    } else if (handlePosition/timelineWidth > 1) {
      offsetRatio = 1
    } else {
      offsetRatio = handlePosition/timelineWidth
    }

    /* need 2 add in additional offset from handle width here */
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
    let episodeOffsetLeft = document.getElementById('current-audio-player').offsetLeft
    let timelineWidth = this.timeline.offsetWidth
    let handleWidth = this.stopSnipHandleContainer.getBoundingClientRect().width
    let handlePosition = e.pageX - this.timeline.offsetLeft - episodeOffsetLeft - (handleWidth/2)

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
      window.addEventListener('mousemove', this.startSnipMouseMove)
      window.addEventListener('mouseup', this.startSnipMouseUp)
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
    this.snippingKnobDrag = true
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
    this.snippingKnobDrag = true
  }

  stopSnipMouseDown = (e) => {
    e.preventDefault()
    if(e.target === this.stopSnipHandle) {
      window.addEventListener('mousemove', this.stopSnipMouseMove)
      window.addEventListener('mouseup', this.stopSnipMouseUp)
    }
  }

  timelineClick = (e) => {
    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    if (!this.snippingKnobDrag && e.target === this.timeline) {
      e.persist()
      this.mouseMove(e)
    }
    this.snippingKnobDrag = false
  }

  renderStartSnipKnob = () => {
    /* the problem is that state isn't updated when props are updated */
    /* so this.props.snipStartTime may be null after discarding snip */
    /* but this.state.snipStartTime is still a non-null value */
    /* need to update this.state.snipStartTime when new props are received */
    /* or is it vice versa? */
    let img = require('../../assets/images/icons/start-snip-knob.svg')

    let offsetRatio = (this.props.snipStartTime/this.props.audioLength)*100

    if(this.props.snipping && (this.props.snipStartTime || this.props.snipStartTime === 0)) {
      return (
        <div
          className="bar__snipping__knob__container"
          ref={(startSnipHandleContainer) => { this.startSnipHandleContainer = startSnipHandleContainer }}
          style={{
            marginLeft: `${offsetRatio}%`
          }}
        >

          {/*
          <span
            className="bar__snip__start__knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            onMouseDown={this.startSnipMouseDown}
          >
          </span>
          */}
          <input
            type="image"
            id="snip-start-knob"
            ref={(startSnipHandle) => { this.startSnipHandle = startSnipHandle }}
            src={img}
            alt="start snip knob"
            onMouseDown={this.startSnipMouseDown}
          />
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
    let img = require('../../assets/images/icons/stop-snip-knob.svg')
    let offsetRatio = (this.props.snipStopTime/this.props.audioLength)*100

    if(this.props.snipping && (this.props.snipStopTime || this.props.snipStopTime === 0)) {
      return (
        <div
          className="bar__snipping__knob__container"
          ref={(stopSnipHandleContainer) => { this.stopSnipHandleContainer = stopSnipHandleContainer }}
          style={{
            marginLeft: `${offsetRatio}%`
          }}
        >
          {/*
          <span
            className="bar__snip__stop__knob"
            ref={(stopSnipHandle) => { this.stopSnipHandle = stopSnipHandle }}
            onMouseDown={this.stopSnipMouseDown}
          >
          </span>
          */}


          <input
            type="image"
            id="snip-stop-knob"
            ref={(stopSnipHandle) => { this.stopSnipHandle = stopSnipHandle }}
            src={img}
            alt="stop snip knob"
            onMouseDown={this.stopSnipMouseDown}
          />


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
          id='audio-progress-bar'
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
            id='audio-progress-knob'
            className="bar__progress__knob lady-lips-gradient color-block-5 mx-auto rounded-circle z-depth-1-half"
            ref={(barProgressKnob) => { this.barProgressKnob = barProgressKnob }}
            onMouseDown={this.mouseDown}
          />
        </div>
          {this.renderStartSnipKnob()}
          {this.renderStopSnipKnob()}
        </div>
        <span className={`bar__time ${this.state.timeWidthClass}`}>
          -{moment.duration(this.props.timeFromEnd, 'seconds').format(this.state.timeFormat, {
            trim: false
          })}
        </span>
      </div>
    )
  }

}
