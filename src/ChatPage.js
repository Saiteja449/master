
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Send from '../assets/images/Send.svg';
import User from '../assets/images/user copy 2.svg'
import globle_Style from './css/globle_Style';
import { API_BASE_URL } from './constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatPage = ({ route, navigation }) => {
  const { userId, otherUserId, name, image, bookingId, token } = route.params;
  const [messages, setMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]); // State to store answers

  // Fetch chat messages from Firestore
  useEffect(() => {
    // const chatId = [userId, otherUserId].sort().join('_'); // Unique chat ID
    const unsubscribe = firestore()
      .collection('chats')
      .doc(bookingId) // Current user's document
      .collection(otherUserId) // Other user's subcollection
      .doc(userId) // Messages document
      .collection('messages') // Subcollection for individual messages
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched Messages:', data); // Debugging
        setMessages(data);
      });

    return () => unsubscribe();
  }, [userId, otherUserId]);

  // Check if the last message is a question and fetch answers if it is
  useEffect(() => {
    console.warn("LOG 1")
    if (messages.length > 0) {
      console.warn("LOG 2", messages)
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isQuestion && lastMessage.senderId === otherUserId) {
        console.warn("LOG 3", lastMessage)
        setSelectedQuestion(lastMessage);
        fetchAnswers(lastMessage.text);
      } else {
        console.warn("LOG 4")
        setSelectedQuestion(null);
        setAnswers([]);
      }
    }
  }, [messages]);

  // Fetch answers for the selected question
  const fetchAnswers = async (questionText) => {
    console.warn("LOG 5", questionText)
    const snapshot = await firestore()
      .collection('allquestions')
      .where('question', '==', questionText)
      .get();
    if (!snapshot.empty) {
      const questionData = snapshot.docs[0].data();
      setAnswers(questionData.answers); // Set the answers array
    }
  };

  // Handle sending a message (answer only)
  const sendMessage = async (text) => {
    const chatId = [userId, otherUserId].sort().join('_');

    await firestore()
      .collection('chats')
      .doc(bookingId) // Current user's document
      .collection(otherUserId) // Other user's subcollection
      .doc(userId) // Messages document
      .collection('messages')
      .add({
        text,
        isQuestion: false, // This is an answer
        senderId: userId, // Store senderId as otherUserId
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      sendNotification(text)
  };

  const sendNotification = async (text) => {

    let userData = ''
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

    const data = {
      title: name,
      message: text,
      deviceToken: token,
    }

    console.warn("VIJAYYYYYLOGG notificationnnnn sentttttt payloaadddd :: ", data)


    const url = `${API_BASE_URL}sendNotification`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: name,
          message: text,
          deviceToken: token,
        }),
      });

      const result = await response.json();
      if (result.status == true) {
        console.warn("VIJAYYYYYLOGG notificationnnnn sentttttt successsssssss :: ", result)
        // setQuotationList(result.data)

      } else {
        console.warn("Nnotificationnnnn sentttttt faiilllllllll", result);
      }
    } catch (error) {
      console.warn('Network request failed', error);
    }

  }

  return (
    <View style={styles.container}>

      <View style={[globle_Style.pet_shop_header, { alignItems: 'center', marginBottom: 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }}>
          <Image source={require('../assets/images/left-arrow.png')} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{name}</Text>
        </View>
      </View>

      {
        messages.length > 0 ?

          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{}}>
                {/* <View>
              {item.senderId !== userId ?
                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                  <Send />
                </View>
                :
                null}
            </View> */}
                <View

                >

                  {/* <Text style={[
                item.senderId === userId ? styles.sentMessage : styles.receivedMessage,
                item.senderId === userId ? {alignItems:'flex-end'} : {alignItems:'flex-start'},{
                  justifyContent:'flex-start'
                }
              ]}>{item.text}</Text> */}

                  {item.senderId === userId ? (

                    <Text style={[styles.sentMessage, { alignItems: 'flex-end', justifyContent: 'flex-start' }]}>
                      {item.text}
                    </Text>
                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ marginRight: 5 }}>
                        {/* <Image source={image ? { uri: image } : <User />} style={{ width: 30, height: 30, borderRadius: 15 }}></Image> */}
                        {image ? (
                          <Image
                            source={{ uri: image }}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                            resizeMode="cover"
                          />
                        ) : (
                          <View style={{ width: 30, height: 30, borderRadius: 15 }}>
                            <User />
                          </View>
                        )}
                      </View>
                      <Text style={[styles.receivedMessage, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                        {item.text}
                      </Text>
                    </View>
                  )}

                </View>

              </View>
            )}
          />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <View style={{ marginBottom: 10 }}>
              <Image source={require('../assets/images/dogWalking.png')} />
            </View>
            <View>
              <Text style={{
                textAlign: 'center', fontSize: 20,
                fontWeight: '600',
                lineHeight: 24.2,
                fontFamily: 'Inter-SemiBold',
                color: '#1D1D1D'
              }}>No Conversation </Text>
              {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
            </View>
          </View>
      }

      {/* Chat Messages */}


      {/* Show selected question and answer options if the last message is a question */}
      {selectedQuestion && (
        <LinearGradient colors={['#FBA94D', '#FE8807']} start={{ x: 0, y: 0 }} style={styles.answersContainer}>
          <View >
            <Text style={[styles.selectedQuestionText, { color: '#fff' }]}>{selectedQuestion.text}</Text>
            {answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => sendMessage(answer)}
              >
                <View style={[styles.answerText, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <Text style={{ fontSize: 12, fontFamily: 'Inter-Regular' }}>{answer}</Text>
                  <View>
                    <Send />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  answersContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedQuestionText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  answerText: {
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  sentMessage: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
});

export default ChatPage;