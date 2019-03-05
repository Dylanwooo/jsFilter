import { combineReducers } from 'redux'

// 复合接口数据
function hotProducts(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_HOT_PRODUCT':
      const { hotProducts = {} } = action.payload
      return hotProducts
    default:
      return state;
  }
}

export default combineReducers({
  hotProducts
})