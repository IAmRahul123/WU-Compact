import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Traffic = () => {
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  const config = [
    {color: 'red', time: 2000},
    {color: 'yellow', time: 1000},
    {color: 'green', time: 3000},
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let index = 0;

    const cycle = () => {
      setCurrentColor(config[index].color);
      timer = setTimeout(() => {
        index = (index + 1) % config.length;
        cycle();
      }, config[index].time);
    };
    timer = setTimeout(() => {
      cycle();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          height: 50,
          width: 50,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 25,
          backgroundColor: currentColor ? currentColor : '#fff',
        }}></View>
    </View>
  );
};

export default Traffic;

const styles = StyleSheet.create({});
