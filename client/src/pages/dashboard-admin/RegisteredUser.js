import React from 'react';
import styled from 'styled-components';
export default function RegisteredUser({ name, email }) {
    console.log(name);
    console.log(email);
    return (
        <DivWrapper className="text-default">
            <div>
                <p>Name</p>
            </div>
            <div>
                <p>Email</p>
            </div>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 100%;
    border-radius: 10px;
    padding: 20px 10px;
    margin: 30px;
    background-color: #f39c12;
    color: #ecf0f1;
`;