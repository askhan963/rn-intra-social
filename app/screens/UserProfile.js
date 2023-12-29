// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { FirebaseAuth, FirebaseFireStore } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Avatar, Card, IconButton } from 'react-native-paper';


const UserProfile = () => {
  const imgUrl = 'https://placekitten.com/640/360';
  const [userData, setUserData] = useState({
    uid: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    photoURL: imgUrl,
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedField, setEditedField] = useState('');
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = FirebaseAuth.currentUser;
      if (user) {
        const usersRef = collection(FirebaseFireStore, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setUserData({
            uid: userDoc.uid,
            name: userDoc.name,
            email: userDoc.email,
            age: userDoc.age,
            gender: userDoc.gender,
            phone: userDoc.phone,
            photoURL: userDoc.photoURL,
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditField = field => {
    setEditedField(field);
    setEditedValue(userData[field]); // Set the initial value to the current field value
    setEditModalVisible(true);
  };

  const handleSaveField = async () => {
    try {
      // Update the field in Firestore
      const userRef = doc(FirebaseFireStore, 'users', userData.uid);
      await updateDoc(userRef, { [editedField]: editedValue });

      // Update the local state
      setUserData(prevData => ({ ...prevData, [editedField]: editedValue }));

      // Close the modal
      setEditModalVisible(false);
    } catch (error) {
      console.error(`Error updating ${editedField}:`, error);
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.avatarContainer}>
        {userData.photoURL ? (
          <Avatar.Image size={150} source={{ uri: userData.photoURL }} />
        ) : (
          <Avatar.Text size={150} label={userData.name ? userData.name[0].toUpperCase() : 'A'} />
        )}
      </View>

      <Card style={styles.card}>
        <Card.Title
          title={
            <View style={styles.detailContainer}>
              <Text style={styles.name}>{userData.name || 'No name'}</Text>
            </View>
          }
          subtitle={
            <View style={styles.detailContainer}>
              <Text style={styles.email}>{userData.email}</Text>
            </View>
          }
        />
        <Card.Content>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>{userData.age || 'N/A'}</Text>
            <TouchableOpacity onPress={() => handleEditField('age')}>
            </TouchableOpacity>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detail}>{userData.gender || 'N/A'}</Text>
            <TouchableOpacity onPress={() => handleEditField('gender')}>
            </TouchableOpacity>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detail}>{userData.phone || 'N/A'}</Text>
            <TouchableOpacity onPress={() => handleEditField('phone')}>
              
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            value={editedValue}
            onChangeText={setEditedValue}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveField}>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditModalVisible(false)}
          >
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  card: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  icon: {
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    marginRight: 8,
  },
  editButton: {
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 8,
    width: 200,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default UserProfile;