import { combineReducers } from 'redux';
import { carsReducer } from '../modules/car';

//combine all the reducers (1) created
const makeRootReducer = combineReducers({
    cars: carsReducer
});

export default makeRootReducer;