import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function onLogin(credentials) {
    return (dispatch) => {
        return userService.login(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
                return user;
            })
            .catch(err => {
                showErrorMsg('Cannot login')
                console.log('Cannot login', err)
            })
    }
}

export function onSignup(credentials) {
    return (dispatch) => {
        return userService.signup(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
                return user;
            })
            .catch(err => {
                showErrorMsg('Cannot signup')
                console.log('Cannot signup', err)
            })

    }
}

export function onLogout() {
    return (dispatch) => {
        userService.logout()
            .then(() => dispatch({
                type: 'SET_USER',
                user: null
            }))
            .catch(err => {
                showErrorMsg('Cannot logout')
                console.log('Cannot logout', err)
            })
    }
}

export function onEditUser(user) {
    return (dispatch) => {
        userService.update(user)
            .then(() => dispatch({
                type: 'UPDATE_USER',
                user
            }))
            .catch(err => {
                showErrorMsg('Cannot update')
                console.log('Cannot update user', err)
            })
    }
}
