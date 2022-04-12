import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'UPDATE_USER':
            newState = { ...state, user: { ...state.user, ...action.user } }
            break;
            
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;

        case 'ADD_CART':
            newState = {
                ...state,
                user: {
                    ...action.user,
                    cart: [...action.user.cart, action.toy]
                }
            }
            break;

        case 'REMOVE_CART':
            newState = {
                ...state,
                user: {
                    ...action.user,
                    cart: action.user.cart.filter(toy => toy._id !== action.toy._id)
                }
            }
            break;
        default:
    }
    // For debug:
    window.userState = newState;
    return newState;

}
