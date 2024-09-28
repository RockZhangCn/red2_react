import React from 'react';
import Button from './Button.js';
import InfoBoard from './InfoBoard.js';

class CommandBoard extends React.Component {
    handleButtonClick = () => {
        console.log('Button clicked!');
    };

    render() {
        return (
            <div style={{display:'flex', alignItems: 'center', justifyContent:'space-around', margin:'10px'}}>
                <InfoBoard value="Zhang Shou Nian"/>
                <Button text = "Ready" onClick={this.handleButtonClick} />
                <Button text = "Shot" onClick={this.handleButtonClick} />
                <Button text = "Skip" onClick={this.handleButtonClick} />
            </div>
        );
    }
}

export default CommandBoard;