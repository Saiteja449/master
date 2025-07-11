// src/context/AppContext.js

import React, { useEffect, useState, createContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create contexts
export const NetworkContext = createContext({ isConnected: true });
export const UserContext = createContext({ userData: null, loading: true, updateUserData: () => {}, clearUserDataContext: () => {} });

// Combined Provider component
const AppProvider: React.FC<any> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [userData, setUserDataState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Network status listener
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    // Fetch user data from AsyncStorage
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserDataState(JSON.parse(data));
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      unsubscribe();
    };
  }, []);

  const updateUserData = async (newUserData) => {
    setUserDataState(newUserData);
    await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const clearUserDataContext = async () => {
    setUserDataState(null);
    await AsyncStorage.removeItem('userData');
  };

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      <UserContext.Provider value={{ userData, loading, updateUserData, clearUserDataContext }}>
        {children}
      </UserContext.Provider>
    </NetworkContext.Provider>
  );
};

export default AppProvider;
