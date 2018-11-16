import React, { Component } from 'react';
import './FormLoadingSpinner.css';

class FormLoadingSpinner extends Component {
    render() {
        return (
                <i className="fa fa-spinner fa-pulse" id="loadingSpinner"></i>
            )
    }
}

export default FormLoadingSpinner