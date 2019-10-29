import React from 'react';
import Message from './Message';
import styled from 'styled-components';

export default function MessageList({ data }) {
    return (
        <div>
            {data.map(messageData => <Message key={messageData.id} data={messageData} />)}
        </div>
    );
}

const DivWrapper = styled.div`
    width: 96%;
    margin: auto,
`;