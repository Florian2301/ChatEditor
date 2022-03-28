import { applyMiddleware, createStore } from 'redux';
import reducers from './redux/reducers/reducer/reducers';
import thunk from 'redux-thunk';
const initialState = {};
export const store = createStore(reducers, initialState, applyMiddleware(thunk));
//# sourceMappingURL=store.js.map