import MyTurboModule from '../../specs/MyTurboModule';

export const showSuccessToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'success');

export const showPendingToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'pending');

export const showErrorToast = (msg: string) =>
  MyTurboModule.showToast(msg, 'error');
