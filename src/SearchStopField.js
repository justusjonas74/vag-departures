import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './SearchStopField.css'
import LoadingSpinner from './LoadingSpinner.js'

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

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };
        // this.onSuggestionSelected = this.onSuggestionSelected.bind(this) ????
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

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions, isLoading } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search for stops',
            value,
            className: 'form-control',
            onChange: this.onChange,
        };


        //
        // Finally, render it!
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
      <LoadingSpinner isLoading={isLoading} />
      </div>
        );
    }
}

export default SearchStopField