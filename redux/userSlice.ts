import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    signUserOut: (state) => {
      state.isLoggedIn = false;
    },
    signUserIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { signUserIn, signUserOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isUserLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
