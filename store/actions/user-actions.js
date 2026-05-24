import { userService } from '../../services/user.service.js'
import { store, SET_USER } from '../store.js'

export function userLogin(credentials) {
    console.log('login credentials:', credentials)

    return userService.login(credentials)
        .then(loggedinUser => {
            console.log('login success:', loggedinUser)


            store.dispatch({ type: SET_USER, loggedinUser })
            return loggedinUser
        })
}

export function userSignup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
            return loggedinUser
        })
}


export function userLogout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, loggedinUser: null })
        })
}

export function addActivity(userId, txt) {
    return userService.addActivity(userId, txt)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
        })
        .catch(err => {
            console.error('Cannot add activity:', err)
            throw err
        })
}

export function updateBalance(userId, amount) {
    return userService.updateBalance(userId, amount)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
        })
        .catch(err => {
            console.error('Cannot update balance:', err)
            throw err
        })
}