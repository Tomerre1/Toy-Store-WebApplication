import React from 'react';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button, TextField } from '@material-ui/core';
import { Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export class ReviewModal extends React.Component {
    state = {
        open: this.props.open,
        review: { comment: '', rating: 0 },
        hover: -1
    }


    labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    componentDidMount() {
        this.setState({ review: { comment: '', rating: null }, open: this.props.open })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ ...prevState, review: { ...prevState.review, [field]: value } }))
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        const { review, hover } = this.state
        const { rating } = this.state.review
        if (!rating) return
        this.props.toggleModal()
        review.comment = this.labels[hover !== -1 ? hover : rating] + ': ' + review.comment;
        this.props.addToyReview(review)
        this.setState(prevState => ({
            ...prevState,
            review: { ...prevState.review, rating: null, comment: '' },
            open: false
        }))
    }

    setRating = ({ target }) => {
        this.setState(prevState => ({ review: { ...prevState.review, rating: +target.value } }))
    }

    setHover = (hover) => {
        this.setState({ hover })
    }

    render() {
        const { comment, rating } = this.state.review
        const { hover } = this.state
        const { open, toggleModal } = this.props
        return (
            <div>
                <Modal open={open} onClose={toggleModal}>
                    <form className="review-add" onSubmit={this.onAddReview}>
                        <h2>Review</h2>
                        <div className="modal-body">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Enter Review"
                                variant={'outlined'}
                                type="text" name="comment"
                                multiline
                                rows={4}
                                value={comment}
                                color={'primary'}
                                onChange={this.handleChange}
                                required
                            />
                            <div className="modal-rating">

                                <Rating
                                    onChange={this.setRating}
                                    size="large"
                                    onChangeActive={(event, newHover) => {
                                        this.setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    value={rating}
                                />
                                {hover !== -1 && (
                                    <Box sx={{ ml: 2 }}>{this.labels[hover !== -1 ? hover : rating]}</Box>
                                )}
                            </div>
                        </div>
                        <Button
                            fullWidth
                            variant={'contained'}
                            color={'primary'}
                            type="submit"
                        >
                            Add Review
                        </Button>
                    </form>
                </Modal>
            </div>

        )
    }
}


