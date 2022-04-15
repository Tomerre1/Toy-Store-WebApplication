import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ReviewModal } from '../cmps/ReviewModal'
import { toyService } from '../services/toy.service'
import { ReviewList } from '../cmps/ReviewList'
import { ToyMessages } from '../cmps/ToyMessages'
import { ToyPopup } from '../cmps/ToyPopup'
import { addReview, loadReviews, removeReview } from '../store/review.actions'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { onAddCart } from '../store/user.actions'



export class _ToyDetails extends React.Component {
    state = {
        toy: null,
        isChatOpen: false,
        isReviewAdd: false,
    }

    async componentDidMount() {
        const { toyId } = this.props.match.params
        const toy = await toyService.getById(toyId)
        console.log('%c  toy:', 'color: white;background: red;', toy);
        await this.props.loadReviews({ toyId })
        this.setState(prevState => ({ ...prevState, toy }))
        document.body.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.escFunction, false);
    }

    toggleChat = () => {
        this.setState(prevState => ({ ...prevState, isChatOpen: !prevState.isChatOpen }))
    }

    toggleReviewAdd = () => {
        this.setState(prevState => ({ ...prevState, isReviewAdd: !prevState.isReviewAdd }))
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState(prevState => ({ ...prevState, isChatOpen: false }))
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({ ...prevState, isReviewAdd: !prevState.isReviewAdd }))
    }

    addToyReview = async (review) => {
        const { toyId } = this.props.match.params
        review.toyId = toyId
        await this.props.addReview(review)
        await this.props.loadReviews({ toyId })
    }

    removeToyReview = async (reviewId) => {
        await this.props.removeReview(reviewId)
    }

    addToCart = async () => {
        await this.props.onAddCart(this.props.user, this.state.toy)
    }

    render() {
        const { toy, isChatOpen, isReviewAdd } = this.state
        const { user, reviews } = this.props
        if (!toy) return <div> Loading from Toy Details...</div>
        return (
            <div className="container">
                <div className="product-image">
                    <img src={`https://robohash.org/${toy.name}`} alt="" className="product-logo" />
                </div>

                <div className="product-details">
                    <header>
                        <h1 className="title">{toy.name}</h1>
                        <div className="price">
                            <span className="before">{toy.price * 2}$</span>
                            <span className="current">{toy.price}$</span>
                        </div>
                    </header>
                    <article>
                        <h5>Description</h5>
                        <p>Lorem ipsum dolorl sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </article>
                    <div className="controls">
                        <div className="labels">
                            <div className="toy-labels">
                                {toy.labels.map((label, idx) => <div key={idx}><p className="label">{label}</p></div>)}
                                <div>
                                    <p className={`label-${(toy.inStock) ? 'green' : 'red'}`}>{(toy.inStock) ? 'In Stock' : 'Sold Out'}</p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {!user && <p>To write a review please login <Link to="/login"> Here</Link></p>}

                    {reviews.length > 0 && <div className="reviews-container">
                        <ReviewList user={user} removeToyReview={this.removeToyReview} reviews={reviews} />
                    </div>
                    }
                    <ReviewModal />

                    {isChatOpen && <ToyPopup>
                        <ToyMessages toy={toy} user={user} toggleChat={this.toggleChat} />
                    </ToyPopup>}
                    {!isChatOpen && <button onClick={this.toggleChat} className="chat-button"><ChatRoundedIcon /></button>}
                    <div className="details-btns">
                        <Link to="/toy" className="back" type="button">
                            <span>Back Toys</span>
                        </Link>
                        {user && <button className="back" onClick={this.toggleReviewAdd}>
                            <span>Add Review</span>
                        </button>}
                        {user && this.state.toy?.inStock && <button className="back" onClick={this.addToCart}>
                            <span>Add To Cart</span>
                        </button>}
                    </div>
                    <ReviewModal open={isReviewAdd} addToyReview={this.addToyReview} toggleModal={this.toggleModal} />
                </div>


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
    addReview,
    onAddCart
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)

_ToyDetails.propTypes = {
    addReview: PropTypes.func.isRequired,
    loadReviews: PropTypes.func.isRequired,
    removeReview: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
}