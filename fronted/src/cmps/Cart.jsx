import React from 'react'
import { useSelector } from 'react-redux'
import { CartItemPreview } from './CartItemPreview'

export function Cart() {
    const isShoppingCart = useSelector(state => state.systemModule.isShoppingCart)
    const user = useSelector(state => state.userModule.user)
    const userTotalCart = user && user.cart ? user.cart.reduce((acc, curr) => acc + curr.price, 0) : 0
    return (
        <div class="container">
            <div class="shopping-cart" style={{ display: isShoppingCart ? 'block' : 'none', width: '320px' }} onClick={(event) => event.stopPropagation()} >
                <div class="shopping-cart-header">
                    <div>
                        <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">{user?.cart?.length > 0 ? user.cart.length : ''}</span>
                    </div>
                    <div class="shopping-cart-total">
                        <span class="lighter-text">Total:</span>
                        <span class="main-color-text">${userTotalCart}</span>
                    </div>
                </div>
                <ul class="shopping-cart-items">
                    {user?.cart?.map((item, i) => <CartItemPreview cartItem={item} user={user} key={i} />)}
                </ul>
                <a href="#" class="button">Checkout</a>
            </div>
        </div >
    )
}
