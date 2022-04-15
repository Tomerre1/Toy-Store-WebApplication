import React from 'react'
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux'
import { ReviewList } from '../cmps/ReviewList.jsx'
import PropTypes from 'prop-types'
import { loadReviews, removeReview } from '../store/review.actions'
import { onEditUser } from '../store/user.actions'
import { ToyUserEdit } from '../cmps/ToyUserEdit'

import { Link } from 'react-router-dom';

class _ToyUserDetails extends React.Component {
    state = {
        isEdit: false
    }
    async componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/')
            return
        }
        const userId = this.props.user._id
        await this.props.loadReviews({ userId })
        this.setState({ isEdit: false })
    }

    removeToyReview = async (reviewId) => {
        await this.props.removeReview(reviewId)
    }

    handleEdit = async (user) => {
        await this.props.onEditUser(user)
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !this.state.isEdit }))
    }

    render() {
        const { user, reviews } = this.props
        const { isEdit } = this.state
        if (!user) return <div>Loading...</div>
        return (
            <div className={`card ${isEdit ? 'user-edit' : ''}`} >
                <div className="card__header">
                    <div className="card__profile">
                        <Avatar >{(user.fullname && user?.fullname[0].toUpperCase()) || ''}</Avatar>
                    </div>
                    <div className="card__name">
                        <p>Hi, {user.fullname}</p>
                    </div>
                    <div className="card__button">
                        <button onClick={this.toggleEdit}>
                            <span>{(isEdit ? 'Back' : 'Edit')}</span>
                        </button>
                    </div>
                </div>
                <hr className="border" />
                <div className="card__insights">
                    <div className="card__heading">
                        <div className="heading">{!isEdit ? 'My Reviews' : 'User Edit'}</div>
                    </div>
                </div>
                {!isEdit && <>
                    <div className="insights">
                        {reviews.length > 0 && <div className="reviews-container">
                            <ReviewList user={user} removeToyReview={this.removeToyReview} reviews={reviews} />
                        </div>
                        }
                        {!reviews.length && <>
                            <span>You dont have any reviews yet, Check our toys  <Link to='/toy'>Here</Link></span>
                        </>
                        }
                    </div>
                </>}
                {isEdit && <ToyUserEdit handleEdit={this.handleEdit} />}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    loadReviews,
    removeReview,
    onEditUser
}

export const ToyUserDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyUserDetails)

_ToyUserDetails.propTypes = {
    user: PropTypes.object,
    reviews: PropTypes.array,
    loadReviews: PropTypes.func,
    removeReview: PropTypes.func,
}