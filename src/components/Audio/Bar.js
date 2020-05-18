import React, { Component } from 'react'
import moment from 'moment'
import '../../stylesheets/Audio.css'


export default class Bar extends Component {
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

  render() {
    return (
      <div className="bar">
        <span className="bar__time">00:00</span>
        <div
          className="bar__progress"
          onMouseDown={e => console.log(e)}
        >
          <span
            className="bar__progress__knob"
            style={{ left: `${10}%` }}
          />
        </div>
        <span className="bar__time">10:12</span>
      </div>
    )
  }

}
