import React from 'react'

export function ToyMessagePreview({ message }) {
    return (
        <div className="ai-person-container">
            <div className={message.writer}>
                <p>{message.text}</p>
            </div>
            <span className={`${message.writer}-date`}>{message.date}</span>
        </div>
    )
}

