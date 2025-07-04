import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Modal,
  Platform,
} from 'react-native';
import {colors} from '../config/themeManager';

interface AppLoaderProps {
  visible: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({visible}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : 40}
            color={colors.btn_bg}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 8,
  },
});
