import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {LoginCurve} from 'iconsax-react-native';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const [pending, setPending] = useState(false);

  const [email, setEmail] = useState('@');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setPending(true);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log(' signed in!');
        console.log('user sign in');
      })
      .catch(error => {
        console.log('hata', error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setPending(false));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
        <LoginCurve size={100} color="green" />
      </View>
      <Text style={{color: 'gray'}}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail bilgisi"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={{color: 'gray'}}>Şifre</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
      />

      <Button
        disabled={pending}
        color={'green'}
        title="Giriş Yap"
        onPress={handleLogin}
      />
      <Text style={{textAlign: 'center', margin: 20, fontSize: 16}}>
        Henüz bir hesabınız yok mu ?
      </Text>
      <Button
        color={'blue'}
        title="Kayıt Ol"
        onPress={() => navigation.navigate('Kayıt ol')}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: '85%',
    margin: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#D9E3F0',
    height: 40,
  },
});
