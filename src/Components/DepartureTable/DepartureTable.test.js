import React from 'react';
import { shallow } from 'enzyme';

import DepartureTable from './DepartureTable';

describe('DepartureTable', () => {
  it('should render correctly', () => {
    shallow(<DepartureTable />);
  });
});