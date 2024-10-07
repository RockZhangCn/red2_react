import React from 'react';
import Button from './Button.js';
import InfoBoard from './InfoBoard.js';

function CommandBoard ({handleButtonClick, buttons, showedText}) {
    // Assuming 'buttons' is a JSON object
    const buttonKeys = Object.keys(buttons);

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'space-around', margin:'10px'}}>
            <InfoBoard value={showedText}/>
            {/* Render buttons based on the keys of the JSON object */}
            {buttonKeys.map(key => (
                <Button key={key} text={key} disabled={buttons[key]?false:true} onBtnClick={handleButtonClick} />
            ))}
        </div>
    );
}

export default CommandBoard;