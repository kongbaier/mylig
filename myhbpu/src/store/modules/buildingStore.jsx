import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
  name: "buildings",
  initialState: {
    buildings: {}, // 使用建筑名作为 key
  },
  reducers: {
    addBuilding: (state, action) => {
      const { name, data } = action.payload;
      state.buildings[name] = data; // 按建筑名保存数据
    },
  },
});

export const { addBuilding } = buildingSlice.actions;
export default buildingSlice.reducer;
