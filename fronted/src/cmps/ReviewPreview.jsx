import React from 'react'
import PropTypes from 'prop-types'
import { utilService } from '../services/util.service'
import { Rating } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { Loader } from './Loader'
export function ReviewPreview({ review, removeToyReview, user }) {
    if (!review.toy) { return <Loader /> }
    return (

        <section className="review">
            {(user && ((user._id === review.user._id) || user.hasOwnProperty('isAdmin'))) &&
                <button onClick={() => { removeToyReview(review._id) }} className="delete-review pointer">&times;</button>
            }
            <div className="review-header">
                <Avatar >{review.user.fullname[0].toUpperCase()}</Avatar>
                <p> {review.user.fullname}</p>
                <Rating value={review.rating} readOnly />
            </div>
            <div className="review-comment">
                <p className="toy-name">{review.toy.name}</p>
                <p> {review.comment}</p>
            </div>
            <span>{utilService.formateDate(review.createdAt)}</span>



        </section >
    )
}
ReviewPreview.propTypes = {
    review: PropTypes.object.isRequired
}

