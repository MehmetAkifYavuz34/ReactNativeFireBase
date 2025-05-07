import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserItem from '../../components/users/userItem';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState<boolean>(false);
  const getUsers = async () => {
    setPending(true);
    const users = await firestore()
      .collection('Users')

      .get();
    const data = users.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUsers(data);
    setPending(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {pending ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 40}}>
                <Text>Henüz Kullanıcı eklenmedi</Text>
              </View>
            }
            data={users}
            renderItem={({item}) => (
              <UserItem item={item} handleDelete={() => getUsers()} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
});
