import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

const TermsandCondition = () => {
    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: 'https://www.petsfolio.com/in/terms-of-service/' }} 
                style={styles.webview}
                javaScriptEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default TermsandCondition;