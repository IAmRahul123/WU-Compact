// jest/renderWithProviders.tsx
import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native'; // ← you must import render
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from '../src/screens/Home/Home';

const mockStore = configureMockStore([]);

export function renderWithProviders(
  ui: React.ReactElement,
  {initialState = {}}: {initialState?: any} = {},
): RenderAPI & {store: ReturnType<typeof mockStore>} {
  const store = mockStore(initialState);
  console.log('RENDER UIIII', ui);
  const rendered = render(
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>,
  );

  return {
    ...rendered,
    store,
  };
}
