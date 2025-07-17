import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '../Card';
import {Text} from 'react-native';

describe('Card', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(
      <Card>
        <Text>Hii</Text>
      </Card>,
    );
    expect(getByTestId('Card-test')).toBeTruthy();
  });
  it('renders children correctly', () => {
    const {getByText} = render(
      <Card>
        <Text>Inside card</Text>
      </Card>,
    );
    expect(getByText('Inside card')).toBeTruthy();
  });
});
