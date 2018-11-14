import React from 'react';
import { shallow } from 'enzyme';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render correctly', () => {
    shallow(<LoadingSpinner />);
  });
});