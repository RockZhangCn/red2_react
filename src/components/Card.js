function Card({value, long, horizontal, isLast}) {
    if (horizontal) {
        // Check if it's the last image
        const style = isLast ? { height: 'auto', width: 'auto' } : { overflow: 'hidden', height: '100%', backgroundColor: 'white', textAlign: "center", width: '30px' };
        return (
            <div style={style}>
                <img src={'/card/poker_' + value + '.png'} 
                style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', width: 'auto' }} />
            </div>
        );
    } else {
        // Adjust height for the last image
        const style = isLast ? { overflow: 'hidden', textAlign: "center", height: 'auto' } : { overflow: 'hidden', textAlign: "center", height: '40px' };
        return (
            <div style={style}>
                <img src={'/card/poker_' + value + '.png'} 
                style={{width: long, marginLeft:'auto', marginRight:'auto', height: 'auto'}}/>
            </div>
        );
    }
}

export default Card;
