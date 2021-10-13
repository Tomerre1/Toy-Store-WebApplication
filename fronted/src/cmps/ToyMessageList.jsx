import React from 'react'
import { ToyMessagePreview } from './ToyMessagePreview'

export function ToyMessageList({ messages }) {
    return (
        <React.Fragment>
            {messages.map((message, idx) => <ToyMessagePreview key={idx} message={message} />)}
        </React.Fragment>
    )
}

