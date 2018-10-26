import React, { Component } from 'react';
import './LastStops.css';

function StopListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li className="list-inline-item"><button onClick={(e) => props.searchStop(e, props.stop.VGNKennung)} className="btn btn-outline-secondary btn-sm">{props.stop.Haltestellenname}</button></li>;
}

function StopList(props) {
  const lastStops = props.stops;
  const listItems = lastStops.map((stop) =>
    // Correct! Key should be specified inside the array.
    <StopListItem key={stop.VGNKennung.toString()}
              stop={stop}
              searchStop={props.searchStop}/>
  );
  return (
    <ul className="list-inline">
      {listItems}
    </ul>
  );
}



const formatOutput = (lastStops, searchStop) =>  {
      return (
         <div className="LastStopsContainer">
          <p>Your last searched stops:</p>
          <StopList stops={lastStops} searchStop={searchStop}/>
        </div>
      )
    }


class LastStops extends Component {
   
    
    render() {
      const lastStops = [...this.props.lastStops].reverse() //
     
      const output = lastStops.length > 0 ? formatOutput(lastStops,this.props.searchStop) : null
      return output
    }
}

export default LastStops;