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

// const arraymove = (arr, fromIndex, toIndex = null) => {
//     toIndex = toIndex || arr.length - 1 
//     var element = arr[fromIndex];
//     arr.splice(fromIndex, 1);
//     arr.splice(toIndex, 0, element);
// }

const getIndexOfLastStopArrayItem = (stop,arr) => {
   return arr.findIndex(s => s.VGNKennung === stop.VGNKennung)
}

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
    
    addNewLastStopItemToState(lastStop) {
       this.setState(prevState => {
           // lastStop Element of prevState.lastStops ?
           const index = getIndexOfLastStopArrayItem(lastStop, prevState.lastStops)
           if (index >= 0) {
              prevState.lastStops.splice(index, 1)
           } else {
              if (prevState.lastStops.length > 2) { prevState.lastStops.shift()}
           }
           return {lastStops : [...prevState.lastStops, lastStop]} 
       });
    }

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
                    this.setState({
                        loadingDepartures: false,
                        departures: result.data.Abfahrten,
                    })
                    const lastStop = {
                        "Haltestellenname": result.data.Haltestellenname,
                        "VGNKennung": result.data.VGNKennung
                    }
                    this.addNewLastStopItemToState(lastStop)

                },
                (error) => {
                    console.error(error);
                }
            );
    }

    handleNewSelectedStop(stop_id) {
        this.getDepartureArray(stop_id);
    }

    // toggleButton() {
    //     this.setState(prevState => ({
    //         button: !prevState.button
    //     }));
    // }

    handleSearchStop(e, id) {
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