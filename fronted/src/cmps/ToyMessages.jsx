import React from 'react'
import { ToyMessageList } from './ToyMessageList'
import { socketService } from '../services/socket.service'
import { TextField, Button } from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send';
export class ToyMessages extends React.Component {
    state = {
        message: {
            text: '',
            date: null
        },
        messages: [],
        user: this.props.user,
        typingMsg: null,
    }

    componentDidMount() {
        socketService.setup()
        socketService.emit('chat topic', this.props.toy._id)
        socketService.on('chat addMsg', this.addMsg)
        socketService.on('chat addTypingMsg', this.addTypingMsg)


    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg)
        socketService.off('chat addTypingMsg', this.addTypingMsg)
        socketService.terminate()
        // clearTimeout(this.timeout)
    }


    addMsg = newMsg => {
        newMsg.writer = (this.state.user && newMsg.user === this.state.user.fullname) ? 'person' : 'ai'
        this.setState(prevState => ({ ...prevState, messages: [...prevState.messages, newMsg] }))
        // if (this.state.isBotMode) this.sendBotResponse();
    }
    addTypingMsg = typingMsg => {
        this.setState(prevState => ({ ...prevState, typingMsg }))
    }

    // sendBotResponse = () => {
    //     // Handle case: send single bot response (debounce).
    //     this.timeout && clearTimeout(this.timeout)
    //     this.timeout = setTimeout(() => {
    //         this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }))
    //     }, 1500)
    // }


    onChangeMessage = (e) => {
        const { value } = e.target
        const { user } = this.props
        const msg = (value.length > 0) ? `${user?.fullname || 'Guest'} is typing...` : null
        socketService.emit('chat typing', msg)
        this.setState(prevState => ({
            ...prevState,
            message: {
                ...prevState.message,
                text: value
            }
        }))
    }

    onSubmitMessage = (e) => {
        e.preventDefault()
        const { message, user } = this.state
        const date = new Date().toLocaleString()
        message.writer = 'person'
        const from = user?.fullname || 'Guest'
        const text = `${from}: ${message.text}`
        socketService.emit('chat newMsg', { text, user: from, date })
        socketService.emit('chat typing', null)

        this.setState(prevState => ({
            ...prevState,
            message: { text: '', date: null },

        }))
    }

    aiResponse = () => {
        // if(this.state.botMode)
        const { messages } = this.state
        const newMessage = {
            text: 'Support: Yes honey!',
            date: new Date().toLocaleString(),
            writer: 'ai'
        }
        setTimeout(() => {
            this.setState(prevState => ({
                ...prevState,
                messages: [...messages, newMessage],
            }))
        }, 1000)

    }


    render() {
        const { messages, message, typingMsg } = this.state
        return (
            <div className="chat-window flex">
                <div className="chat-box">
                    <h1>Lets Chat</h1>
                    {typingMsg && <p>{typingMsg}</p>}
                    <div className="chat-content">
                        <ToyMessageList messages={messages} />
                    </div>
                    <div className="chat-controller">
                        <form className="flex justify-space-between" onSubmit={this.onSubmitMessage}>
                            <TextField required variant="outlined" label="Chat with me" type="text" name="chat-input" value={message.text} onChange={this.onChangeMessage} />
                            <Button type="submit" color="primary"><SendIcon /></Button>
                        </form>
                    </div>
                </div>
                <button onClick={this.props.toggleChat} className="closeChat">x</button>
            </div>
        )
    }
}
