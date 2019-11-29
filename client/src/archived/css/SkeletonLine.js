import React from 'react';
import styled from 'styled-components';

export default function SkeletonLine() {
    return(
      <StyledSkeletonLine />
    );
}

const StyledSkeletonPulse = styled.div `
  display: inline-block;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #F0F0F0 0%, #F8F8F8 50%, #F0F0F0 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

const StyledSkeletonLine = styled(StyledSkeletonPulse)`
  width: 5.5em;
  border-radius: 5px;

  &::before {
    content: "\00a0";
  }
`;

