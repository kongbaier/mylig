import { configureStore } from "@reduxjs/toolkit";
import buildingReducer from "./modules/buildingStore";
import displayReducer from "./modules/displayStore";

const store = configureStore({
  reducer: {
    builder: buildingReducer,
    displayer: displayReducer,
  },
});

export default store;
