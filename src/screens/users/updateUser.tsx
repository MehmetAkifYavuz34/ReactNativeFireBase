import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {CommonActions, useNavigation} from '@react-navigation/native';

const UpdateUser: React.FC = ({route}) => {
  const navigation = useNavigation();
  const userInfo = route.params.userInfo;
  const [pending, setPending] = useState(false);
  const [name, setName] = useState(userInfo.name);
  const [surname, setSurname] = useState(userInfo.surname);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(String(userInfo.age));
  const [city, setCity] = useState(userInfo.city);
  const [phone, setPhone] = useState(userInfo.phone);
  const [language, setLanguage] = useState('');

  const updateUser = async () => {
    await firestore()
      .collection('Users')
      .doc(userInfo.id)
      .update({
        name: name,
        surname: surname,
        email: email,
        age: Number(age),
        city: city,
        phone: phone,
        language: language,
        job: userInfo?.job,
      })
      .then(() => {
        Alert.alert('Kullanıcı güncellendi');
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
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı bilgileri </Text>
      <TextInput
        style={styles.input}
        placeholder="ad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Soyad"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="yaş"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="şehir"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="telefon bilgisi"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
      />
      <Button color={'green'} title="Güncelle" onPress={updateUser} />
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
