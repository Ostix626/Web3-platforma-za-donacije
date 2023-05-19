
import React from 'react';
import styled from 'styled-components';

const getGradient = (variation) => {
  switch (variation) {
    case 0:
      return 'linear-gradient(to right, rgba(189,169,253, 0.5), rgba(239, 68, 68, 0.5), rgba(245, 158, 11, 0.5))';
    case 1:
      return 'linear-gradient(to right, #ffadc1, #ff7f87, #ffd58e)';
    case 2:
      return 'linear-gradient(to right, #f472b6, #ef4444, #f59e0b)';
    case 3:
      return 'linear-gradient(to right, #a0aec0, #718096, #4a5568)';
    case 4:
      return 'linear-gradient(to right, #a0aec0, #DFDFDF, #9EC8DC)';
    case 5:
      return 'linear-gradient(to right, #00d5ff, rgba(189,169,253, 0.5), rgba(255, 224, 0, 0.5));';
    default:
      return 'linear-gradient(to right, rgba(189,169,253, 0.5), rgba(239, 68, 68, 0.5), rgba(245, 158, 11, 0.5))';
    
  }
};

const BackgroundAnimate = styled.div`
  width: 100%;
  height: 100%;
  
  background: ${({ theme }) => getGradient(theme)};
  background-size: 400%;
  animation: AnimationName 8s ease infinite;

  @keyframes AnimationName {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Background = ({ children, theme }) => {

    return (
      <>
        <BackgroundAnimate theme={theme}>
          {children}
        </BackgroundAnimate>
      </>
    );
  };

export default Background;
