import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LineTransitType.css';

/* ----------------- */
/*    EXPORTS        */
/* ----------------- */

class LineTransitType extends Component {
  styleTransitType(departureTransitType) {
    const switchTerm = departureTransitType ? departureTransitType.toLowerCase() : ""
    switch (switchTerm) {
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
        <span className="departureTransitType">
          <i className={'fa ' + typeStyles.symbolStr} aria-hidden="true"></i>
          <span className={'departureLine '+ typeStyles.cssClass}>{departureLine}</span>
        </span>
    )
  }
}

LineTransitType.propTypes = {
  departureTransitType: PropTypes.string,
  departureLine: PropTypes.string
}

export default LineTransitType