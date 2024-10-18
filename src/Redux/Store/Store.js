import { configureStore} from '@reduxjs/toolkit'
import rootReducer from '../Reducer/rootReducer';
// const { createStore } = require("redux");
const { Reducers } = require("../reducers/Reducers");

export const myStore = configureStore({
    reducer:rootReducer 
})