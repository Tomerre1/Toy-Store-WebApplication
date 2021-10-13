import PropTypes from 'prop-types'
import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy, onEditToy, user }) {
    return (
        <div className="toy-container">
            <ul className="toy-list">
                {toys.map(toy => <ToyPreview toy={toy} user={user} key={toy._id} onEditToy={onEditToy} onRemoveToy={onRemoveToy} />)}
            </ul>
        </div >
    )
}

ToyList.propTypes = {
    onEditToy: PropTypes.func.isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    toys: PropTypes.array.isRequired
}