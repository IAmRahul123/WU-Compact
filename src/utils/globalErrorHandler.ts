import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import {logError} from './firebase';

export const errorRef = React.createRef<ErrorBoundary>();

ErrorUtils.setGlobalHandler(error => {
  console.log('Error GLOBAL', error);
  errorRef.current?.setState({hasError: true});
  logError(error, 'Error From Global Error Handler');
});
