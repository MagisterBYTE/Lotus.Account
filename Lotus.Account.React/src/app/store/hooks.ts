import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatchAccount, RootStateAccount } from './store';

export const useAppDispatchAccount = () => useDispatch<AppDispatchAccount>();

export const useAppSelectorAccount: TypedUseSelectorHook<RootStateAccount> = useSelector;