import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FirebaseApp, FirebaseAuth } from '../../firebaseConfig'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import RNPickerSelect from 'react-native-picker-select';
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
            Alert.alert("Please enter email and password");
            return;
        }
    
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            
            // Add additional user details to Firestore
            await addDoc(collection(firestore, "users"), {
                uid: userCredential.user.uid,
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                email: email,
                photoURL: url
            });
            
            // Sign out the user immediately after registration
            await FirebaseAuth.signOut();
            navigation.navigate('Login')
    
            // Show the alert and navigate to Login on the OK button press
            Alert.alert(
                "Registration Successful",
                "You can now login with your credentials.",
                [
                    { text: "OK", onPress: () => navigation.navigate('Login') }
                ]
            );
        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        }
    };
    
    
    
    
   
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.description}>
                Register Here
            </Text>
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Age"
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
                    inputAndroid: styles.input,
                    inputIOS: styles.input,
                }}
                value={gender}
            />
            <TextInput
                placeholder="Phone"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
             <TextInput
                placeholder="image url"
                style={styles.input}
                value={url}
                onChangeText={setUrl}
                
            />
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

            <TouchableOpacity
                style={styles.button}
                onPress={handleRegistration}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')} 
            >
                <Text style={styles.desc}>
                Already have an account? 
                </Text>
                <Text style={styles.linkText}>Click here to login.</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
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
    },
    button: {
        backgroundColor: '#128C7E',
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
    description: {
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        color: '#000000',
        fontWeight: "bold"
    },
    desc: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        color: '#000000',
        fontWeight: "bold"
    },
    linkText: {
        marginTop: 10,
        color: '#128C7E',
        textDecorationLine: 'underline',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
       
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
        marginVertical: 10,
    },
});

export default Register;
