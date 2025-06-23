import {Button, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {navigate} from '../../utils/commonNavigationController';
import {toggleTheme} from '../../store/reducers/themeReducer';
import {useDispatch} from 'react-redux';
import {colors} from '../../config/themeManager';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const callApi = async () => {
    try {
      let data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      data = await data.json();
      console.log("DATAAAA",data)
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    callApi()
  }, [])
  
  return (
    <View>
      <Text
        style={{
          color: colors.background,
          fontSize: 20,
          backgroundColor: 'cyan',
        }}>
        {t('validation.email')}
      </Text>
      <Button title="GO" onPress={() => dispatch(toggleTheme())} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
