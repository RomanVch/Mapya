
import { combineReducers, createStore} from 'redux';
import {mapReducer} from "./mapReducer";

const rootReducer = combineReducers({
    state: mapReducer,
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
