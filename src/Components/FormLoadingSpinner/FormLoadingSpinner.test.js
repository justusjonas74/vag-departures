import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


import FormLoadingSpinner from './FormLoadingSpinner';



describe('FormLoadingSpinner', () => {
  // UNIT TESTS 
  it('should render correctly', () => {
    shallow(<FormLoadingSpinner />);
  });
  
  it('renders correctly', () => {
    const tree = renderer
      .create(<FormLoadingSpinner />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


// SNAPSHOT TESTS

