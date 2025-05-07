import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {convertFullName} from '../../utils/functions';
import Avatar from '../global/avatar';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Edit, Trash} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';

const UserItem: React.FC = ({item, handleDelete}) => {
  const navigation = useNavigation();
  const deleteUser = async job => {
    await firestore()
      .collection('Users')
      .doc(item.id)
      .delete()

      .then(() => {
        Alert.alert('Kullanıcı silindi');
      })
      .finally(() => {
        handleDelete();
      });
  };
  return (
    <Pressable
      onPress={() => navigation.navigate('UserDetail', {userId: item.id})}
      style={styles.container}>
      <View>
        <Avatar name={item.name} surname={item.surname} />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 0.5,
          flex: 1,
          borderColor: 'gray',
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 28}}>
          {convertFullName(item.name, item.surname)}
        </Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{item.email}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          minWidth: 60,
          justifyContent: 'space-around',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('Kullanıcı Güncelle', {userInfo: item});
          }}>
          <Edit size={20} color="blue" />
        </Pressable>
        <Pressable onPress={() => deleteUser()}>
          <Trash size={20} color="red" />
        </Pressable>
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

export default UserItem;
