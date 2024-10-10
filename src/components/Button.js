// ChildButton.js
import React from 'react';

const Button = ({ text, onBtnClick, disabled }) => {
    return (
        <button className="btn btn-primary" onClick={() => onBtnClick(text)} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;