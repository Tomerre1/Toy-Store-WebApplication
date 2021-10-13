import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export function ToyPreview({ toy, onRemoveToy, onEditToy, user }) {
    return (
        <Link to={`/toy/details/${toy._id}`}>
            <li className='toy-preview'>
                <p>{toy.name}</p>
                <img src={`https://robohash.org/${toy.name}`} alt="toy" />
                <span><p>Price:{toy.price.toLocaleString()}$</p></span>
                {!toy.inStock && <span className="sold-out">Sold out</span>}
                {user && user.isAdmin && <div className="toy-preview-btns">
                    <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); onRemoveToy(toy._id) }} className="trash-btn"><i className="fas fa-trash"></i></button>
                    <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); onEditToy(toy._id) }} className="edit-btn"><i className="fas fa-edit"></i></button>
                </div>}
            </li>
        </Link>
    )
}

ToyPreview.propTypes = {
    onEditToy: PropTypes.func.isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    toy: PropTypes.object.isRequired,
}

