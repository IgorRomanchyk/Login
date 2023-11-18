import { configureStore } from "@reduxjs/toolkit";
import { imagesApi } from "./imagesApi";
import userSlice from "./userSlice";
import imagesSlice from "./imagesSlice";

export const store = configureStore({
  reducer: {
    images: imagesSlice,
    user: userSlice,
    [imagesApi.reducerPath]: imagesApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(imagesApi.middleware)
})