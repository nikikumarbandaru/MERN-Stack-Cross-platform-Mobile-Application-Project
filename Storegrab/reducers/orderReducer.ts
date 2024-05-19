import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    orders: any[];
    error: string | null;
}

const initialState: State = {
    orders: [],
    error: null
};
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrdersSuccess: (state, action: PayloadAction<any[]>) => {
            console.log(action.payload)
            state.orders = action.payload;
        },
        getOrdersFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        placeOrderSuccess: (state, action: PayloadAction<any>) => {
            state.orders.push(action.payload)
        },
        placeOrderFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        clearOrders: (state) => {
            state.orders = [];
            state.error = null; 
        }
    },
});

export const {
    getOrdersSuccess,
    getOrdersFailure,
    placeOrderSuccess,
    placeOrderFailure,
    clearOrders
} = ordersSlice.actions;
export default ordersSlice.reducer;