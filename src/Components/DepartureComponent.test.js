import React from 'react';
import { shallow } from 'enzyme';

import DepartureComponent from './DepartureComponent';

describe('DepartureComponent', () => {
  it('should render correctly', () => {
    shallow(<DepartureComponent />);
  });
});