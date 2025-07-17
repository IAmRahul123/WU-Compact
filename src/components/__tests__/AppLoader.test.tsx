import React from 'react';
import {render} from '@testing-library/react-native';
import AppLoader from '../AppLoader';

describe('AppLoader', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<AppLoader visible={true} />);
    expect(getByTestId('AppLoader-test')).toBeTruthy();
  });
});
