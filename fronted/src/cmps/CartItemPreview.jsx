import React from 'react'

export function CartItemPreview({ cartItem }) {
    return (
        <li class="clearfix">
            <img src={cartItem.img} alt="item1" />
            <span class="item-name">{cartItem.name}</span>
            <span class="item-price">${cartItem.price}</span>
            <span class="item-quantity">Quantity: 01</span>
        </li>
    )
}

