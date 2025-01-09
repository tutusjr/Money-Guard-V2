import { createSlice } from "@reduxjs/toolkit";
import { fetchBankCurrency } from "./operations";


const bankApiSlice = createSlice({
    name: "bankApi",
    initialState: {
        currency : [],
        error: null,
        status: "idle",
    },
    extraReducers: (builder => {
        builder.addCase(fetchBankCurrency.fulfilled, (state, action) => {
            state.currency = action.payload
        }).addCase(fetchBankCurrency.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchBankCurrency.rejected, (state, action) => {
            state.error = action.payload
        })
    })
})


export default bankApiSlice.reducer;