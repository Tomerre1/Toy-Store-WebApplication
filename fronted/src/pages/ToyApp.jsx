import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { ToyAdd } from '../cmps/ToyAdd.jsx'
import { loadToys, onAddToy, onEditToy, onRemoveToy, handleChange, resetFilter } from '../store/toy.actions.js'

class _ToyApp extends React.Component {
    state = {
        isAdd: false,
    }

    componentDidMount() {
        this.props.loadToys(this.props.filterBy)
    }

    onRemoveToy = (toyId) => {
        this.props.onRemoveToy(toyId)
    }

    componentWillUnmount() {
        this.props.resetFilter()
    }

    onAddToy = (toy) => {
        console.log('%c  toy:', 'color: white;background: red;', toy);
        toy.labels = toy.labels.map(option => option.label)
        this.props.onAddToy(toy)
        this.onToggleAdd()
    }

    onToggleAdd = () => {
        this.setState({ isAdd: !this.state.isAdd })
    }

    onEditToy = (toyId) => {
        this.props.history.push(`/toy/edit/${toyId}`)
    }

    onHandleChange = (event) => {
        this.props.handleChange(event, this.props.filterBy)
    }

    render() {
        const { toys, user } = this.props
        const { isAdd } = this.state
        return (
            <main className="toy-app">
                <ToyFilter handleChange={this.onHandleChange} />
                {isAdd && user && user.isAdmin && <ToyAdd onAddToy={this.onAddToy} onToggleAdd={this.onToggleAdd} />}
                {!isAdd && user && user.isAdmin &&
                    <div className="wrap">
                        <button onClick={this.onToggleAdd}>Add Toy</button>
                    </div>
                }
                <ToyList toys={toys} user={user} onRemoveToy={this.onRemoveToy} onEditToy={this.onEditToy} />
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        filterBy: state.toyModule.filterBy,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadToys,
    onRemoveToy,
    onAddToy,
    onEditToy,
    handleChange,
    resetFilter
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)

_ToyApp.propTypes = {
    loadToys: PropTypes.func.isRequired,
    onAddToy: PropTypes.func.isRequired,
    onEditToy: PropTypes.func.isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    toys: PropTypes.array.isRequired,
    filterBy: PropTypes.object.isRequired,
}