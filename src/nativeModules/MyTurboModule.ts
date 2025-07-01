import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  showToast(message: string, status: 'success' | 'pending' | 'error'): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MyTurboModule');
