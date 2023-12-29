// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import { FirebaseAuth, FirebaseFireStore } from '../../firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import {  limit, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// const Dashboard = ({ navigation }) => {
//     const [users, setUsers] = useState([]);
//     // const imgUrl = 'https://placekitten.com/640/360'
//     useEffect(() => {
//         const currentUserId = FirebaseAuth.currentUser?.uid;
//         const usersQuery = query(collection(FirebaseFireStore, "users"));
//         const unsubscribe = onSnapshot(usersQuery, async (snapshot) => {
//             const usersList = [];
//             for (const doc of snapshot.docs) {
//                 let user = { ...doc.data(), id: doc.id };
//                 if (user.uid !== currentUserId) {
//                     await appendLastMessage(user, currentUserId);
//                     usersList.push(user);
//                 }
//             }
//             // Sort users based on the timestamp of the last message
//             usersList.sort((a, b) => {
//                 // Fallback to 0 if lastMessageTimestamp is not available
//                 let timeA = a.lastMessageTimestamp ? a.lastMessageTimestamp.seconds : 0;
//                 let timeB = b.lastMessageTimestamp ? b.lastMessageTimestamp.seconds : 0;
//                 return timeB - timeA; // Sort in descending order
//             });
//             setUsers(usersList);
//         });
//         return () => unsubscribe();
//     }, []);

//     // const fetchUsers = async () => {
//     //     try {
//     //         const currentUserId = FirebaseAuth.currentUser?.uid;
//     //         const usersSnapshot = await getDocs(collection(FirebaseFireStore, "users"));
//     //         const usersList = usersSnapshot.docs
//     //             .map(doc => ({ ...doc.data(), id: doc.id })) // Here, id is the Firestore document ID
//     //             .filter(user => user.uid !== currentUserId); // Use uid for comparison
//     //             for (const user of usersList) {
//     //                 await appendLastMessage(user, currentUserId);
//     //             }
//     //             // console.log(usersList)
//     //             setUsers(usersList);
//     //     } catch (error) {
//     //         console.error("Error fetching users: ", error);
//     //         Alert.alert("Error", "There was an error fetching the users.");
//     //     }
//     // };
//     // new

//     const appendLastMessage = async (user, currentUserId) => {
//         const chatId = generateChatId(currentUserId, user.uid);
//         const lastMessageQuery = query(
//             collection(FirebaseFireStore, 'messages'),
//             where('chatId', '==', chatId),
//             orderBy('createdAt', 'desc'),
//             limit(1)
//         );
//         const lastMessageSnapshot = await getDocs(lastMessageQuery);
//         if (!lastMessageSnapshot.empty) {
//             const lastMessageData = lastMessageSnapshot.docs[0].data();
//             user.lastMessage = lastMessageData.text;
//             // Save the Timestamp for sorting
//             user.lastMessageTimestamp = lastMessageData.createdAt;
//             // Save the formatted date string for display
//             user.lastMessageTime = lastMessageData.createdAt.toDate().toLocaleString();
//         } else {
//             user.lastMessage = 'No messages';
//             // Use a consistent value for sorting when there are no messages
//             user.lastMessageTimestamp = null;
//             user.lastMessageTime = '';
//         }
//     };

//     const generateChatId = (currentUserId, otherUserId) => {
//         return [currentUserId, otherUserId].sort().join('_');
//     };
//     // old
//     const navigateToChat = (item) => {
//         // console.log('Navigating to Chat with UID:', item.uid);
//         navigation.navigate('Chat', { otherUserId: item.uid });
//     };

//     return (
//         <View style={styles.container}>
//             {/* <Text style={styles.title}>Chats</Text> */}
//             <FlatList
//                 data={users}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (

//                     <TouchableOpacity
//                         style={styles.item}
//                         onPress={() => navigateToChat(item)}
//                     >
//                         <Image source={{ uri: item.photoURL }} style={styles.userImage} />
//                         <View>
//                         <Text style={styles.text}  >{item.name}</Text>
//                         <Text style={styles.phone}>{item.phone}</Text>
//                         </View>
//                         <View>
//                         <Text style={styles.text}>{item.lastMessage}</Text>
//                         <Text style={styles.phone}>{item.lastMessageTime}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         backgroundColor: '#F0F0F0',
//     },
//     title: {
//         fontSize: 24,
//         textAlign: 'center',
//         marginVertical: 20,
//         color: '#333',
//         fontWeight: "bold"
//     },
//     item: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 20,
//         marginVertical: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#DDDDDD',
//     },
//     userImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 15,
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         marginLeft: 16,
//         color: '#333',
//     },
//     phone: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         marginTop: 4,
//         marginLeft: 16,
//         color: '#128C7E',
//     },
//     button: {
//         backgroundColor: '#128C7E',
//         padding: 15,
//         borderRadius: 8,
//         marginVertical: 10,
//         width: '80%',
//         alignSelf: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         textAlign: 'center',
//         fontSize: 16,
//     },
// });

// export default Dashboard;
