import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from '../reducers/AuthReducers'; // Import the default export

export const rootReducers = combineReducers({
    auth: AuthReducer, // Use the default import
});

export default rootReducers;
