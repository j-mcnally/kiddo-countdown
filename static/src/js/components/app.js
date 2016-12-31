import React from 'react';
import Countdown from './countdown'
import moment from 'moment'

export default class App extends React.Component {
  render() {
    let nowTime = moment()
    let endTime = moment("20160612")
    let remaining = nowTime.diff(endTime)

    let formatter = function(ms) {
      return moment.duration(ms).humanize(true)
    }

    return (
      <div className="container">
        <div className="content">
          <h1> Baby M will be here </h1>
          <h2>
            <Countdown initialTimeRemaining={remaining} formatFunc={formatter} />
          </h2>
        </div>
      </div>
    )
  }
}
