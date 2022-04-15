import { httpService } from './http.service'


const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    update,
    getLoggedinUser
}

window.userService = userService;

// function login(credentials) {
//     return storageService.query(STORAGE_KEY).then(users => {
//         const user = users.find(user => user.username === credentials.username &&
//                     user.password === credentials.password)
//         if (user) {
//             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//         }
//         return user;
//     })    
// }


// function signup(userInfo) {
//     return storageService.post(STORAGE_KEY, userInfo)
//         .then((user) => {
//             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//             return user;
//         })
// }



async function login(credentials) {
    // const res = await axios.post('http://localhost:3030/api/auth/login', credentials)
    const user = await httpService.post(`auth/login`, credentials)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function update(credentials) {
    console.log('%c  credentials:', 'color: white;background: red;', credentials);
    // const res = await axios.post('http://localhost:3030/api/auth/login', credentials)
    const user = await httpService.put(`user/${credentials._id}`, credentials)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function signup(userInfo) {
    // const res = await axios.post('http://localhost:3030/api/auth/signup', userInfo)
    const user = await httpService.post('auth/signup', userInfo)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function logout() {
    // await axios.post('http://localhost:3030/api/auth/logout')
    await httpService.post('auth/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}
