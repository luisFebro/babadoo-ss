import React from 'react';
import Message from './Message';

export default function MessageList({ data }) {
    return (
        <div>
            {data.map(messageData => (
                <Message key={messageData.id} data={messageData} />
            ))}
        </div>
    );
}
