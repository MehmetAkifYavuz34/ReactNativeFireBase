import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';

import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const JobItem: React.FC = ({item, form}) => {
  const navigation = useNavigation();
  const addUser = async job => {
    await firestore()
      .collection('Users')
      .add({
        name: form.name,
        surname: form.surname,
        email: form.email,
        age: form.age,
        city: form.city,
        phone: form.phone,
        language: form.language,
        job: job,
      })
      .then(() => {
        Alert.alert('User added!');
      })
      .finally(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Users'}],
          }),
        );
      });
  };
  return (
    <Pressable onPress={() => addUser(item)}>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 0.5,
          flex: 1,
          borderColor: 'gray',
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 28}}>{item.title}</Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{item.sub}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

export default JobItem;
