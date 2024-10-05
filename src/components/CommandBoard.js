import React from 'react';
import Button from './Button.js';
import InfoBoard from './InfoBoard.js';

function CommandBoard ({handleButtonClick}) {

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'space-around', margin:'10px'}}>
            <InfoBoard value="Game information"/>
            <Button text = "Ready" onBtnClick={handleButtonClick} />
            <Button text = "Shot" onBtnClick={handleButtonClick} />
            <Button text = "Skip" onBtnClick={handleButtonClick} />
        </div>
    );
    
}

export default CommandBoard;