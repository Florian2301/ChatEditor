import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/reducer/reducers.js';
const initialState = {};
export const store = createStore(reducers, initialState, applyMiddleware(thunk));
//# sourceMappingURL=store.js.map