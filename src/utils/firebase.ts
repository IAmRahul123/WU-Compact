import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

export const logAppOpened = () => analytics().logAppOpen();

export const logScreenView = (screenName: string, screenClass: string) => {
  analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenClass,
  });
};

export const logEvent = (eventName: string, params = {}) => {
  analytics().logEvent(eventName, params);
};

export const logError = (error: any, context = '') => {
  if (context) crashlytics().log(context);
  crashlytics().recordError(error);
};

export const setCustomKey = (key: string, value: string) => {
  crashlytics().setAttribute(key, value);
};

export const triggerCrash = () => crashlytics().crash();
