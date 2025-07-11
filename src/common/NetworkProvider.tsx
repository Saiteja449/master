import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = React.createContext({isConnected: true});

const NetworkProvider: React.FC<any> = props => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{isConnected: isConnected}}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
