import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Message.propTypes = {
    data: PropTypes.objectOf(PropTypes.string).isRequired
}
export default function Message({ data }) {
    const { message, time } = data;
    return (
        <DivWrapper>
            {message}
            <span> {time}</span>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 90%;
    border-radius: 15px;
    padding: 20px 10px;
    margin: 15px auto;
    background-color: #f39c12;
    color: #ecf0f1;
`;