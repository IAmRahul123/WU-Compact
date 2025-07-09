import {Image, StyleSheet, Text, View} from 'react-native';
import Button from './Button';
import React from 'react';
import {colors} from '../config/themeManager';
import fonts from '../config/fonts';
import {spacing} from '../utils/responsiveSpacing';
import {t} from 'i18next';
import FastImage from 'react-native-fast-image';

class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({hasError: false});
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.center}>
          <FastImage
            source={require('../assets/error.gif')}
            style={{height: spacing(200), width: spacing(200)}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.text}>{t('common.somethingWentWrong')}</Text>
          <Button title={t('common.tryAgain')} handlePress={this.resetError} />
        </View>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

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
