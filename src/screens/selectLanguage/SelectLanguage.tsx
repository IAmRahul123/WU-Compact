import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import config from '../../config/config.json';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {setLanguage} from '../../store/reducers/configReducer';
import {colors} from '../../config/themeManager';
import fonts from '../../config/fonts';
import {t} from 'i18next';
import i18n from '../../config/countries/i18n';

const SelectLanguage = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.config.selectedLanguage,
  );

  const handleSelection = (lng: string) => {
    dispatch(setLanguage(lng));
    i18n.changeLanguage(lng);
  };
  console.log('SELEEE', selectedLanguage);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('SELECT_LANGUAGE')}</Text>
      <FlatList
        data={config.languages}
        keyExtractor={item => item.value}
        renderItem={({item}) => {
          const isSelected = item.value === selectedLanguage;
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
        }}
      />
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    ...fonts.titleLarge,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  languageItem: {
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 10,
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
