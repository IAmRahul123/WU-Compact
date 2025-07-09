import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {spacing} from '../../utils/responsiveSpacing';
import Button from '../../components/Button';
import {t} from 'i18next';
import {reset} from '../../utils/commonNavigationController';
import {colors} from '../../config/themeManager';
import fonts from '../../config/fonts';
import {height, width} from '../../constants/Constants';

const Payment = () => {
  const navigateBack = () => {
    reset('Home');
  };
  return (
    <View style={styles.center}>
      <FastImage
        source={require('../../assets/successfulPurchase.gif')}
        style={{height: height / 2, width: width / 1.2}}
        resizeMode={FastImage.resizeMode.contain}
      />
      {/* <Text>Payment</Text> */}
      <View style={{flexDirection: 'row'}}>
        <Button
          title={t('common.goBack')}
          handlePress={navigateBack}
          btnStyle={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(20),
  },
  text: {
    ...fonts.textMedium,
    color: colors.textPrimary,
    marginBottom: spacing(12),
    textAlign: 'center',
  },
});
