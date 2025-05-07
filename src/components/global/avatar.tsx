import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {getInitials} from '../../utils/functions';

const Avatar: React.FC = ({name, surname, size = 65}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Text style={{fontSize: 25}}>{getInitials(name, surname)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',
    backgroundColor: '#d9e3f0',

    borderRadius: 100,
  },
});
