import React from 'react';
import styled from 'styled-components';

const NumberCard = ({ guessedNumber, digits, positions }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-content">
          <p className="card-title">{guessedNumber}</p>
          <p className="card-para">{digits} Digits, {positions} Positions</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    padding: 0px 20px;
    max-width: 400px;
    height: 50px;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    border-radius: 8px;
    color: white;
    overflow: hidden;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    cursor: pointer;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  .card-content .card-title {
    font-size: 22px;
    font-weight: 600;
    color: inherit;
    text-transform: uppercase;
  }

  .card-content .card-para {
    color: inherit;
    font-size: 16px;
  }

  .card:hover {
    transform: rotateY(10deg) rotateX(10deg) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    z-index: 1;
  }

  .card:hover:before {
    transform: translateX(-100%);
  }

  .card:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    z-index: 1;
  }

  .card:hover:after {
    transform: translateX(100%);
  }
`;

export default NumberCard;
