/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useState, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {FirebaseAuth, FirebaseFireStore} from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, Alert} from 'react-native';
import {StyleSheet} from 'react-native';
const Chat = ({route}) => {
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);
  // console.log('Chat screen route params:', route.params);
  const {otherUserId} = route.params; // The ID of the other user in the chat

  const imgUrl = 'https://placekitten.com/640/360';
  // Assume that the current user's ID is the UID from the auth object
  const currentUserId = FirebaseAuth.currentUser.uid;

  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch the other user's details
    const fetchOtherUserDetails = async () => {
      const usersRef = collection(FirebaseFireStore, 'users');
      const q = query(usersRef, where('uid', '==', otherUserId));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Assuming there will only be one user with the matching UID
          const userData = querySnapshot.docs[0].data();
          setOtherUser({
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            // Include other fields as needed
          });
          navigation.setOptions({title: userData.name});
        } else {
          console.log('No such document for the other user!');
        }
      } catch (error) {
        console.error('Failed to fetch user details: ', error);
      }
    };

    fetchOtherUserDetails();
  }, [otherUserId, navigation]);
  // Generate a chat ID based on the current user and the other user
  const generateChatId = (currentUserId, otherUserId) => {
    return [currentUserId, otherUserId].sort().join('_');
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={showUserDetails}>
          <Text style={styles.headerButtonText}>Info</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, otherUser]);
  const chatId = generateChatId(currentUserId, otherUserId);

  useEffect(() => {
    // Create a query to fetch messages between the two users
    const messagesQuery = query(
      collection(FirebaseFireStore, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(messagesQuery, snapshot => {
      const fetchedMessages = snapshot.docs.map(doc => {
        // Check if createdAt is a valid Firestore Timestamp before converting
        let createdAt;
        if (
          doc.data().createdAt &&
          typeof doc.data().createdAt.toDate === 'function'
        ) {
          createdAt = doc.data().createdAt.toDate();
        } else {
          // If createdAt is not a valid timestamp, use the current date as a fallback
          createdAt = new Date();
        }
        return {
          _id: doc.id,
          text: doc.data().text,
          createdAt: createdAt,
          user: doc.data().user,
        };
      });
      setMessages(fetchedMessages);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [chatId]);

  // Function to show user details
  const showUserDetails = () => {
    // Show an alert or a modal with the user's phone and email
    Alert.alert(
      'User Details',
      `Phone: ${otherUser.phone || 'N/A'}\nEmail: ${otherUser.email || 'N/A'}`,
      [{text: 'OK'}],
    );
  };

  const onSend = useCallback(
    (messages = []) => {
      const message = messages[0];
      const payload = {
        _id: message._id,
        text: message.text,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
        user: message.user,
        chatId: chatId, // Use the chat ID generated earlier
      };

      // Add the message to the Firestore collection
      addDoc(collection(FirebaseFireStore, 'messages'), payload);
    },
    [chatId],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: currentUserId,
        name: FirebaseAuth.currentUser.displayName,
        avatar: imgUrl,
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#007bff',
            },
            left: {
              backgroundColor: '#f0f0f0',
            },
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerButton: {
    padding: 10,
    marginRight: 10,
  },
  headerButtonText: {
    color: '#007bff', // or any color you want
    fontSize: 16,
  },
});
export default Chat;
