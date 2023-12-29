import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Import the locally stored image
const communityLogo = require('./logo-2.png');

const Home = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image source={communityLogo} style={styles.logo} />
        <Text style={styles.description}>
          Welcome to Our Intra Social App. Join us to explore more.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Add an overlay to enhance text visibility
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Home;
