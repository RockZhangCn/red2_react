import NavBar from '../components/Navbar/Navbar.js';

function Card({value, width}) {
    return (
        <div style={{width:width, overflow: 'hidden', height:'60px'}}>
            <img src={'/card/poker_' + value + '.png'} 
            style={{width:width, height:Math.floor(1.52*width)}}/>
        </div>
    );

}

export default Card;