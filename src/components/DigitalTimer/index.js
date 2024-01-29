import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {count: 25, minutes: 25, seconds: 0, running: false, paused: false}

  componentWillUnmount() {
    clearInterval(this.updateTime)
    this.setState({
      count: 25,
      running: false,
      minutes: 25,
      seconds: 0,
      paused: false,
    })
  }

  decrement = () => {
    const {running, paused} = this.state
    if (!running && !paused) {
      this.setState(prevState => {
        if (prevState.count > 0) {
          return {
            count: prevState.count - 1,
            minutes: prevState.count - 1,
            seconds: 0,
          }
        }
        return {count: prevState.count}
      })
    }
  }

  increment = () => {
    const {running, paused} = this.state
    if (!running && !paused) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        minutes: prevState.count + 1,
        seconds: 0,
      }))
    }
  }

  startTimer = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 1) {
      clearInterval(this.updateTime)
      this.setState({count: 25, running: false, minutes: 25, seconds: 0})
    }
    const totalSeconds = minutes * 60 - 1 + seconds
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    this.setState({seconds: s, minutes: m, running: true, paused: false})
  }

  onClickStartTimer = () => {
    this.updateTime = setInterval(this.startTimer, 1000)
  }

  onClickRestTimer = () => {
    clearInterval(this.updateTime)
    this.setState({
      count: 25,
      running: false,
      minutes: 25,
      seconds: 0,
      paused: false,
    })
  }

  onClickPauseTimer = () => {
    clearInterval(this.updateTime)
    this.setState({running: false, paused: true})
  }

  render() {
    const {count, running, minutes, seconds} = this.state

    const timer =
      seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`
    return (
      <div className="mainContainer">
        <h1 className="mainHeading">Digital Timer</h1>
        <div className="timerContainer">
          <div className="timer">
            <div className="timer-subContainer">
              <h1 className="time">{timer}</h1>
              <p className="paused-running">{running ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="subContainer">
            <div className="start-reset-container">
              <div className="start-container icon-container">
                <button
                  type="button"
                  className="start-reset-buttons text"
                  onClick={
                    running ? this.onClickPauseTimer : this.onClickStartTimer
                  }
                >
                  <img
                    src={
                      running
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
                    }
                    alt={running ? 'pause icon' : 'play icon'}
                    className="pause-icon icon"
                  />
                  <p className="display-text">{running ? ' Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="reset-container icon-container">
                <button
                  type="button"
                  className="start-reset-buttons text"
                  onClick={this.onClickRestTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png  "
                    alt="reset icon"
                    className="reset-icon icon"
                  />
                  <p className="display-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-timer">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                type="button"
                className="increment-decrement-button"
                onClick={this.decrement}
              >
                -
              </button>
              <p type="button" className="count-button">
                {count}
              </p>
              <button
                type="button"
                className="increment-decrement-button"
                onClick={this.increment}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
