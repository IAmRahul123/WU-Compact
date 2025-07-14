import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {colors} from '../../config/themeManager';
import fonts from '../../config/fonts';
import {spacing} from '../../utils/responsiveSpacing';
import {
  handleLogoutRequested,
  handleSignOut,
  selectProfileImage,
  setProfileImage,
} from '../../store/reducers/authReducer';
import {navigate} from '../../utils/commonNavigationController';
import {toggleTheme} from '../../store/reducers/themeReducer';
import {t} from 'i18next';
import config from '../../config/config.json';
import auth from '@react-native-firebase/auth';
import {showFirebaseError, ToastModule} from '../../nativeModules/ToastModule';
const Profile = () => {
  const dispatch = useDispatch();
  const profileImage = useSelector(selectProfileImage);
  const theme = useSelector((state: RootState) => state.theme.current);

  const handleImageSelect = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => openPicker('camera'),
      },
      {
        text: 'Gallery',
        onPress: () => openPicker('gallery'),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DevMart needs access to your camera.',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const openCamera = async (options: CameraOptions) => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.warn('Camera permission denied');
      return;
    }
    let res = await launchCamera(options);
    return res;
  };
  const openPicker = async (type: 'camera' | 'gallery') => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
      cameraType: 'back',
    };

    try {
      const result =
        type === 'camera'
          ? await openCamera(options)
          : await launchImageLibrary(options);

      if (result?.assets && result?.assets?.length > 0) {
        const base64 = result?.assets[0]?.base64;
        if (base64) {
          dispatch(setProfileImage(`data:image/jpeg;base64,${base64}`));
        }
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const handleToggleTheme = async () => {
    await dispatch(toggleTheme());
    navigate('Profile');
  };

  //use in saga and call it in apiclient axios
  const signOut = () => {
    dispatch(handleLogoutRequested());
  };
  const handleLogOut = () => {
    Alert.alert(t('common.logout'), t('common.alertLogout'), [
      {text: t('common.no'), onPress: () => {}},
      {text: t('common.yes'), onPress: signOut},
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleImageSelect}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.avatar} />
        ) : (
          <Icon name="user" size={60} color={colors.placeholder_grey} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          navigate('Orders');
        }}>
        <Text style={styles.sectionTitle}>{t('common.orders')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigate('Select Address', {goToPayment: false})}>
        <Text style={styles.sectionTitle}>{t('common.address')}</Text>
      </TouchableOpacity>

      {config.selectLanguage && (
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigate('Language', {postAuth: true})}>
          <Text style={styles.sectionTitle}>{t('common.selectLanguage')}</Text>
        </TouchableOpacity>
      )}

      {/* <TouchableOpacity style={styles.section} onPress={handleToggleTheme}>
        <Text style={styles.sectionTitle}>
          Toggle Theme: <Text>{theme.toLocaleUpperCase()}</Text>
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.section} onPress={handleLogOut}>
        <Text style={styles.sectionTitle}>{t('common.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(16),
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(32),
    borderWidth: 2,
    borderColor: colors.border_grey,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  section: {
    width: '100%',
    paddingVertical: spacing(12),
    borderBottomWidth: 1,
    borderColor: colors.border_grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...fonts.titleRegular,
    color: colors.textPrimary,
  },
});
