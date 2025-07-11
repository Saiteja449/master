import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useEffect } from 'react';
import globle_Style from './css/globle_Style';

const DummyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image
                style={{ width: 200, height: 200 }}
                source={require('../android/app/src/main/res/raw/waitinggif.gif')}
            /> */}

      {/* <View>
           <Logo style={{ width: 100 }} />
           </View> */}

      <View>
        <Text
          style={[
            globle_Style.login_hd_txt,
            { marginTop: 20, marginHorizontal: 16 },
          ]}
        >
          Welcome to Petsfolio! 🐾 {'\n'}Your profile is under review. We’ll
          update you soon!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default DummyScreen;
