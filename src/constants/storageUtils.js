import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            return JSON.parse(userDataString);
        }
        return null;  // Return null if no userDataString is found
    } catch (error) {
        console.error('Failed to fetch user data from AsyncStorage:', error);
        return null;
    }
};

export const setUserData = async (userData) => {
    try {
        const userDataString = JSON.stringify(userData);
        await AsyncStorage.setItem('userData', userDataString);
    } catch (error) {
        console.error('Failed to save user data to AsyncStorage:', error);
    }
};

export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Failed to clear user data from AsyncStorage:', error);
    }
};