import React from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'


class _ToyUserEdit extends React.Component {
    state = {
        user: null
    }
    componentDidMount() {
        this.setState({ user: { ...this.props.user } })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState((prevState) => ({ ...prevState, user: { ...prevState.user, [name]: value } }))
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const { user } = this.state
        this.props.handleEdit(user)
    }


    render() {
        const { user } = this.state
        if (!user) return <div> Loading...</div>
        return (
            <form className="edit-user" onSubmit={this.onSubmit}>
                <TextField value={user.username} type='text' variant="outlined" label="Edit Username" name='username' onChange={this.handleChange} />
                <TextField value={user.fullname} type='text' variant="outlined" label="Edit Fullname" name='fullname' onChange={this.handleChange} />
                <button>Submit</button>
            </form>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const ToyUserEdit = connect(mapStateToProps, null)(_ToyUserEdit)

