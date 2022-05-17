import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { labelsReducer } from "./reducers/labels";
import { todosReducer } from "./reducers/todos";

export const store = configureStore({
  reducer: {
    labels: labelsReducer,
    todos: todosReducer,
  },
});

export type TState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;