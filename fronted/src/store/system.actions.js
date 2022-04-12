export function setIsShoppingCart(isShoppingCart) {
  return dispatch => {
    try {
      dispatch({ type: 'SET_CART',isShoppingCart })
    } catch (err) { }
  }
}
