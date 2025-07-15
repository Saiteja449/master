// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import MessageChat from '../messageChat/messageChat';
// import MessageScreens from '../dashbord/Message';

// const MessageChatScreen = () => {

//     const Stack = createNativeStackNavigator()

//     return (
//         <NavigationContainer independent={true}>
//             <Stack.Navigator screenOptions={{
//                 headerTitleAlign: 'center',
//             }}>
//                 <Stack.Screen name='Message' component={MessageScreens} />
//                 <Stack.Screen name='MessageChat' component={MessageChat} options={{ headerShown: false }} />

//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default MessageChatScreen;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const messageChatScreen = () => {
  return (
    <View>
      <Text>messageChatScreen</Text>
    </View>
  );
};

export default messageChatScreen;

const styles = StyleSheet.create({});
