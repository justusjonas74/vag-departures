import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DepartureTable.css';
import DepartureRow from '../DepartureRow/DepartureRow';
// var strftime = require('strftime');
import moment from 'moment'
// TODO: REPLACE strftime with moment.js!

/* ----------------- */
/*    Helper Methods */
/* ----------------- */
function convertHourMinute(value) {
  // const date = new Date(value);
  // const date = moment(value);
  // if (date) {
  //   return strftime('%H:%M', date);
  // }
  // else {
  //   return '?'
  // }
  return moment(value).format('HH:mm')
}

function checkDepartureDelay(datePlannedStr, dateRealStr) {
  const datePlanned = new Date(datePlannedStr),
    dateReal = new Date(dateRealStr);
  const delay = dateReal - datePlanned;
  var ONE_MINUTE = 60 * 1000; /* ms */
  if (delay < ONE_MINUTE) {
    return {
      isDelayed: false,
      time: 0
    }
  }
  else {
    const output = Math.floor(delay / ONE_MINUTE);
    return {
      isDelayed: true,
      time: output
    }
  }
}

/* ----------------- */
/*    EXPORTS        */
/* ----------------- */

class DepartureTable extends Component {
  // <i className="fa fa-map-marker" aria-hidden="true"></i>
  render() {
    const rows = [];
    const departures = this.props.departures ? this.props.departures : [];
    const stopName = this.props.Haltestellenname ? this.props.Haltestellenname : ""
    if (typeof departures !== 'undefined' && departures.length > 0) {
      departures.forEach((item, index) => {
        const delay = checkDepartureDelay(item.AbfahrtszeitSoll, item.AbfahrtszeitIst);
        rows.push(
          <tr className="departureRow" key={index}>
            <DepartureRow
              departureTime={convertHourMinute(item.AbfahrtszeitSoll)}
              delay={delay}
              departureDirection={item.Richtungstext}
              departureLine={item.Linienname}
              departureTransitType={item.Produkt}
              key={index}/>
          </tr>
        )
      })
      return (
        <div className="deapartureContainer">
            <div className='btn-toolbar pull-right'>
              <div className='btn-group'>
                <button type='button' onClick={this.props.newSearchButtonFn} className='btn btn-outline-secondary btn-sm'><i className="fa fa-search"></i> New Search</button>
              </div>
            </div>
            <h3>{stopName}</h3>
            <table className="table table-striped<">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Line</th>
                  <th>Direction</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
      )
    } else {
      return null
    }
  }
}

DepartureTable.propTypes = {
  departures: PropTypes.array,
  Haltestellenname: PropTypes.string,
  newSearchButtonFn: PropTypes.func 
}

export default DepartureTable