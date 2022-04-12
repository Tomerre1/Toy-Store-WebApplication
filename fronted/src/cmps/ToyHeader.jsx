import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin, onLogout, onSignup } from '../store/user.actions.js'
import { UserMsg } from './user-msg.jsx'
import { Burger } from './Burger.jsx'
import toyLogo from '../assets/img/toyLogo.svg'
import { setIsShoppingCart } from '../store/system.actions'
import { Cart } from './Cart'
class _ToyHeader extends React.Component {
    state = {
        open: false,
        isMobile: false,
    }

    componentDidMount() {
        if (window.innerWidth < 768) {
            this.setState({ ...this.state, isMobile: true })
        }
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    onLogin = (credentials) => {
        this.props.onLogin(credentials)
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }

    toggleOpen = () => {
        const { open, isMobile } = this.state
        if (!isMobile) return
        this.setState({ open: !open })
    }

    handleResize = () => {
        this.setState({
            isMobile: window.innerWidth < 768
        })
    }

    toggleCart = () => {
        this.props.setIsShoppingCart(!this.props.isShoppingCart)
    }
    render() {
        const { user } = this.props
        return (
            <>
                <div className="navbar">
                    <div className="logo">
                        <Link to="/"><img src={toyLogo} alt="logo" /></Link>
                        {user && <a className="cart-symbol" id="cart" onClick={this.toggleCart} style={{ width: this.state.isMobile ? '240px' : '320px' }}>
                            <i class="fa fa-shopping-cart"></i> Cart
                            <span class="badge">{user?.cart?.length > 0 ? user.cart.length : ''}</span>
                            <Cart isMobile={this.state.isMobile} />
                        </a>}

                    </div>

                    <Burger user={user} onLogout={this.onLogout} open={this.state.open} toggleOpen={this.toggleOpen} />

                </div>
                <UserMsg />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        isShoppingCart: state.systemModule.isShoppingCart
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    setIsShoppingCart
}

export const ToyHeader = connect(mapStateToProps, mapDispatchToProps)(_ToyHeader)

_ToyHeader.propTypes = {
    user: PropTypes.object,
    onLogin: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
}