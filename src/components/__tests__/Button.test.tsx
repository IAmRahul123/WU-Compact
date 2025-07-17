import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly and with title', () => {
    const {getByTestId, getByText} = render(
      <Button handlePress={() => {}} title="Click Me" />,
    );
    expect(getByTestId('Button-test')).toBeTruthy();
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('handlePress called when clicked Once', () => {
    const handleClick = jest.fn();
    const {getByTestId} = render(
      <Button handlePress={handleClick} title="Click Me" />,
    );

    fireEvent.press(getByTestId('Button-test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
