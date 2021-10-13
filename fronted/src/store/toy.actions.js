import { toyService } from "../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadToys(filterBy) {
    return async (dispatch) => {
        try {
            const toys = await toyService.query(filterBy)
            // showSuccessMsg('Toys loaded successfully')
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        } catch (err) {
            showErrorMsg('Cannot load toys')
        }
    }
}

export function onRemoveToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.remove(toyId)
            dispatch({
                type: 'REMOVE_TOY',
                toyId
            })
            showSuccessMsg('Toy removed')

        } catch (err) {
            showErrorMsg('Cannot remove toy')
            console.log('Cannot remove toy', err)
        }
    }
}

export function onAddToy(toy) {
    return async (dispatch) => {
        try {
            const res = await toyService.save(toy)
            dispatch({
                type: 'ADD_TOY',
                toy: res
            })
            console.log('Added toy', res.data);
            showSuccessMsg('Toy added')
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }
    }
}

export function onEditToy(toyToSave) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.update(toyToSave)
            dispatch({
                type: 'UPDATE_TOY',
                toy: savedToy
            })
            showSuccessMsg('Toy updated')
            return savedToy
        } catch (err) {
            showErrorMsg('Cannot update toy')
            console.log('Cannot save toy', err)
        }
    }
}

export function handleChange(event, filterBy) {
    return (dispatch) => {
        var name, value;
        var filter;
        if (Array.isArray(event)) {
            filter = { selectedOptions: event.map(option => option.label) }
        }
        else if (event.label && event.value) {
            filter = { [event.name]: event.value }
        }
        else {
            name = event.target.name;
            value = event.target.value;
            filter = { [name]: value }
        }
        dispatch({
            type: 'SET_FILTER',
            filterBy: filter
        })
        loadToys({ ...filterBy, ...filter })(dispatch)
    }
}

export function resetFilter() {
    return (dispatch) => {
        dispatch({
            type: 'SET_FILTER',
            filterBy: { name: '', inStock: true, sortBy: 'all', selectedOptions: [] }
        })
    }
}