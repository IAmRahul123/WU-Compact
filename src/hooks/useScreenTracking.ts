import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {logEvent} from '../utils/firebase';

//One way to use Analytics for system // OR We can use in Navigation centralized
const useScreenTracking = () => {
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      const name = route?.name || 'Unknown';
      logEvent('screen_view', {
        screen_name: name,
        screen_class: `${name}Screen`,
      });
    }, [route?.name]),
  );
};

export default useScreenTracking;
