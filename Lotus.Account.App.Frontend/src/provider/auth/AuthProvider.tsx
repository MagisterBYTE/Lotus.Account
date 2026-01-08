import { useEffect, useState } from 'react';
import { AuthService, UserAuthorizeInfo } from '#modules/auth';
import { AuthContext } from './AuthContext';

export interface IAuthProviderProps
{
  children: React.ReactNode;
}

export const AuthProvider = (props: IAuthProviderProps) => 
{
  const { children } = props;
  const [userAuthInfo, setUserAuthInfo] = useState<UserAuthorizeInfo|undefined>(undefined);
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  useEffect(() => 
  {
    AuthService.getUserInfoAsync()
      .then((userInfo) => 
      {
        if (userInfo) 
        {
          setUserAuthInfo(new UserAuthorizeInfo(userInfo));
        }
        else
        {
          setUserAuthInfo(undefined);
        }
        setProviderKey((key) => key + 1);
      })
      .catch((_error) => 
      {
        setUserAuthInfo(undefined);
        setProviderKey((key) => key + 1);
      });
  }, []);

  return (
    <AuthContext.Provider
      key={providerKey} 
      value={{
        userAuthInfo: userAuthInfo,
        setUserAuthInfo: setUserAuthInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
