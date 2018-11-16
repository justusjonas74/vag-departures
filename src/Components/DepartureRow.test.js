import React from 'react';
import { shallow } from 'enzyme';

import DepartureRow from './DepartureRow';

describe('DepartureRow', () => {
  it('should render correctly', () => {
    shallow(<DepartureRow />);
  });
});