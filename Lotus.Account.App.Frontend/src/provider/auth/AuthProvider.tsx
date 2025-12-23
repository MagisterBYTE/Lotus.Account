import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthService, UserAuthorizeInfo } from '#modules/auth';

export const AuthProvider = (props: { children: React.ReactNode }) => 
{
  const [userAuthInfo, setUserAuthInfo] = useState<UserAuthorizeInfo|undefined>(undefined);
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  useEffect(() => 
  {
    AuthService.getUserInfoAsync()
    .then((userInfo) => {
      if (userInfo) 
      {
        setUserAuthInfo(new UserAuthorizeInfo(userInfo));
    }})
    .catch((error) => 
      {
        setUserAuthInfo(undefined);
      })
  }, []);

  return (
    <AuthContext.Provider
      key={providerKey} 
      value={{
        userAuthInfo: userAuthInfo,
        setUserAuthInfo: setUserAuthInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
