// ChildButton.js
import React from 'react';

const Button = ({ text, onBtnClick }) => {
    return (
        <button className="btn btn-primary" onClick={() => onBtnClick(text)}>
            {text}
        </button>
    );
};

export default Button;