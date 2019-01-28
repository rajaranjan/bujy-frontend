import {combineReducers} from 'redux';
//import profile from './profileReducer';
import { reducer as form  } from 'redux-form';
import user from './loginReducer';
import pollReducer from './pollReducer';

const rootReducer = combineReducers({
    pollReducer,
    user,
    form
});

export default rootReducer;