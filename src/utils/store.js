import React, {createContext, useState} from 'react';

export const StoreContext = createContext(null);

export default ({children}) => {
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const [merchantId, setMerchantId] = useState('');
  const [merchantLat, setMerchantLat] = useState();
  const [merchantLong, setMerchantLong] = useState();

  const store = {
    userLat: {userLat, setUserLat},
    userLong: {userLong, setUserLong},
    merchantId: {merchantId, setMerchantId},
    merchantLat: {merchantLat, setMerchantLat},
    merchantLong: {merchantLong, setMerchantLong},
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
