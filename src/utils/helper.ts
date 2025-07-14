import {NavigationState, PartialState, Route} from '@react-navigation/native';
import MyTurboModule from '../../specs/MyTurboModule';

export const showSuccessToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'success');

export const showPendingToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'pending');

export const showErrorToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'error');

//Find the screen/route Name, FOR NESTED Navigation also
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState> | undefined,
): string | null {
  console.log('IS IT CALLEDD');
  if (!state || typeof state.index !== 'number' || !state.routes?.length) {
    return null;
  }

  let currentRoute = state.routes[state.index];

  // Drill down recursively for nested navigators
  while (
    currentRoute &&
    'state' in currentRoute &&
    (currentRoute.state as NavigationState)?.index !== undefined
  ) {
    const nestedState = currentRoute.state as NavigationState;
    currentRoute = nestedState.routes[nestedState.index];
  }

  return currentRoute?.name ?? null;
}
