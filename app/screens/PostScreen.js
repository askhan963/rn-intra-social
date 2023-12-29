import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, ProgressBar, Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ImageProgress from 'react-native-image-progress';
import { FirebaseApp, FirebaseAuth, FirebaseFireStore } from '../../firebaseConfig';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

const firestore = getFirestore(FirebaseApp);

const NewPostScreen = () => {
  const [postContent, setPostContent] = useState('');
  const [userName, setUserName] = useState('default');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = FirebaseAuth.currentUser;
      if (user) {
        const usersRef = collection(FirebaseFireStore, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setUserName(userDoc.name);
        }
      }
    };

    fetchUserName();
  }, []);

  const handlePostSubmit = async () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter post content.');
      return;
    }

    try {
      const postData = {
        userId: userName,
        content: postContent,
        timestamp: serverTimestamp(),
        likeCount: 0,
        imageURL: imageURL || '',
      };

      await addDoc(collection(firestore, 'posts'), postData);

      Alert.alert('Success', 'Post submitted successfully!');
      console.log('Post:', postData);

      setPostContent('');
      setImageURL('');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to submit post. Please try again.');
    }
  };

  const handleImageLoadStart = () => {
    setLoading(true);
  };

  const handleImageLoadEnd = () => {
    setLoading(false);
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            style={styles.input}
            placeholder="Write your post..."
            multiline
            value={postContent}
            onChangeText={setPostContent}
          />
          {imageURL ? (
            <ImageProgress
              source={{ uri: imageURL }}
              style={styles.image}
              indicator={ProgressBar}
              onLoadStart={handleImageLoadStart}
              onLoadEnd={handleImageLoadEnd}
            />
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Enter image URL (optional)"
            value={imageURL}
            onChangeText={setImageURL}
          />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handlePostSubmit}
            loading={loading}
            disabled={loading}
          >
            Post
          </Button>
        </Card.Actions>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'blue'
  },
  card: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor:'#4c669f',
    borderRadius: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
});

export default NewPostScreen;
