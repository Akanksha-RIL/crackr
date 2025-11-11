import React from 'react';
import styled from 'styled-components';

const GameButton = ({ title, onClick }) => {
  return (
    <StyledWrapper>
    <div className="input-wrapper">
        <button
            className="game-button"
            onClick={onClick}
        >
            {title}
        </button>
    </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-wrapper {
    position: relative;
    background-color: #f9fafb;
    border-radius: 10px;
    overflow: hidden;
    padding: 8px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.3);
    transition: box-shadow 0.3s ease;
  }

  .input-wrapper::before {
    content: '';
    position: absolute;
    right: 0;
    height: 48px;
    background-color: #8b5cf6;
    border-radius: 50%;
    filter: blur(20px);
    box-shadow: -200px 45px 30px 45px #f9b0b9a1, 55px 45px 190px 120px #8b5cf6;
  }

  .input-wrapper:hover {
    box-shadow: 0 0 16px rgba(135, 46, 236, 0.5);
  }

  .input-wrapper:hover {
    transform: rotate(0deg);
  }

  .game-button {
    background: no-repeat;
    cursor: pointer;
    letter-spacing: 2px;
    font-size: 14px;
    text-transform: uppercase;

    width: 100%;
    padding: 10px;
    border: 1px solid #a3a3a3;
    border-radius: 8px;
    font-weight: 600;
    background-color: transparent;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .game-button:focus {
    border-color: #8b5cf6;
  }
`;

export default GameButton;
