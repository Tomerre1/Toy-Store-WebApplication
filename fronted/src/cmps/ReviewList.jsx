import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews, removeToyReview, user }) {
    const ref = useRef()
    useEffect(() => {
        ref.current.scroll({
            top: ref.current.scrollHeight,
            behavior: "smooth",
        });
    }, [reviews])

    return (
        <div className="reviews-list" ref={ref}>
            {reviews.map((review, idx) => <ReviewPreview key={idx} user={user} removeToyReview={removeToyReview} review={review} />)}
        </div>
    )
}
ReviewList.propTypes = {
    reviews: PropTypes.array.isRequired
}