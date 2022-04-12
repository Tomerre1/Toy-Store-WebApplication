import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { onDeleteItemCart } from '../store/user.actions'
export function CartItemPreview({ user, cartItem }) {
    const handleDelete = async () => {
        await onDeleteItemCart(user, cartItem)
        console.log('%c  cartItem:', 'color: white;background: red;', cartItem);
    }
    return (
        <li class="clearfix">
            <img src={`https://robohash.org/${cartItem.name}`} alt="item1" />
            <div style={{ marginTop: '7px' }}>
                <span class="item-name">{cartItem.name}</span>
                <span class="item-price">${cartItem.price}</span>
                <span class="item-quantity">Quantity: 01</span>
            </div>
            <CloseIcon onClick={handleDelete} />
        </li>
    )
}

