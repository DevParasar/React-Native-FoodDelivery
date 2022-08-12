import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,action) => {
      state.items = [...state.items, action.payload] 
      //[keep whatever is in the basket, add in the end]
    },
    removeToBasket: (state,action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      //it checks if the item we want to remove is present 
      let newBasket = [...state.items];

      //deletes the item in the basket or sends a warning if it is not present
      if(index => 0){
        newBasket.splice(index, 1);
      }else{
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
})

export const { addToBasket, removeToBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithID = (state, id) => 
  state.basket.items.filter((item) => item.id === id );
  //this will return only the item with the specified id

  export const selectBasketTotal = (state) => {
    state.basket.items.reduce((total, item) => total +=item.price, 0)}

export default basketSlice.reducer;