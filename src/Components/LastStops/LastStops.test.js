import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LastStops from './LastStops';

describe('LastStops Component', () => {
  // BOILERPLATE
  let props;
  let mountedComponent;
  const lastStops = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <LastStops {...props} />
      );
    }
    return mountedComponent;
  }

  beforeEach(() => {
    props = {
      lastStops: null,
      searchStop: null
    };
    mountedComponent = undefined;
  });
  
  it('should render without errors', ()=>{
     shallow(<LastStops />);
  })
  it('it should always render correctly', () => {
       const tree = renderer
          .create(<LastStops {...props} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
  });
  
  it('should return null if no props are present', ()=>{
    const component = lastStops().html()
    expect(component).toBeNull()
  })
  
  describe('with empty array as props.lastStops', ()=>{
    beforeEach(()=>{
      props.lastStops = []
    })
    
    it('should return null', ()=>{
      const component = lastStops().html()
      expect(component).toBeNull()
    })
  }) 
  
  describe('with props',()=>{
    
    beforeEach(()=>{
      props.lastStops = [{"Haltestellenname":"Bauernfeindstr. (Nürnberg)","VGNKennung":1550},{"Haltestellenname":"Hauptbahnhof (Nürnberg)","VGNKennung":510},{"Haltestellenname":"Plärrer (Nürnberg)","VGNKennung":704}]
    })
    
    it('should render correctly', ()=>{
        const tree = renderer
          .create(<LastStops {...props} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it("always renders an unorderd div", () => {
      const component =  lastStops().find('div')
      expect(component.length).toEqual(1);
    });
     it("contains everything else that gets rendered", () => {
      const component = lastStops().find('div')
      const wrappingDiv = component.first();
      expect(wrappingDiv).toEqual(lastStops().children());
    });
    it('... with 3 li elements', ()=>{
      const listItems = lastStops().find('li')
      expect(listItems.length).toEqual(3)
    })
    
    it('... with 3 button elements', ()=>{
      const buttons = lastStops().find('button')
      expect(buttons.length).toEqual(3)
    })
    
    // TODO: test props.searchStop function
    
    describe('handle props.searchStop function correctly', ()=>{
      beforeEach(()=>{
        props.lastStops = [{"Haltestellenname":"Bauernfeindstr. (Nürnberg)","VGNKennung":1550}]

      })
      describe('Button', ()=>{
        it('should have a onClick function wich is equal to the mockFunction', ()=>{
          const mockFunction =  jest.fn()
          props.searchStop = mockFunction
          const component = lastStops()
          const button = component.find('button')
          button.simulate('click');
          expect(mockFunction.mock.calls.length).toEqual(1)
        })
        it('onClick should call the given function with stop id as param', ()=>{
          const mockFunction =  jest.fn((e,x)=>x)
          props.searchStop = mockFunction
          const component = lastStops()
          const button = component.find('button')
          button.simulate('click');
          expect(mockFunction.mock.results[0].value).toEqual(1550)
        })
      })
      
    })
  })
})

