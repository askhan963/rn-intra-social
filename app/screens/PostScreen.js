import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostScreen = () => {
  // State to hold like status
  const [liked, setLiked] = useState(false);

  // Example post data
  const post = {
    userName: 'John Doe',
    userImageUrl: 'https://placekitten.com/640/360', // Replace with actual user image URL
    postTime: '2 hours ago',
    caption: 'Enjoying the beautiful scenery!',
    imageUrl: 'https://placekitten.com/640/360', // Replace with actual post image URL
  };

  // Function to handle like button press
  const handleLikePress = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.userImageUrl }} style={styles.profilePic} />
        <View>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.postTime}>{post.postTime}</Text>
        </View>
      </View>
      <Text style={styles.caption}>{post.caption}</Text>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
        <Text style={styles.likeButtonText}>{liked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: 'grey',
  },
  caption: {
    fontSize: 16,
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  likeButton: {
    padding: 10,
    alignItems: 'center',
  },
  likeButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default PostScreen;
