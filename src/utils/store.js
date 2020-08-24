import React, {createContext, useState} from 'react';

export const StoreContext = createContext(null);

export default ({children}) => {
  const [userLoc, setUserLoc] = useState({lat: 0, long: 0});
  const [merchantId, setMerchantId] = useState('');
  const [merchantLoc, setMerchantLoc] = useState({lat: 0, long: 0});

  const store = {
    userLoc: {userLoc, setUserLoc},
    merchantId: {merchantId, setMerchantId},
    merchantLoc: {merchantLoc, setMerchantLoc},
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
