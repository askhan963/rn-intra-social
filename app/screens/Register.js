import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { FirebaseApp, FirebaseAuth } from '../../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const firestore = getFirestore(FirebaseApp);

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('https://placekitten.com/640/360');

  const handleRegistration = async () => {
    if (!email || !password) {
      Alert.alert('Please enter email and password');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password,
      );

      await addDoc(collection(firestore, 'users'), {
        uid: userCredential.user.uid,
        name: name,
        age: age,
        gender: gender,
        phone: phone,
        email: email,
        photoURL: url,
      });

      await FirebaseAuth.signOut();
      navigation.navigate('Login');

      Alert.alert(
        'Registration Successful',
        'You can now login with your credentials.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.description}>Register Here</Text>
          <TextInput
            label="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <RNPickerSelect
            placeholder={{
              label: 'Select Gender',
              value: null,
            }}
            items={genders}
            onValueChange={(value) => setGender(value)}
            style={{
              ...pickerSelectStyles,
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            value={gender}
          />
          <TextInput
            label="Phone"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Image URL"
            style={styles.input}
            value={url}
            onChangeText={setUrl}
          />
          <TextInput
            label="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleRegistration}
          >
            Register
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.desc}>Already have an account?</Text>
            <Text style={styles.linkText}>Click here to login.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4c669f',
    padding: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 10,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
});

export default Register;
