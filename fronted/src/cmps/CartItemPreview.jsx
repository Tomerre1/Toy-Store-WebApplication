import React from 'react'

export function CartItemPreview({ cartItem }) {
    return (
        <li class="clearfix">
            <img src={`https://robohash.org/${cartItem.name}`} alt="item1" />
            <div style={{ marginTop: '7px' }}>
                <span class="item-name">{cartItem.name}</span>
                <span class="item-price">${cartItem.price}</span>
                <span class="item-quantity">Quantity: 01</span>
            </div>
        </li>
    )
}

