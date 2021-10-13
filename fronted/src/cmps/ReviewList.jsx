import React from 'react'
import PropTypes from 'prop-types'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews, removeToyReview, user }) {
    return (
        <div className="reviews-list">
            {reviews.map((review, idx) => <ReviewPreview key={idx} user={user} removeToyReview={removeToyReview} review={review} />)}
        </div>
    )
}
ReviewList.propTypes = {
    reviews: PropTypes.array.isRequired
}