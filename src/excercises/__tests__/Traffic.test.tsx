import {render} from '@testing-library/react-native';
import Traffic from '../Traffic';
import React from 'react';

describe('Traffic', () => {
  it('render correctly', () => {
    expect(render(<Traffic />)).toBeTruthy();
  });
});
