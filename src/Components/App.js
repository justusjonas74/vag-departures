import React, { Component } from 'react';
import GithubCorner from 'react-github-corner';
import DepartureComponent from './DepartureComponent/DepartureComponent'

class App extends Component {
    render() {
        return (
            <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="contentContainer">
                <h2>Departure Board <small className="nowrap">for VAG Nürnberg</small> </h2>
                <DepartureComponent />
              </div>
            </div>
          </div>
    		</div>
    		<GithubCorner href="https://github.com/justusjonas74/vag-departures" size="60"/>
    	</div>
        )
    }
}


export default App;