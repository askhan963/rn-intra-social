/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {FirebaseApp} from '../../firebaseConfig';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
} from 'firebase/firestore';

const firestore = getFirestore(FirebaseApp);

const AllPostScreen = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(firestore, 'posts'),
        orderBy('timestamp', 'desc'),
      );
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = [];
      postsSnapshot.forEach(doc => {
        const postData = doc.data();
        postsData.push({
          id: doc.id,
          ...postData,
        });
      });
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  });

  const handleLikePress = async (postId, currentLikeCount) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      if (likedPosts.includes(postId)) {
        if (currentLikeCount > 0) {
          await updateDoc(postRef, {likeCount: increment(-1)});
        }
        setLikedPosts(prevLikedPosts =>
          prevLikedPosts.filter(likedPostId => likedPostId !== postId),
        );
      } else {
        await updateDoc(postRef, {likeCount: increment(1)});
        setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const isPostLiked = postId => likedPosts.includes(postId);

  const renderPost = ({item}) => {
    const postDate = item.timestamp ? item.timestamp.toDate() : null;

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postText}>{item.content}</Text>

        {item.imageURL && (
          <Image source={{uri: item.imageURL}} style={styles.postImage} />
        )}

        <View style={styles.postFooter}>
          <TouchableOpacity
            onPress={() => handleLikePress(item.id, item.likeCount)}>
            <Text style={styles.likeText}>
              {isPostLiked(item.id)
                ? `Liked (${item.likeCount})`
                : `${item.likeCount} Likes`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.postText}>{'@' + item.userId}</Text>
        </View>
        <View>
          {postDate && (
            <Text style={styles.postDate}>{postDate.toLocaleString()} </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2861',
  },
  postsList: {
    paddingHorizontal: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  postText: {
    fontSize: 20,
    marginBottom: 5,
    alignItems: 'center',
    color: 'blue',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  likeText: {
    color: '#007bff',
    fontSize: 20,
  },
  postDate: {
    fontSize: 14,
    color: 'black',  
  },
});

export default AllPostScreen;
