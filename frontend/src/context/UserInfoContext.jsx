import { createContext, useCallback, useEffect, useState } from 'react';
import getUserInfo from '../apis/getUserInfo';
import postLogout from '../apis/postLogout';
import { toast } from 'react-toastify';
export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const logout = useCallback(async () => {
    const data = await postLogout();
    setUserInfo(null);
    toast.success(data.message);
  }, []);

  const login = useCallback(async () => {
    const data = await getUserInfo();
    setUserInfo(data || {});
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <UserInfoContext.Provider value={{ userInfo, logout }}>{children}</UserInfoContext.Provider>
  );
};
