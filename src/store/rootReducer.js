import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import startupReducer from './slices/startupSlice'
import flowReducer from './slices/flowSlice';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice'
import {rootApi} from "./api/api";


const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        theme,
        auth,
        startupReducer,
        flowReducer,
        questionReducer,
        answerReducer,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
