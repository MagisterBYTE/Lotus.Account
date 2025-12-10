import * as React from 'react';
import { LocalizationContext, type ILocalizationContextType } from './LocalizationContext';

export const useLocalizationSelector = (): ILocalizationContextType => 
{
  const context = React.useContext(LocalizationContext);

  if (!context) 
  {
    throw new Error(
      'You can use "useLocalizationSelector" hook only within a <LocalizationProvider> component.'
    );
  }

  return context;
};
