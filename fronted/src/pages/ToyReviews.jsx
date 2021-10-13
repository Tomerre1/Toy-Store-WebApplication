import React from 'react'
import { connect } from 'react-redux'
import { ReviewList } from '../cmps/ReviewList.jsx'
import PropTypes from 'prop-types'
import { loadReviews } from '../store/review.actions'

class _ToyReviews extends React.Component {

    async componentDidMount() {
        await this.props.loadReviews({})
    }

    render() {
        const { reviews } = this.props
        return (
            <div className="card">
                <div className="card__header">
                    <div className="card__name">
                        <p>People Review Us:</p>
                    </div>
                </div>
                <hr className="border" />
                <div className="card__insights">
                    <div className="card__heading">
                        <div className="heading">Store Reviews</div>
                    </div>
                </div>
                <div className="insights">
                    {reviews.length > 0 && <div className="reviews-container">
                        <ReviewList reviews={reviews} />
                    </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    loadReviews,
}

export const ToyReviews = connect(mapStateToProps, mapDispatchToProps)(_ToyReviews)

_ToyReviews.propTypes = {
    loadReviews: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,

}