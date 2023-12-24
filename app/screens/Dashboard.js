import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FirebaseAuth, FirebaseFireStore } from '../../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Dashboard = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const imgUrl = 'https://placekitten.com/640/360'
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const currentUserId = FirebaseAuth.currentUser?.uid;
            const usersSnapshot = await getDocs(collection(FirebaseFireStore, "users"));
            const usersList = usersSnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id })) // Here, id is the Firestore document ID
                .filter(user => user.uid !== currentUserId); // Use uid for comparison
                
            setUsers(usersList);
        } catch (error) {
            console.error("Error fetching users: ", error);
            Alert.alert("Error", "There was an error fetching the users.");
        }
    };
    

    const handleSignOut = async () => {
        try {
            await signOut(FirebaseAuth);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert("Sign Out Error", error.message);
        }
    };
    const navigateToChat = (item) => {
        // console.log('Navigating to Chat with UID:', item.uid);
        navigation.navigate('Chat', { otherUserId: item.uid });
    };
    

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Chats</Text> */}
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.item}
                        onPress={() => navigateToChat(item)}
                    >
                        <Image source={{ uri: imgUrl }} style={styles.userImage} />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
        fontWeight: "bold"
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginLeft: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#128C7E',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Dashboard;
