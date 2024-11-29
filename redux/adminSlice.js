import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: "",
  reducers: {
    getAllAdmins(state, action) {
      return action.payload;
    },
    editAdmin(state, action) {
      return state.map((admin) => {
        return admin.id === action.payload.id ? action.payload : admin;
      });
    },
    deleteAdmin(state, action) {
      return state.filter((admin) => admin.id !== action.payload);
    },
    createAdmin(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = adminSlice;
export const { getAllAdmins, deleteAdmin, editAdmin, createAdmin } = actions;
export default reducer;
