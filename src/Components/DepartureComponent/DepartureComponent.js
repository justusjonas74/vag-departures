import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage'
import './DepartureComponent.css'

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import SearchStopField from '../SearchStopField/SearchStopField'
import DepartureTable from '../DepartureTable/DepartureTable'
import LastStops from '../LastStops/LastStops'

const getIndexOfLastStopArrayItem = (stop, arr) => {
    return arr.findIndex(s => s.VGNKennung === stop.VGNKennung)
}

class DepartureComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            //stop_id: 0,
            actualStop: null,
            lastStops: [],
            loadingDepartures: false,
            showSearchStopField: true
        };
        this.handleNewSelectedStop = this.handleNewSelectedStop.bind(this);
    }
    // TODO: LOGIC SHOULD BE MOVED TO THE DEPARTURE TABLE

    componentDidMount() {
        this.setState({
            lastStops: ls.get('lastStops') || []
        });
    }

    addNewLastStopItemToState(lastStop) {
        this.setState(prevState => {
            // lastStop Element of prevState.lastStops ?
            const index = getIndexOfLastStopArrayItem(lastStop, prevState.lastStops)
            if (index >= 0) {
                prevState.lastStops.splice(index, 1)
            }
            else {
                if (prevState.lastStops.length > 2) { prevState.lastStops.shift() }
            }
            const returnValue = [...prevState.lastStops, lastStop]
            ls.set('lastStops', returnValue)
            return { lastStops: returnValue }
        });
    }

    getDepartureArray(stop_id) {
        this.setState({
            departures: [],
            loadingDepartures: true,
            showSearchStopField: false

        });
        axios({
                method: 'get',
                baseURL: 'https://start.vag.de/dm/api/abfahrten.json/vgn',
                url: '/' + stop_id.toString(),
            })
            .then(
                (result) => {

                    const lastStop = {
                        "Haltestellenname": result.data.Haltestellenname,
                        "VGNKennung": result.data.VGNKennung
                    }
                    this.setState({
                        loadingDepartures: false,
                        departures: result.data.Abfahrten,
                        actualStop: lastStop
                    })
                    this.addNewLastStopItemToState(lastStop)
                },
                (error) => { console.error(error); }
            );
    }

    handleNewSelectedStop(stop_id) {
        this.getDepartureArray(stop_id);
    }

    newSearchButtonClicked(e) {
        e.preventDefault();
        this.setState({
            showSearchStopField: true,
            departures: []
        })
    }

    handleSearchStop(e, id) {
        e.preventDefault();
        this.getDepartureArray(id)
    }

    render() {
        const departures = this.state.departures;
        const stopName = this.state.actualStop ? this.state.actualStop.Haltestellenname : ""
        return (
            <div className="departureComponent">
            { this.state.showSearchStopField ? <SearchStopField handleNewSelectedStop={this.handleNewSelectedStop} /> : null }
            { this.state.showSearchStopField ? <LastStops lastStops={this.state.lastStops} searchStop={this.handleSearchStop.bind(this)} /> : null }
            <DepartureTable departures={departures} Haltestellenname={stopName} newSearchButtonFn={this.newSearchButtonClicked.bind(this)}/>
            { this.state.loadingDepartures ? <LoadingSpinner /> : null}
          </div>
        )
    }
}

DepartureComponent.props = {
    
}

export default DepartureComponent;