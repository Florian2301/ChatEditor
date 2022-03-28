import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../reducers/reducer/reducers';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
