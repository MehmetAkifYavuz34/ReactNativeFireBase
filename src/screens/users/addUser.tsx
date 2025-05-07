import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddUser: React.FC = () => {
  const navigation = useNavigation();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState('serhat');
  const [surname, setSurname] = useState('ustek');
  const [email, setEmail] = useState('ahmet@test.com');
  const [age, setAge] = useState('34');
  const [city, setCity] = useState('ıstanbul');
  const [phone, setPhone] = useState('3532313242');
  const [language, setLanguage] = useState('tr');

  const handleNextStep = () => {
    const form = {
      name: name,
      surname: surname,
      email: email,
      age: age,
      city: city,
      phone: phone,
      language: language,
    };
    navigation.navigate('Meslekler', {form: form});
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
      <Button color={'green'} title="Devam et" onPress={handleNextStep} />
    </View>
  );
};

export default AddUser;

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
