import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ErrorBoundary from '../ErrorBoundary';
import {Text, View} from 'react-native';

describe('ErrorBoundary', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <ErrorBoundary>
        <Text>Correct Screen</Text>
      </ErrorBoundary>,
    );
    expect(getByText('Correct Screen')).toBeTruthy();
  });

  it('Show When Error Occurred', () => {
    const RenderError = () => {
      throw new Error('Error Occured');
    };
    const {getByText, queryByText} = render(
      <ErrorBoundary>
        <RenderError />
      </ErrorBoundary>,
    );
    expect(getByText('common.somethingWentWrong')).toBeTruthy();
    expect(getByText('common.tryAgain')).toBeTruthy();
    expect(queryByText('Correct Screen')).toBeNull(); //Not Visible
  });
});
