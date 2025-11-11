import React from 'react';
import styled from 'styled-components';

const DigitInput = ({ value, onChange, onEnter, placeholder, maxDigits=1 }) => {
  const handleChange = (e) => {
    let newValue = e.target.value;

    if (newValue.length <= maxDigits) {
      onChange(newValue);
    }
    else {
      newValue = newValue.slice(0, maxDigits);
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission (optional)
      onEnter();
    }
  };

  return (
    <StyledWrapper>
    <div className="input-wrapper">
      <input
        type="number"
        className="number-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Enter number'}
        min="1"
        maxLength={maxDigits}
      />
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
    width: 48px;
    height: 48px;
    background-color: #8b5cf6;
    border-radius: 50%;
    filter: blur(20px);
    box-shadow: -40px 15px 10px 5px #f9b0b9;
  }

  .input-wrapper:hover {
    box-shadow: 0 0 16px rgba(236, 72, 153, 0.5);
  }

  .input-wrapper:hover {
    transform: rotate(0deg);
  }

  .number-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #a3a3a3;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
    background-color: transparent;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .number-input:focus {
    border-color: #8b5cf6;
  }

`;

export default DigitInput;
