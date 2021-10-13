const fs = require('fs')
const gUsers = require('../data/user.json')

function query() {
    return Promise.resolve(gUsers);
}

function checkLogin(credentials) {
    const userAuth = gUsers.find(currUser => currUser.password === credentials.password && currUser.username === credentials.username);
    if (!userAuth) return Promise.resolve(null);
    const currUser = { ...userAuth };
    delete currUser.password
    return Promise.resolve(currUser);
}

function save(user) {
    if (user._id) {
        const userIdx = gUsers.findIndex(currUser => currUser._id === user._id);
        if (userIdx === -1) return Promise.resolve('wrong user details');
        gUsers[userIdx] = { ...gUsers[userIdx], ...user }
    }
    else {
        user._id = _makeId();
        gUsers.push(user);
    }
    return _saveUsersToFile().then(() => {
        const userReturned = { ...user }
        delete userReturned.password;
        return userReturned;
    })
}

module.exports = {
    checkLogin,
    save,
    query,
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}
