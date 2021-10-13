const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        toys = _sortToys(toys, filterBy.sortBy)
        return toys
    } catch (err) {
        logger.error('cannot find cars', err)
        throw err
    }
}


async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) criteria.name = { $regex: filterBy.name, $options: 'i' }

    if (filterBy.inStock === 'true') criteria.inStock = { $eq: true }

    if (filterBy.selectedOptions && filterBy.selectedOptions.length > 0) {
        criteria.labels = { $all: filterBy.selectedOptions }
    }

    return criteria
}

function _sortToys(toys, sortBy) {
    switch (sortBy) {
        case 'date':
            toys = _sortByDate(toys)
            break;
        case 'name':
            toys = _sortByName(toys)
            break;
        case 'price':
            toys = _sortByPrice(toys)
            break;
        case 'all':
            break;
    }
    return toys
}

function _sortByDate(toys) {
    return toys.sort(function (a, b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    });
}

function _sortByName(toys) {
    return toys.sort(function (a, b) {
        return a.name.localeCompare(b.name, "en", { sensitivity: 'variant' })
    });
}

function _sortByPrice(toys) {
    return toys.sort(function (a, b) {
        return a.price - b.price
    });
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
