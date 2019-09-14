import React from 'react';
import { Button } from 'semantic-ui-react';
import styled,{ keyframes } from 'styled-components';
import { shake } from './keyframes/shake';

export default function TestSemantic() {
    return (
        <ButtonWrapper className="float"
        >Hello World</ButtonWrapper>
    );
}

const ButtonWrapper = styled.button`
    animation: ${shake} 3s infinite;
`;