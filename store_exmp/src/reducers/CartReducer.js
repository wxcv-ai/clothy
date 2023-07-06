import { ADD_ITEM, INCREMENT, DECREMENT } from '../actions';
import { REMOVE_ITEM } from '../actions';
import { act } from 'react-dom/test-utils';

const s = JSON.parse(localStorage.getItem('cart'));

var initialState = s ? s : [];

export default (state = initialState, action) => {
  state = JSON.parse(localStorage.getItem('cart'));
  switch (action.type) {
    case ADD_ITEM:
      var itemIndex = -1 ;
      for (let i = 0 ; i < state.length ; i++) {

        var item= state[i] ;
        console.log( item.webId ,action.webId)
        if (item.webId == action.webId) {
          itemIndex = i ;
        }
      }
      //const itemIndex = state.findIndex((item) => item.webId == action.webId);
      let actionQuantity = action.quantity === undefined ? 1 : action.quantity;

      const checkWebIdForWish = state
        .map((item) => item.webId)
        .includes(parseInt(action.webId));

      if (itemIndex !== -1) {
        return state.map((product) => {

          if (product.webId === action.webId) {
            return {
              ...product,
              quantity: actionQuantity + product.quantity,
              color :action.color ,
              size : action.size ,

            };
          }
          return product;
        });
      
      } else {
        let oldState = [...state, action.payload];
        let checkState = state.map((item) => {
          if (action.quantity !== undefined && action.webId === item.webId) {
            return { ...item, quantity: action.quantity };
          }
        });

        return oldState.flat(2);
      }

    case REMOVE_ITEM:
      //state.splice(action.payload, 1);
      var new_state = [] ;
      for (let i = 0 ; i < state.length ; i++) {

        var item= state[i] ;
        console.log( item.webId ,action.webId)
        if (item.webId !== action.payload) {
          new_state.push(item) ;
        }
      }

      var s = localStorage.setItem('cart', JSON.stringify(new_state)) ; 
      state = JSON.parse(localStorage.getItem('cart'));
      return new_state ;

    case INCREMENT:
      return state.map((product) => {
        if (product.webId === action.payload) {
          return { ...product, quantity: ++product.quantity };
        }

        return product;
      });

    case DECREMENT:
      return state.map((product) => {
        if (product.webId === action.payload && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    default:
      return state;
  }
};
