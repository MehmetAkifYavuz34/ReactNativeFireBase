import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/global/avatar';

const UserDetail: React.FC = ({route}) => {
  const [user, setUser] = useState<object>({});
  const [pending, setPending] = useState<boolean>(false);
  const userId = route.params.userId;
  const getUser = async () => {
    setPending(true);
    const users = await firestore().collection('Users').doc(userId).get();
    setUser(users.data());
    console.log(users);
    setPending(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      {pending ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar name={user.name} surname={user.surname} />
            <Text style={{fontSize: 20, color: 'black', marginTop: 10}}>
              {user.email}
            </Text>
          </View>
          <View style={{flex: 2, paddingHorizontal: 10}}>
            <Text style={{fontSize: 14, color: 'gray'}}>Name</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.name}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Surname</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.surname}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Age</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.age}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Phone</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.phone}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Email</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.email}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>City</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{user.city}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>Job</Text>
            <Text style={{fontSize: 20, color: 'black'}}>
              {user.job?.title}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
