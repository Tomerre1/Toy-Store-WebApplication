import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    save,
    remove,
    update,

}
window.ts = toyService;

async function query(filterBy) {
    // const res = await axios.get('http://localhost:3030/api/toy', { params: filterBy })
    // return res.data
    const toys = await httpService.get(`toy`, { params: filterBy })    
    return toys
}

async function getById(toyId) {
    // const res = await axios.get(`http://localhost:3030/api/toy/${toyId}`)
    // return res.data
    const toy = await httpService.get(`toy/${toyId}`)
    return toy
}


async function save(toy) {
    // const res = await axios.post(`http://localhost:3030/api/toy`, toy)
    // return res.data
    const savedToy = await httpService.post('toy', toy)
    return savedToy
}

async function update(toy) {
    // const res = await axios.put(`http://localhost:3030/api/toy/`, toy)
    // return res.data
    const updatedToy = await httpService.put('toy', toy)
    return updatedToy
}

async function remove(toyId) {
    // await axios.delete(`http://localhost:3030/api/toy/${toyId}`)
    await httpService.delete(`toy/${toyId}`)
}

// function filterTodos(todos, filterBy) {
//     switch (filterBy.sortBy) {
//         case 'Active':
//             todos = todos.filter(todo => !todo.isDone)
//             break;
//         case 'Completed':
//             todos = todos.filter(todo => todo.isDone)
//             break;
//     }
//     return todos.filter(todo => todo.text.includes(filterBy.text))
// }





// function filterToys(toys, filterBy) {
//     switch (filterBy.sortBy) {
//         case 'date':
//             toys = _sortByDate(toys)
//             break;
//         case 'name':
//             toys = _sortByName(toys)
//             break;
//         case 'price':
//             toys = _sortByPrice(toys)
//             break;
//         case 'all':
//             break;
//     }

//     if (filterBy.selectedOptions.length > 0) {
//         toys = toys.filter(toy => {
//             return filterBy.selectedOptions.some(option => toy.labels.includes(option))
//         })
//     }

//     if (filterBy.inStock === 'true') toys = toys.filter(toy => toy.inStock)

//     return toys.filter(toy => toy.name.toLowerCase().includes(filterBy.name.toLowerCase()))
// }

// function _sortByDate(toys) {
//     return toys.sort(function (a, b) {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     });
// }

// function _sortByName(toys) {
//     return toys.sort(function (a, b) {
//         return a.name.localeCompare(b.name, "en", { sensitivity: 'variant' })
//     });
// }

// function _sortByPrice(toys) {
//     return toys.sort(function (a, b) {
//         return a.price - b.price
//     });
// }

// function query() {
//     return storageService.query(STORAGE_KEY)
// }


// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // toy.owner = userService.getLoggedinUser()
//         toy._id = utilService.makeId()
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }


// function remove(toyId) {
//     return storageService.remove(STORAGE_KEY, toyId)
// }


// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId).then(toy => {
//         toy.reviews = [
//             {
//                 name: 'John',
//                 rating: 5,
//                 comment: 'Great toy!',
//                 createdAt: Date.now(),
//                 _id: utilService.makeId()
//             }
//         ]
//         return toy
//     })
// }