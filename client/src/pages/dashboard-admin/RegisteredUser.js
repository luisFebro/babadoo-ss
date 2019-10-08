import React from 'react';
import styled from 'styled-components';
export default function RegisteredUser({ name, email }) {
    console.log(name);
    console.log(email);
    return (
        <DivWrapper className="text-default">
            <div>
                <p>Name: {name}</p>
            </div>
            <div>
                <p>Email: {email}</p>
            </div>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 20px 10px;
    margin: 15px auto;
    background-color: #f39c12;
    color: #ecf0f1;
`;