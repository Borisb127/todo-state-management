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

