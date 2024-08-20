import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
  name: "appReducer",
  initialState: {
    user: null,
    isLogged: false,
    openMenu: false,
    loader: false,
    cartCount: 0,
    toast: { message: "", open: false, type: "success" },
    filter: {},
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.isLogged = true;
      state.user = payload;
    },
    setLogged: (state) => {
      state.isLogged = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLogged = false;
    },
    toggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
    closeMenu: (state) => {
      state.openMenu = false;
    },
    setToast: (state, { payload }) => {
      state.toast = { ...payload, open: true };
    },
    closeToast: (state) => {
      state.toast = {
        duration: 3000,
        open: false,
        message: "",
        type: "success",
      };
    },
    handleLoader: (state, { payload }) => {
      state.loader = payload;
    },
    setCartCount: (state, { payload }) => {
      state.cartCount = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const {
  setLogged,
  setToast,
  setUser,
  logoutUser,
  handleLoader,
  removeToast,
  toggleMenu,
  setTheme,
  closeToast,
  setCartCount,
  closeMenu,
  setFilter,
} = reducer.actions;

export default reducer.reducer;
