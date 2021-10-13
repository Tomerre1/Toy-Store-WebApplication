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
        default:
    }
    // For debug:
    window.userState = newState;
    return newState;

}
