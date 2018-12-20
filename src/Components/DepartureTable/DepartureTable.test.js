import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import DepartureTable from './DepartureTable';


const response = {
  "Metadata": {
    "Version": "Puls-API-v1.1",
    "Timestamp": "2018-11-16T13:07:09+01:00"
  },
  "Haltestellenname": "Bauernfeindstr. (Nürnberg)",
  "VAGKennung": "BAUERN,BA",
  "VGNKennung": 1550,
  "Abfahrten": [{
    "Linienname": "U1",
    "Haltepunkt": "BA:2",
    "Richtung": "Richtung1",
    "Richtungstext": "Langwasser Süd",
    "AbfahrtszeitSoll": "2018-11-16T13:11:29+01:00",
    "AbfahrtszeitIst": "2018-11-16T13:11:29+01:00",
    "Produkt": "UBahn",
    "Longitude": 11.10790611,
    "Latitude": 49.41769389,
    "Fahrtnummer": 1005407,
    "Fahrtartnummer": 1,
    "Prognose": false
  }, {
    "Linienname": "U1",
    "Haltepunkt": "BA:1",
    "Richtung": "Richtung2",
    "Richtungstext": "Fürth Hardhöhe",
    "AbfahrtszeitSoll": "2018-11-16T13:12:07+01:00",
    "AbfahrtszeitIst": "2018-11-16T13:12:07+01:00",
    "Produkt": "UBahn",
    "Longitude": 11.10790611,
    "Latitude": 49.41769389,
    "Fahrtnummer": 1005744,
    "Fahrtartnummer": 1,
    "Prognose": false
  }, {
    "Linienname": "93",
    "Haltepunkt": "BAUERN:6",
    "Richtung": "Richtung1",
    "Richtungstext": "Kornburg",
    "AbfahrtszeitSoll": "2018-11-16T13:16:00+01:00",
    "AbfahrtszeitIst": "2018-11-16T13:16:00+01:00",
    "Produkt": "Bus",
    "Longitude": 11.10790611,
    "Latitude": 49.41769389,
    "Fahrtnummer": 2039443,
    "Fahrtartnummer": 1,
    "Fahrzeugnummer": "551",
    "Prognose": true
  }]
}
describe('DepartureTable Component', () => {
  
  // BOILERPLATE
  let props;
  let mountedComponent;
  const departureTable = () => {
    if (!mountedComponent) {
      // mountedComponent = mount(
      mountedComponent = mount(
        <DepartureTable {...props} />
      );
    }
    return mountedComponent;
  }

  beforeEach(() => {
    props = {
      departures: null,
      Haltestellenname: null,
      newSearchButtonFn: null 
    };
    mountedComponent = undefined;
  });
  
  it('should return nothing, if props.departures is null', ()=>{
    const component = departureTable().html()
    
    // const component = shallow(<DepartureTable {...props} />)
    // expect(component.get(0)).toBeFalsy()
    expect(component).toBeNull();
  })
  
  describe('with props', () => {
    beforeEach(()=>{
      props.departures = response.Abfahrten
      props.Haltestellenname = response.Haltestellenname
    })
    
    it('should render correctly', () => {
       const tree = renderer
        .create(<DepartureTable {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    
  })
  
})




// TEST DATA

