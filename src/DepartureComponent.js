import React, { Component } from 'react';
import axios from 'axios';
import './DepartureComponent.css'

import LoadingSpinner from './LoadingSpinner'
import SearchStopField from './SearchStopField'
import DepartureTable from './DepartureTable'

class DepartureComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            //stop_id: 0,
            loadingDepartures: false
        };
        this.handleNewSelectedStop = this.handleNewSelectedStop.bind(this);
    }
    // TODO: LOGIC SHOULD BE MOVED TO THE DEPARTURE TABLE
    getDepartureArray(stop_id) {

        this.setState({
            loadingDepartures: true
        });

        axios({
                method: 'get',
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
                (error) => {
                    console.error(error);
                }
            );
    }

    handleNewSelectedStop(stop_id) {
        this.getDepartureArray(stop_id);
    }

    toggleButton() {
        this.setState(prevState => ({
            button: !prevState.button
        }));
    }

    render() {
        const departures = this.state.departures;
        return (
            <div className="departureComponent">
            <SearchStopField handleNewSelectedStop={this.handleNewSelectedStop} /> 
            <DepartureTable departures={departures}/>
            <LoadingSpinner show={this.state.loadingDepartures} />
          </div>
        )
    }
}

export default DepartureComponent;