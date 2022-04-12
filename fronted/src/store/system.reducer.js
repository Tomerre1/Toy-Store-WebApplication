const initialState = {
  isLoading: false,
  isShoppingCart: false,
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    case 'SET_CART':
      return { ...state, isShoppingCart: action.isShoppingCart }
    default: return state
  }
}
