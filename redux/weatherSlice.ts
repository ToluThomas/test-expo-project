import { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface WeatherState {
  temperature: string;
}

// Define the initial state using that type
const initialState: WeatherState = {
  temperature: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveTemperatureToRedux: (state, action: PayloadAction<string>) => {
      state.temperature = action.payload;
    },
  },
});

export const { saveTemperatureToRedux } = weatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getTemperatureFromRedux = (state: RootState) =>
  state.weather.temperature;

export default weatherSlice.reducer;
