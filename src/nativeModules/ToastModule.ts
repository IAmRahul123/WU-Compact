import {NativeModules} from 'react-native';

type StatusType = 'success' | 'error' | 'pending';

interface ToastModuleType {
  showToast(message: string, status: StatusType): void;
}

export const ToastModule: ToastModuleType = NativeModules.ToastModule;

export const showFirebaseError = (error: any) => {
  const cleanMessage =
    error?.message?.split('] ')?.[1] || 'Something went wrong';
  ToastModule.showToast(cleanMessage, 'error');
};
