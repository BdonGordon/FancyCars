import { combineReducers } from 'redux';
import { carsReducer } from '../modules/car';

const makeRootReducer = combineReducers({
    cars: carsReducer
});

export default makeRootReducer;