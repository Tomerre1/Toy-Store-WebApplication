const dbService = require('../../services/db.service')
const asyncLocalStorage = require('../../services/als.service')
const { ObjectId } = require('mongodb')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user', // from what collecting 
                    foreignField: '_id', // what is the id in the user
                    localField: 'userId', //what is the id in the reviews
                    as: 'user' // export name
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    from: 'toy',
                    foreignField: '_id',
                    localField: 'toyId',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.user = { fullname: review.user.fullname, _id: review.user._id }
            review.toy = { name: review.toy.name, price: review.toy.price, _id: review.toy.toyId }
            return review
        })
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!isAdmin) criteria.userId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            userId: ObjectId(review.userId),
            toyId: ObjectId(review.toyId),
            comment: review.comment,
            rating: review.rating,
            createdAt: new Date()
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const { toyId, userId } = filterBy;
    if (!toyId && !userId) return {}

    const criteria = [];

    if (toyId) {
        criteria.push({ toyId: ObjectId(toyId) });
    }
    if (userId) {
        criteria.push({ userId: ObjectId(userId) });
    }

    return { $and: criteria }
}

module.exports = {
    query,
    remove,
    add
}


