import { createSlice } from "@reduxjs/toolkit";

export type Item = {
  image: string;
  title: string;
  amount: number;
  cost: number;
  id: number;
};

export type CartType = {
  items: Array<Item>;
  totalCost: number;
};

type Action = {
  payload: any;
};

const cartItemsSlice = createSlice({
  name: "cartItemsSlice",
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    ADD(state: CartType, action: Action) {
      const itemInCart: Item | undefined = state.items.find(
        (item) => action.payload.title === item.title
      );
      if (itemInCart) {
        state.items[state.items.indexOf(itemInCart)].amount +=
          action.payload.amount;
        state.items[state.items.indexOf(itemInCart)].cost = action.payload.cost;
        state.totalCost += action.payload.cost;
      } else {
        state.items.push(action.payload);
        state.totalCost += action.payload.cost;
      }
    },
    DELETE(state: CartType, action: Action) {
      const CartItem: Item | undefined = state.items.find(
        (item) => action.payload.title === item.title
      );
      if (CartItem) {
        if (CartItem.amount > 1) {
          state.items[state.items.indexOf(CartItem)].amount -= 1;
          state.totalCost -= action.payload.cost;
        } else {
          state.totalCost -= action.payload.cost;
          state.items = state.items.filter(
            (item) => action.payload.title !== item.title
          );
        }
      }
    },
  },
});

export default cartItemsSlice.reducer;
export const { ADD, DELETE } = cartItemsSlice.actions;
