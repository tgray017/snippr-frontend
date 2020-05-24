import React, { Component } from 'react'
import moment from 'moment'
import '../../stylesheets/Audio.css'
var momentDurationFormatSetup = require("moment-duration-format");



export default class Bar extends Component {

  constructor(props) {
    super(props)
    /*
    this.state = {
      timeFromStart: this.props.timeFromStart,
      timeFromEnd: this.props.timeFromEnd,
      offsetRatio: this.props.offsetRatio
    }
    */
  }
  /*
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }
  */

  mouseMove = e => {
    /*let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth*/
    let timelineWidth = this.timeline.offsetWidth
    let handleWidth = this.handle.getBoundingClientRect().width
    let handlePosition = e.pageX - this.timeline.offsetLeft - (handleWidth/2)
    /*let handleLeft = e.pageX - this.timeline.offsetLeft - (this.handle.getBoundingClientRect().width/2)*/

    let offsetRatio

    if(handlePosition/timelineWidth < 0) {
      offsetRatio = 0
    } else if (handlePosition/timelineWidth > 1) {
      offsetRatio = 1
    } else {
      offsetRatio = handlePosition/timelineWidth
    }
    console.log(offsetRatio)

    if (handlePosition >= 0 && handlePosition <= timelineWidth) {
      this.handle.style.marginLeft = `${offsetRatio*100}%`
    }
    if (handlePosition < 0) {
      /* this.handle.style.marginLeft = `${-((handleWidth/2)/timelineWidth)*100}%`*/
      this.handle.style.marginLeft = `0%`
    }
    if (handlePosition > timelineWidth) {
      this.handle.style.marginLeft = "100%"
    }

    this.props.handleTimeDrag(offsetRatio)
  }

  mouseDown = (e) => {
    this.props.handleKnobClick()
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
  }

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    this.props.handleMouseUp()
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
