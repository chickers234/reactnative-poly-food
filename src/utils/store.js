import React, {createContext, useState} from 'react';

export const StoreContext = createContext(null);

export default ({children}) => {
  const [merchantId, setMerchantId] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const store = {
    merchant: {merchantId, setMerchantId},
    lat: {latitude, setLatitude},
    long: {longitude, setLongitude},
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
