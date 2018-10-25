import React, { Component } from 'react';
import axios from 'axios';
import './DepartureComponent.css'

import LoadingSpinner from './LoadingSpinner'
import SearchStopField from './SearchStopField'
import DepartureTable from './DepartureTable'
import LastStops from './LastStops'

const fakeData = [{
        "Haltestellenname": "Am Bauernfeld (Nürnberg)",
        "VGNKennung": 1653
    },
    {
        "Haltestellenname": "Bauernfeindstr. (Nürnberg)",
        "VGNKennung": 1550
    }
]

class DepartureComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            //stop_id: 0,
            lastStops: fakeData,
            loadingDepartures: false
        };
        this.handleNewSelectedStop = this.handleNewSelectedStop.bind(this);
    }
    // TODO: LOGIC SHOULD BE MOVED TO THE DEPARTURE TABLE
    getDepartureArray(stop_id) {

        this.setState({
            departures: [],
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
                    const lastStop = {
                            "Haltestellenname": result.data.Haltestellenname,
                            "VGNKennung": result.data.VGNKennung
                        }
                    // ERROR! DID NOT WORK!
                    const updateStops = !this.state.lastStops.includes(lastStop)
                    console.log(updateStops)
                    this.setState((state, props) => ({
                        loadingDepartures: false,
                        departures: result.data.Abfahrten,
                        lastStops: updateStops ? [...state.lastStops, lastStop] : state.lastStops
                        }))
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
    
    handleSearchStop(e, id){
        e.preventDefault();
        this.getDepartureArray(id)
    }

    render() {
        const departures = this.state.departures;
        return (
            <div className="departureComponent">
            <SearchStopField handleNewSelectedStop={this.handleNewSelectedStop} />
            <LastStops lastStops={this.state.lastStops} searchStop={this.handleSearchStop.bind(this)} />
            <DepartureTable departures={departures}/>
            <LoadingSpinner show={this.state.loadingDepartures} />
          </div>
        )
    }
}

export default DepartureComponent;