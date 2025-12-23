import * as React from 'react';
import { LocalizationContext, type ILocalizationContextType } from './LocalizationContext';

export const useLocalizationContext = (): ILocalizationContextType => 
{
  const context = React.useContext(LocalizationContext);

  if (!context) 
  {
    throw new Error(
      'You can use "useLocalizationContext" hook only within a <LocalizationProvider> component.'
    );
  }

  return context;
};
