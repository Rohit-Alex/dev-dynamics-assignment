import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { UserGithubActivitySlice } from "Slices/FetchUserGithubActivity";

const rootReducer = combineReducers({
  [UserGithubActivitySlice.name]: UserGithubActivitySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
