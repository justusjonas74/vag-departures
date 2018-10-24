import React, { Component } from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
    render() {
        const spinner = (
            <div className="LoadingSpinnerContainer">
                <i className="fa fa-3x fa-pulse fa-spinner" aria-hidden="true"></i>
                <span className="sr-only">Loading...</span>
            </div>
        );
        return (this.props.show ? spinner : null);
    }
}

export default LoadingSpinner;