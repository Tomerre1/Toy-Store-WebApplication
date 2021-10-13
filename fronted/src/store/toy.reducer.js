const initialState = {
    toys: [],
    filterBy: {
        name: '',
        inStock: false,
        sortBy: 'all',
        selectedOptions: []
    },
}
export function toyReducer(state = initialState, action) {
    var toys
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }

        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, action.toy] }

        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            return { ...state, toys }

        case 'SET_FILTER':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return { ...state }
    }
}
