import React, { Component } from 'react';
import './FormLoadingSpinner.css';

class FormLoadingSpinner extends Component {
    render() {
        const isLoading = this.props.isLoading;
        if (isLoading) {
            return (
                <i className="fa fa-spinner fa-pulse" id="loadingSpinner"></i>
            )
        }
        else {
            return null
        }
    }
}

export default FormLoadingSpinner