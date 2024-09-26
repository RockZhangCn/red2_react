function CardBox({valueList, width, direction}) {
    return (
        <div>
        {
            valueList.map(item => 
                <img src={'/card/poker_' + item + '.png'} style={{width:width}} key={item}/>
            )
        }
        </div>
    );
}

export default CardBox;