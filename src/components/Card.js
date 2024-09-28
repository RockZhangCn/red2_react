import { useEffect, useState } from 'react';

function Card({value, long, horizontal, isLast, onClick}) {

    const [selected, setSelected] = useState(false);

    function adjustThePostOfPicture(value) {
        console.log("Picture", value, "before is clicked, status is", selected);
        setSelected(prevSelected => {
            const newSelected = !prevSelected;
            console.log("Picture", value, "is clicked, status is", newSelected); // 使用新状态
            onClick(newSelected, value);
            return newSelected;
        });
    }

    if (horizontal) {
        // Check if it's the last image
        const style = isLast ? { transform:selected&&value!=55?'translateY(-20px)':'translateY(0px)',  height: 'auto', width: 'auto', transition: 'transform 0.3s ease' } : 
        { transform:selected&&value!=55?'translateY(-20px)':'translateY(0px)', overflow: 'hidden', height: '100%', textAlign: "center", width: '30px', transition: 'transform 0.3s ease'};
        return (
            <div style={style}>
                <img className={"clickableimage"} src={'/card/poker_' + value + '.png'} 
                onClick={()=>{ adjustThePostOfPicture(value); }}
                style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', width: 'auto' }} />
            </div>
        );
    } else {
        // Adjust height for the last image
        const style = isLast ? { overflow: 'hidden', textAlign: "center", height: 'auto' } : { overflow: 'hidden', textAlign: "center", height: '30px' };
        return (
            <div style={style}>
                <img src={'/card/poker_' + value + '.png'} 
                style={{width: long, marginLeft:'auto', marginRight:'auto', height: 'auto'}}/>
            </div>
        );
    }
}

export default Card;
