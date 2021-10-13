import React from 'react';
import { Link } from 'react-router-dom'
import toyLogo from '../assets/img/toyLogo.svg';
import { connect } from 'react-redux'

export class _ToyHome extends React.Component {
    render() {
        const { user } = this.props
        return (
            <div className="home-page full" >
                <div className="hero-text">
                    <h1 className="elegantshadow">Welcome {user && <span>{user.fullname}</span>} to MasterToy !</h1>
                    <img src={toyLogo} alt="MasterToy" />
                    <Link to='/toy'>Shop Now!</Link>
                </div>
            </div>
        );
    }
};


function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const ToyHome = connect(mapStateToProps, null)(_ToyHome)

