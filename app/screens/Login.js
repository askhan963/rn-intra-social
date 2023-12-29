import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FirebaseAuth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import the locally stored image
const communityLogo = require('./logo-2.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }

    signInWithEmailAndPassword(FirebaseAuth, email, password)
      .then(userCredential => {
        // Signed in successfully
        const user = userCredential.user;
        navigation.navigate('MainApp');
        Alert.alert('Login Successful', `Welcome ${user.email}`);
      })
      .catch(error => {
        // Handle errors here
        const errorMessage = error.message;
        Alert.alert('Login Failed', errorMessage);
      });
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={communityLogo} style={styles.logo} />
        <Text style={styles.description}>Login to Your Account</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.desc}>Haven't registered yet?</Text>
          <Text style={styles.linkText}> Click here to register.</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor:'#4c669f',
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 10,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default Login;
