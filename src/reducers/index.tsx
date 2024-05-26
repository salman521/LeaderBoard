import {combineReducers} from 'redux';
import commonReducer from './commonReducer';

const reducers = {
  commonReducer,
};

export default combineReducers(reducers);
