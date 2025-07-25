

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

const trainingDummyScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <View style={globle_Style.coming_Soon}>
                <View style={globle_Style.boarding_img}>
                    <Image source={require('../../assets/images/dummy_training.png')}></Image>

                </View>
                <View style={globle_Style.boarding_coming_con}>
                    <Text style={globle_Style.boarding_coming_txt}>
                        Training Services Coming Soon
                    </Text>
                    <Text style={globle_Style.boarding_coming_para}>
                        Our new training  services are launching soon. Get ready to handle all breeds and  basic obedience to complex behavior issues.
                    </Text>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                            <Text style={[globle_Style.gbl_btn]}>Go To Home</Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </View>
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

export default trainingDummyScreen;