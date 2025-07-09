import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

export const errorRef = React.createRef<ErrorBoundary>();

ErrorUtils.setGlobalHandler(error => {
  console.log('Error GLOBAL', error);
  //   crashlytics().recordError(error);
  errorRef.current?.setState({hasError: true});
});
