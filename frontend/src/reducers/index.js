import { combineReducers } from 'redux';
import sales from './salesReducer';
import profile from './profileReducer';

export default combineReducers({
    sales,
    profile
});