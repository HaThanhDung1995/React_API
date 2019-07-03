import {combineReducers} from 'redux';
import products from './Products';
import itemEditting from './itemEditting';
const appReducers = combineReducers({
    products:products,
    itemEditting:itemEditting
});
export default appReducers;