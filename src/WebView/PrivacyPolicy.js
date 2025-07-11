import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://www.petsfolio.com/in/privacy-policy/' }}
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

export default PrivacyPolicy;