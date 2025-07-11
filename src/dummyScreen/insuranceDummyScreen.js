import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import React, { useEffect } from 'react';
import globle_Style from '../css/globle_Style';

const insuranceDummyScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <View style={globle_Style.coming_Soon}>
               <View style={globle_Style.boarding_img}>
                
                </View>
                <View style={globle_Style.boarding_coming_con}>
                    <Text style={globle_Style.boarding_coming_txt}>
                           Insurance Services Coming Soon
                    </Text>
                    <Text style={globle_Style.boarding_coming_para}>
                            We are delighted to inform you that insurance services will soon be accessible on our platform.
                    </Text>
                    <TouchableWithoutFeedback >
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

export default insuranceDummyScreen;