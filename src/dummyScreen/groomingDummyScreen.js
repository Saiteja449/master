import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import React, { useEffect } from 'react';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';

const groomingDummyScreen = ({ navigation }) => {

    return (
        // <View style={styles.container}>

        //     <View style={globle_Style.coming_Soon}>
        //         <View style={globle_Style.boarding_img}>

        //             <Image source={require('../../assets/images/dummy_grooming.png')}></Image>

        //         </View>
        //         <View style={globle_Style.boarding_coming_con}>
        //             <Text style={globle_Style.boarding_coming_txt}>
        //                 Grooming Services Coming Soon
        //             </Text>
        //             <Text style={globle_Style.boarding_coming_para}>
        //                 Our new grooming services are launching soon. Get ready to handle all breeds and styles.
        //             </Text>
        //             <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        //                 <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
        //                     <Text style={[globle_Style.gbl_btn]}>Go To Home</Text>
        //                 </LinearGradient>
        //             </TouchableWithoutFeedback>
        //         </View>
        //     </View>
        // </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
            <View style={{ marginBottom: 10 }}>
              <Image source={require('../../assets/images/dogWalking.png')} />
            </View>
            <View>
              <Text style={{
                textAlign: 'center', fontSize: 20,
                fontWeight: '600',
                lineHeight: 24.2,
                fontFamily: 'Inter-SemiBold',
                color: '#1D1D1D'
              }}>No New Jobs </Text>
              {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
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

export default groomingDummyScreen;