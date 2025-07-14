import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import config from '../../config/config.json';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {setLanguage} from '../../store/reducers/configReducer';
import {colors} from '../../config/themeManager';
import fonts from '../../config/fonts';
import {t} from 'i18next';
import i18n from '../../config/countries/i18n';
import Button from '../../components/Button';
import {goBack, navigate, reset} from '../../utils/commonNavigationController';
import {padding, spacing} from '../../utils/responsiveSpacing';
import {useRoute} from '@react-navigation/native';
import {logError, logEvent} from '../../utils/firebase';
import useScreenTracking from '../../hooks/useScreenTracking';
import {EVENTS} from '../../constants/analyticsConstants';

interface LabelOptions {
  value: string;
  label: string;
}
const SelectLanguage: React.FC = () => {
  const dispatch = useDispatch();
  const routes: any = useRoute()?.params;
  const selectedLanguage = useSelector(
    (state: RootState) => state.config.selectedLanguage,
  );
  const [selected, setSelected] = useState<string>(selectedLanguage);

  const handleSelection = (lng: string) => {
    setSelected(lng);
  };

  const handleSubmit = () => {
    try {
      dispatch(setLanguage(selected));
      i18n.changeLanguage(selected);
      logEvent(EVENTS.LANGUAGE_SELECTED, {language: selected});
      if (routes?.postAuth) {
        navigate('Home', {screen: 'Profile'});
      } else {
        reset('SignIn');
      }
    } catch (error) {
      logError(error, 'Language change failed in SelectLanguage screen');
    }
  };

  const renderItem = useCallback(
    ({item}: {item: LabelOptions}) => {
      const isSelected = item.value === selected;
      return (
        <TouchableOpacity
          style={[
            styles.languageItem,
            isSelected && styles.selectedLanguageItem,
          ]}
          onPress={() => handleSelection(item.value)}>
          <Text
            style={[
              styles.languageText,
              isSelected && styles.selectedLanguageText,
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [selected],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={config.languages}
        keyExtractor={item => item.value}
        ListHeaderComponent={
          <Text style={styles.header}>{t('common.selectLanguage')}</Text>
        }
        renderItem={renderItem}
      />
      <Button handlePress={handleSubmit} title={t('common.select')} />
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    ...padding(16),
  },
  header: {
    ...fonts.titleLarge,
    color: colors.textPrimary,
    marginBottom: spacing(12),
  },
  languageItem: {
    ...padding(12),
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing(10),
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border_grey,
    overflow: 'hidden',
  },
  selectedLanguageItem: {
    backgroundColor: colors.btn_bg,
    borderColor: colors.btn_bg,
  },
  languageText: {
    color: colors.textPrimary,
    ...fonts.textMedium,
  },
  selectedLanguageText: {
    color: colors.textSelected,
    ...fonts.titleMedium,
  },
});
