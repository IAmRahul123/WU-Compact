import {render} from '@testing-library/react-native';
import WishList from '../WishList';
import React from 'react';

describe('WishList', () => {
  it('should work correctly', () => {
    const {getByText} = render(<WishList />);
    expect(getByText('WishList')).toBeTruthy();
  });
});
