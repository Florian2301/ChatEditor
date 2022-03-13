import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../reducers/reducer/reducers.js';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
