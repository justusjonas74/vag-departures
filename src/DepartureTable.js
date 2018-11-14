import React, { Component } from 'react';
import './DepartureTable.css';
var strftime = require('strftime');
// TODO: REPLACE strftime with moment.js!

/* ----------------- */
/*    Helper Methods */
/* ----------------- */
function convertHourMinute(value) {
  const date = new Date(value);
  if (date) {
    return strftime('%H:%M', date);
  }
  else {
    return '?'
  }
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
/*    SUB COMPONENTS */
/* ----------------- */
class LineTransitTypeComponent extends Component {
  styleTransitType(departureTransitType) {
    switch (departureTransitType.toLowerCase()) {
      case 'ubahn':
        return {
          cssClass: 'ubahn',
          symbolStr: 'fa-train'
        };
      case 'tram':
        return {
          cssClass: 'tram',
          symbolStr: 'fa-subway'
        };
      case 'bus':
        return {
          cssClass: 'bus',
          symbolStr: 'fa-bus'
        };
      default:
        return {
          cssClass: 'bus',
          symbolStr: 'fa-bus'
        };
    }
  }

  render() {
    const departureLine = this.props.departureLine
    const departureTransitType = this.props.departureTransitType;
    const typeStyles = this.styleTransitType(departureTransitType);

    return (
      <td>
        <span className="departureTransitType"><i className={'fa ' + typeStyles.symbolStr} aria-hidden="true"></i>
        <span className={'departureLine '+ typeStyles.cssClass}>{departureLine}</span></span>
      </td>
    )
  }
}


class DepartureRow extends Component {

  render() {
    return (
      <tr className="departureRow">
          <td>
            <span className="departureTime">{this.props.departureTime}</span>
            <span className={"departureDelay " + (this.props.delay.isDelayed ? 'isDelayed' : 'isInTime')} >+{this.props.delay.time} </span></td>
          <LineTransitTypeComponent
            departureLine={this.props.departureLine}
            departureTransitType={this.props.departureTransitType}
          />
          <td><span className="departureDirection">{this.props.departureDirection}</span></td>
      </tr>
    )
  }
}


/* ----------------- */
/*    EXPORTS        */
/* ----------------- */



class DepartureTable extends Component {
  // <i className="fa fa-map-marker" aria-hidden="true"></i>
  render() {
    const rows = [];
    const departures = this.props.departures;
    const stopName = this.props.Haltestellenname
    if (typeof departures !== 'undefined' && departures.length > 0) {
      departures.forEach((item, index) => {
        const delay = checkDepartureDelay(item.AbfahrtszeitSoll, item.AbfahrtszeitIst);
        rows.push(
          <DepartureRow
              departureTime={convertHourMinute(item.AbfahrtszeitSoll)}
              delay={delay}
              departureDirection={item.Richtungstext}
              departureLine={item.Linienname}
              departureTransitType={item.Produkt}
              key={index}/>
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

export default DepartureTable