import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DepartureRow.css';

import LineTransitType from './LineTransitType';

/* ----------------- */
/*    EXPORTS        */
/* ----------------- */

class DepartureRow extends Component {
  render() {
    var cssDelayClass = 'isInTime'
    if (this.props.delay) {
      cssDelayClass = (this.props.delay.isDelayed ? 'isDelayed' : 'isInTime')
    }
    return (
      <tr className="departureRow">
          <td>
            <span className="departureTime">{this.props.departureTime}</span>
            <span className={"departureDelay " + cssDelayClass} >+{this.props.delay ? this.props.delay.time : "0"} </span></td>
          <LineTransitType
            departureLine={this.props.departureLine}
            departureTransitType={this.props.departureTransitType}
          />
          <td><span className="departureDirection">{this.props.departureDirection}</span></td>
      </tr>
    )
  }
}

DepartureRow.propTypes = {
  departureTime: PropTypes.string,
  delay:  PropTypes.shape({
    time: PropTypes.num,
    isDelayed: PropTypes.boolean
  }),
  departureLine: PropTypes.string,
  departureTransitType: PropTypes.string,
  departureDirection: PropTypes.string
}

export default DepartureRow