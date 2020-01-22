import {createStore} from 'redux';
import { productReducer } from './reducers/productreducer';
// import { userReducer } from './reducers/userreducer';
// import {combineReducers} from 'redux';
// import { projectReducer } from './reducers/productreducer';
// import { bugReducer } from './reducers/bugreducer';
export const store = createStore(productReducer);
store.subscribe(()=>{
console.log('Subscribe..... ',store.getState());
});