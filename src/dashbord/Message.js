import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MessageScreens = ({ route, navigation }) => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [userId, setUserId] = useState('user4'); // Assuming userId is 'user2'

  // Fetch all users who have initiated chats with userId (user2)
  // Fetch all users who have initiated chats with userId (user2)
  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const userDocRef = firestore().collection('chats').doc(userId);
        const userDoc = await userDocRef.get();

        console.warn("USRDOCCCC ::: ", userDoc)

        if (userDoc.exists) {
          // Fetch all subcollections under the user document
          const subcollections = await userDocRef.listCollections();
          const userList = subcollections.map(collection => collection.id); // Get the IDs of the subcollections

          setUsers(userList); // Update the state with the list of users
        } else {
          console.warn(`Document for user ${userId} does not exist in the chats collection.`);
          setUsers([]); // Clear the list if the document doesn't exist
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers()
  }, [userId]);


  // Navigate to the chat screen when a user is selected
  const navigateToChat = (otherUserId) => {
    navigation.navigate('ChatPage', { userId, otherUserId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users who have chatted with {userId}:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigateToChat(item)}
          >
            <Text style={styles.userText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userText: {
    fontSize: 16,
  },
});

export default MessageScreens;