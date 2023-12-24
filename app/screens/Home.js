import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {  useEffect } from 'react';
import { FirebaseAuth } from '../../firebaseConfig';  // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

const Home = ({ navigation }) => {
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, user => {
            if (user) {
                // User is signed in, navigate to MainApp
                navigation.navigate('MainApp');
            } else {
                // No user is signed in, stay on the Home screen
                // Optionally, navigate to the Login screen if you want immediate redirection
                 navigation.replace('Login');
            }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, [navigation]);


    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://png.pngtree.com/templates/20180813/community-organization-logo-design-template-png_28632.jpg' }} 
                style={styles.logo}
            />
            <Text style={styles.description}>
                Welcome to Our Intra Social App. Join us to explore more.
            </Text>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5', 
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
        color: '#000000', 
        fontWeight: "500"
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
