import * as React from 'react';
import { AuthContext, type IAuthContextType } from './AuthContext';

export const useAuthContext = (): IAuthContextType => 
{
  const context = React.useContext(AuthContext);

  if (!context) 
  {
    throw new Error(
      'You can use "useAuthContext" hook only within a <AuthProvider> component.'
    );
  }

  return context;
};
