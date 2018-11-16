import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import DepartureRow from './DepartureRow';
import LineTransitType from '../LineTransitType/LineTransitType';

describe('DepartureRow Component', () => {
  
  // BOILERPLATE
  let props;
  let mountedComponent;
  const departureRow = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <DepartureRow {...props} />
      );
    }
    return mountedComponent;
  }

  beforeEach(() => {
    props = {
      departureTime: null,
      delay:  null,
      departureLine: null,
      departureTransitType: null,
      departureDirection: null
    };
    mountedComponent = undefined;
  });
  
  // TESTS
  it('should render correctly', () => {
    shallow(<DepartureRow />);
  });
  it("always renders a table cells", () => {
    const element = departureRow().find("td");
    expect(element.length).toBeGreaterThanOrEqual(1);
  });
  describe("the rendered table row", () => {
    // it("contains everything else that gets rendered", () => {
    //   const elements = departureRow().find("tr");
    //   const wrapper = elements.first();
    //   expect(wrapper).toEqual(departureRow().children());
    // });
    it('always includes one child of LineTransitType', ()=>{
      const elements = departureRow().find(LineTransitType);
      expect(elements.length).toEqual(1)
    })
    //SNAPSHOT
    it('renders correctly', () => {
       const tree = renderer
        .create(<DepartureRow {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('should handle delayed trips correctly', ()=>{
    beforeEach(()=>{
      props.delay= {
        isDelayed:true,
        time: 12
      }
    })
    it('should apply special format', ()=>{
      const element = departureRow().find('.departureDelay')
      expect(element.hasClass('isDelayed')).toEqual(true)
    })
    it('should display the time difference correctly', ()=>{
      const element = departureRow().find('.departureDelay')
      expect(element.text()).toEqual('+12')
    })
  })
  describe('should handle non delayed trips correctly', ()=>{
    beforeEach(()=>{
      props.delay= {
        isDelayed:false,
        time: 0
      }
    })
    it('should apply special format', ()=>{
      const element = departureRow().find('.departureDelay')
      expect(element.hasClass('isInTime')).toEqual(true)
    })
    it('should display the time difference correctly', ()=>{
      const element = departureRow().find('.departureDelay')
      expect(element.text()).toEqual('+0')
    })
  })
  describe('should render correctly with all props', ()=>{
    beforeEach(()=>{
      props.departureTime = "12:12"
      props.departureLine = "U1"
      props.departureTransitType = "UBahn"
      props.departureDirection = "Langwasser"
      props.delay= {
        isDelayed:false,
        time: 0
      }
    })
    
    it('should display correct time', ()=>{
      const element = departureRow()
      const time = element.find('.departureTime').text()
      expect(time).toEqual('12:12')
    })
    it('should display correct direction', ()=>{
      const element = departureRow()
      const direction = element.find('.departureDirection').text()
      expect(direction).toEqual('Langwasser')
    })
  })
})