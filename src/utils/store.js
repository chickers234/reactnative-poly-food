import React, {createContext, useState} from 'react';

export const StoreContext = createContext(null);

export default ({children}) => {
  const [userLoc, setUserLoc] = useState({lat: 0, long: 0});
  const [userPos, setUserPos] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [merchantLoc, setMerchantLoc] = useState({lat: 0, long: 0});
  const [cartList, setCartList] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [settingApp, setSettingApp] = useState({});

  const store = {
    userLoc: {userLoc, setUserLoc},
    userPos: {userPos, setUserPos},
    merchantId: {merchantId, setMerchantId},
    merchantLoc: {merchantLoc, setMerchantLoc},
    cartList: {cartList, setCartList},
    token: {token, setToken},
    user: {user, setUser},
    settingApp: {settingApp, setSettingApp},
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
