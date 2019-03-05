/**
 * Created by zhaoyue on 2017/5/1.
 */
export const ADD_TOAST = 'ADD_TOAST';
export const BURN_TOAST = 'BURN_TOAST';

let toastID = 0;
const initialState = [];

export default function toast(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TOAST:
      return state.concat(action.payload);
    case BURN_TOAST:
      const id = action.payload;
      const burnIndex = Array.findIndex(state, item=> item.id === id);
      const stateLen = state.length;
      return state.slice(0, burnIndex).concat(state.slice(burnIndex+1, stateLen));
    default:
      return state;
  }
}

export function addToast(toast) {
  return {
    type: ADD_TOAST,
    payload: {
      id: toastID++,
      ...toast,
    },
  };
}

export function burnToast(id) {
  return {
    type: BURN_TOAST,
    payload: id,
  };
}
