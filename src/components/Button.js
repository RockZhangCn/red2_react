// ChildButton.js
import React from 'react';

const Button = ({ text, onBtnClick, disabled }) => {
    console.log("Button disabled is", disabled);
    return (
        <button className="btn btn-primary" onClick={() => onBtnClick(text)} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;