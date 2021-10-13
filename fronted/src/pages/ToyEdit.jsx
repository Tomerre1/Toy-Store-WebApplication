import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toyService } from '../services/toy.service'
import { onEditToy } from '../store/toy.actions'
import { Button, Input } from '@material-ui/core';


class _ToyEdit extends React.Component {
  state = {
    toy: null,
  }

  async componentDidMount() {
    const { toyId } = this.props.match.params
    const toy = await toyService.getById(toyId)
    this.setState(prevState => ({ ...prevState, toy }))
  }

  handleChange = (event) => {
    const { name } = event.target
    const value = (event.target.type === 'number') ? +event.target.value : event.target.value
    this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [name]: value } }))
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { toy } = this.state
    await this.props.onEditToy(toy)
    this.props.history.push('/toy')
  }

  render() {
    const { toy } = this.state
    if (!toy) return <div> Loading...</div>
    return (


      <div className="container">
        <div className="product-image">
          <img src={`https://robohash.org/${toy.name}`} alt="" className="product-logo" />
        </div>

        <div className="product-details">
          <header>
            <h1 className="title">{toy.name}</h1>
          </header>
          <form className="edit-toy" onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="name"
              value={toy.name}
              onChange={this.handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              value={toy.price}
              onChange={this.handleChange}
              required
            />
            <Button type="submit" className="back">Submit Edit</Button>
          </form>

        </div>
      </div >



    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = {
  onEditToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)

_ToyEdit.propTypes = {
  onEditToy: PropTypes.func.isRequired,
}