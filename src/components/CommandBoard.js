import React from 'react';
import Button from './Button.js';
import InfoBoard from './InfoBoard.js';
import { generateAvatarPath } from '../utility/AvatarConvert.js';
import { useSelector } from 'react-redux';

function CommandBoard ({handleButtonClick, buttons, showedText}) {
    // Assuming 'buttons' is a JSON object
    const buttonKeys = Object.keys(buttons);
    const user = useSelector(state => state.user);

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'space-around', margin:'10px'}}>
            <InfoBoard value={showedText}/>
            {/* Render buttons based on the keys of the JSON object */}
            {buttonKeys.map(key => (
                <Button key={key} text={key} disabled={buttons[key]?false:true} onBtnClick={handleButtonClick} />
            ))}
            <img 
                    src={generateAvatarPath(user.avatar)} 
                    style={{ display: "inline", 
                    width:'50px', height:'50px', borderRadius: '50%', }} 
                    title={user.nickName}
                    
                ></img>
        </div>
    );
}

export default CommandBoard;