import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './SearchStopField.css'
import FormLoadingSpinner from '../FormLoadingSpinner/FormLoadingSpinner'

/* ----------------- */
/*    Helper Methods */
/* ----------------- */

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ----------------- */
/*    Suggestions    */
/* ----------------- */

const renderInputComponent = inputProps => (
    <div className="input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
                <i className="fa fa-search"></i>
            </div>
        </div>
    <input {...inputProps} />
  </div>
)

const getSuggestionValue = suggestion => suggestion.Haltestellenname;

const renderSuggestion = suggestion => (
    <div>
    {suggestion.Haltestellenname}
  </div>
);

const shouldRenderSuggestions = value => value.trim().length > 2;

/* ----------------- */
/*    Exports        */
/* ----------------- */

class SearchStopField extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };
    }

    onSuggestionSelected = (event, { suggestion }) => {
        this.props.handleNewSelectedStop(suggestion.VGNKennung);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    getStopArray(term) {
        this.setState({
            isLoading: true
        });
        axios.get('https://start.vag.de/dm/api/haltestellen.json/vgn', {
                params: {
                    name: term,
                }
            })
            .then(
                (result) => {
                    this.setState({
                        suggestions: result.data.Haltestellen.slice(0, 15),
                        isLoading: false
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    getSuggestions(value) {
        const inputValue = escapeRegexCharacters(value.trim().toLowerCase());
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            this.setState({
                suggestions: []
            });
        }
        else {
            this.getStopArray(inputValue);
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions, isLoading } = this.state;
        const inputProps = {
            placeholder: 'Search for stops',
            value,
            className: 'form-control',
            onChange: this.onChange,
        };

        return (
            <div className="SearchStopField">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
          renderInputComponent={renderInputComponent}
        />
      { isLoading ? <FormLoadingSpinner /> : null}
      </div>
        );
    }
}

SearchStopField.props = {
    handleNewSelectedStop: PropTypes.func
}

export default SearchStopField