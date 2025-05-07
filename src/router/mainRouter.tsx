import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Jobs from '../screens/jobs';
import Users from '../screens/users';
import UserDetail from '../screens/users/userDetail';
import {Alert, Pressable, View} from 'react-native';
import {AddCircle, Logout} from 'iconsax-react-native';
import AddUser from '../screens/users/addUser';
import UpdateUser from '../screens/users/updateUser';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const MainRouter: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const signout = () => {
    signOut(getAuth()).then(() => Alert.alert('user signed out'));
  };
  function onAuthStateChangeed(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), onAuthStateChangeed);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      {!user ? (
        <Stack.Group>
          <Stack.Screen name="Giriş Yap" component={SignIn} />
          <Stack.Screen name="Kayıt ol" component={SignUp} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={({navigation, route}) => ({
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Kullanıcı Ekle');
                    }}>
                    <AddCircle size="32" color="#37d67a" variant="Bold" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      signout();
                    }}>
                    <Logout size="32" color="#f47373" variant="Bold" />
                  </Pressable>
                </View>
              ),
            })}
            name="Users"
            component={Users}
          />

          <Stack.Screen name="UserDetail" component={UserDetail} />
          <Stack.Screen name="Kullanıcı Ekle" component={AddUser} />
          <Stack.Screen name="Meslekler" component={Jobs} />
          <Stack.Screen name="Kullanıcı Güncelle" component={UpdateUser} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainRouter;
