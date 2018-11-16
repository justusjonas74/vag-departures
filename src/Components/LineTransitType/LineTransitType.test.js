import React from 'react';
import { shallow, mount } from 'enzyme';
import LineTransitType from './LineTransitType';

describe('LineTransitType', () => {
  let props;
  let mountedLineTransitType;
  const lineTransitType = () => {
    if (!mountedLineTransitType) {
      mountedLineTransitType = mount(
        <LineTransitType {...props} />
      );
    }
    return mountedLineTransitType;
  }

  beforeEach(() => {
    props = {
      departureLine: undefined,
      departureTransitType: undefined
    };
    mountedLineTransitType = undefined;
  });

  // UNIT TESTS
  it('should render correctly  without props', () => {
    shallow(<LineTransitType />);
  });
  it("always renders a span", () => {
    const spans = lineTransitType().find("span");
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });
  describe("the rendered span", () => {
    it("contains everything else that gets rendered", () => {
      const spans = lineTransitType().find("span");
      const wrappingSpan = spans.first();
      expect(wrappingSpan).toEqual(lineTransitType().children());
    });
  });
  describe("when props are defined", () =>{
    describe("should render bus correctly", ()=>{
      beforeEach(()=>{
        props.departureLine = "68"
        props.departureTransitType = "Bus"
      })
      it('should render the correct line name', ()=>{
        const mountedLineTransitType = lineTransitType()
        const span = mountedLineTransitType.find('.departureLine')
        // console.log('SPAN: ' + span.text())
        expect(span.text()).toEqual('68')
      })
      it('should render a correct symbol', ()=>{
        const mountedLineTransitType = lineTransitType()
        const iElement = mountedLineTransitType.find("i.fa")
        expect(iElement.hasClass("fa-bus")).toEqual(true)
      })
      
    })
    describe("should render tram correctly", ()=>{
      beforeEach(()=>{
        props.departureLine = "68"
        props.departureTransitType = "Tram"
      })
      it('should render a correct symbol', ()=>{
        const mountedLineTransitType = lineTransitType()
        const iElement = mountedLineTransitType.find("i.fa")
        expect(iElement.hasClass("fa-subway")).toEqual(true)
      })
      
    })
    describe("should render ubahn correctly", ()=>{
      beforeEach(()=>{
        props.departureLine = "68"
        props.departureTransitType = "UBahn"
      })
      it('should render the correct line name', ()=>{
        const mountedLineTransitType = lineTransitType()
        const span = mountedLineTransitType.find('.departureLine')
        // console.log('SPAN: ' + span.text())
        expect(span.text()).toEqual('68')
      })
      it('should render a correct symbol', ()=>{
        const mountedLineTransitType = lineTransitType()
        const iElement = mountedLineTransitType.find("i.fa")
        expect(iElement.hasClass("fa-train")).toEqual(true)
      })
      
    })
  })
  // SNAPSHOT TESTS
  
});



//TEST DATA
// <LineTransitType
//             departureLine={this.props.departureLine}
//             departureTransitType={this.props.departureTransitType}
//           />
