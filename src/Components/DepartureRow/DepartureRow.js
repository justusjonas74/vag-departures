import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DepartureRow.css';

import LineTransitType from '../LineTransitType/LineTransitType';

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
      <React.Fragment>
          <td>
            <span className="departureTime">{this.props.departureTime}</span>
            <span className={"departureDelay " + cssDelayClass} >+{this.props.delay ? this.props.delay.time : "0"}</span>
          </td>
          <td>
            <LineTransitType
              departureLine={this.props.departureLine}
              departureTransitType={this.props.departureTransitType}
            />
            </td>
          <td><span className="departureDirection">{this.props.departureDirection}</span></td>
      
      </React.Fragment>
    )
  }
}

DepartureRow.propTypes = {
  departureTime: PropTypes.string,
  delay:  PropTypes.shape({
    time: PropTypes.number,
    isDelayed: PropTypes.bool
  }),
  departureLine: PropTypes.string,
  departureTransitType: PropTypes.string,
  departureDirection: PropTypes.string
}

export default DepartureRow