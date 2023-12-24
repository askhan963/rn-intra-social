import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FirebaseAuth, FirebaseFireStore } from '../../firebaseConfig'; // Import FirebaseAuth and Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = () => {
    const imgUrl = 'https://placekitten.com/640/360'
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    photoURL: imgUrl, // Add a field for the photo URL if you store this in Firestore
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current user from FirebaseAuth
      const user = FirebaseAuth.currentUser;
      if (user) {
        // Create a query against the users collection
        const usersRef = collection(FirebaseFireStore, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Assuming there's only one document for each user
          const userDoc = querySnapshot.docs[0].data();
          // console.log(userDoc)
          setUserData({
            name: userDoc.name,
            email: userDoc.email,
            age: userDoc.age,
            gender: userDoc.gender,
            phone: userDoc.phone,
            photoURL: userDoc.photoURL, // Use FirebaseAuth photoURL or a placeholder
          });
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
     {userData.photoURL && (
        <Image source={{ uri: userData.photoURL }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{userData.name || 'No name'}</Text>
      <Text style={styles.email}>{userData.email}</Text>
      <Text style={styles.detail}>Age: {userData.age || 'N/A'}</Text>
      <Text style={styles.detail}>Gender: {userData.gender || 'N/A'}</Text>
      <Text style={styles.detail}>Phone: {userData.phone || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  // Add styles for other user data fields
});

export default UserProfile;
