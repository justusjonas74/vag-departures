/* esversion: 6*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
var strftime = require('strftime');

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function convertHourMinute(value) {
  const date = new Date(value);
  if (date) {
    return strftime('%H:%M' , date);
  } else {
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
    } else {
      const output = Math.floor(delay/ONE_MINUTE);
      return {
          isDelayed: true,
          time: output
      }
    }

}

function styleTransitType(departureTransitType) {
  switch(departureTransitType.toLowerCase()) {
    case 'ubahn':
        return { cssClass: 'ubahn',
          symbolStr: 'fa-train'};
    case 'tram':
        return { cssClass: 'tram',
          symbolStr: 'fa-subway'};
    case 'bus':
      return { cssClass: 'bus',
        symbolStr: 'fa-bus'};
    default:
    return { cssClass: 'bus',
      symbolStr: 'fa-bus'};
  }
}

/* ----------------- */
/*    Suggestions    */
/* ----------------- */

const renderInputComponent = inputProps => (
  <div className="input-group">
    <div className="input-group-addon">
      <i className="fa fa-search"></i>
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

class SearchStopField extends React.Component {
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
    //Send id VGNKennung to Parrent console.log(suggestion);
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
          suggestions:  result.data.Haltestellen.slice(0,15),
          isLoading: false
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.error(error);
      }
    );
  }



  getSuggestions( value ) {
    const inputValue = escapeRegexCharacters(value.trim().toLowerCase());
    const inputLength = inputValue.length;

    // return inputLength === 0 ? [] : tempResponse.filter(haltestelle =>
    //   haltestelle.Haltestellenname.toLowerCase().slice(0, inputLength) === inputValue
    // );
    if (inputLength === 0) {
      this.setState({
        suggestions: []
      });
    } else {
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
      <div>
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
class LoadingSpinner extends React.Component {
  render () {
    const isLoading = this.props.isLoading;
    if (isLoading) {
      return (
        <i className="fa fa-spinner fa-pulse" id="loadingSpinner"></i>
      )
    } else {
      return null
    }
  }
}
/* ----------------- */
/*    logo    */
/* ----------------- */
// class Filler extends React.Component {
//   render () {
//     return (
//       <div><img src={this.props.url} alt={this.props.alt} className="img-fluid" id="headerImage"/></div>
//     )
//   }
// }
/* ----------------- */
/*    Departures    */
/* ----------------- */

class DepartureTable extends React.Component {

    render (){
      const rows = [];
      const departures = this.props.departures;

      departures.forEach( (item,index) =>{
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
      if ( departures.length < 1) {
        return null
      } else {
        return (
          <div className="deapartureContainer">
            <table className="table table-striped<">
              <thead>
                <th>Time</th>
                <th>Line</th>
                <th>Direction</th>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        )
      }

    }
}

class LineTransitTypeComponent extends React.Component {
  render (){
    const departureLine = this.props.departureLine,
          departureTransitType = this.props.departureTransitType;
    const typeStyles = styleTransitType(departureTransitType);

    return (
      <td>
        <span className="departureTransitType"><i className={'fa ' + typeStyles.symbolStr} aria-hidden="true"></i>
        <span className={'departureLine '+ typeStyles.cssClass}>{departureLine}</span></span>
      </td>
    )
  }
}

class DepartureRow extends React.Component {

    render (){
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

class DepartureComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      departures: [],
      //stop_id: 0,
      loadingDepartures: false
    };
    this.handleNewSelectedStop = this.handleNewSelectedStop.bind(this);
  }

  getDepartureArray(stop_id) {

    this.setState({
      loadingDepartures: true
    });

    axios({
      method:'get',
      baseURL: 'https://start.vag.de/dm/api/abfahrten.json/vgn',
      url: '/' + stop_id.toString(),
    })
    .then(
      (result) => {
        //SET state
        this.setState({
          loadingDepartures: false,
          departures: result.data.Abfahrten
        })
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.error(error);
      }
    );
  }

  handleNewSelectedStop(stop_id) {
    this.getDepartureArray(stop_id);
  }

  toggleButton (){
    this.setState(prevState => ({
      button: !prevState.button
    }));
  }


    render () {
      const departures = this.state.departures;
      return (
          <div className="departureComponent">
            <SearchStopField handleNewSelectedStop={this.handleNewSelectedStop} />
            <DepartureTable departures={departures}/>
            <LoadingSpinnerBig show={this.state.loadingDepartures} />
          </div>
        )
    }
}

class LoadingSpinnerBig extends React.Component {
  render () {
    const spinner = (
      <div className="LoadingSpinnerContainer">
        <i className="fa fa-3x fa-pulse fa-spinner" aria-hidden="true"></i>
        <span className="sr-only">Loading...</span>
      </div>
    );
    return (this.props.show ?  spinner : null);
  }
}

class App extends React.Component {
	render () {
		return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="contentContainer">
              <h2>Departure Monitor <small>for VAG Nürnberg</small> </h2>
              <DepartureComponent />
            </div>
          </div>
        </div>
  		</div>
    )
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
