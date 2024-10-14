import Card from "./Card"

function CardBox({valueList, long, horizontal, hide, onCardsSelected, selectList, active}) {    
    if (hide && valueList) {
        valueList = valueList.slice(0,8);
    }

    if (valueList) {
        valueList.sort((a,b) => b - a);
    }

    // Extract indices from selectList
    const indexList = selectList && selectList.map(item => item.key);


    if (horizontal) {
        return (
            <div style={{display:'flex', flex:'1', border:active? '1px solid red':'1px solid', padding:'15px', height:'70%', flexDirection: 'row', justifyContent: 'center'}}>
            { valueList&&
                valueList.map((item, index) => 
                    <Card value={hide?55:item} long={long} key={index} index={index} onClick={onCardsSelected}
                 horizontal={horizontal} isLast={index === valueList.length - 1} selected={indexList&&indexList.includes(index)}/>
                )
            }
            </div>
        );

    } else {
        return (
            <div style={{display:'flex', flex:'1', width:'70%', border:active? '1px solid red':'1px solid', padding:'5px', flexDirection: 'column', justifyContent: 'flex-start'}}>
            {valueList&&
                valueList.map((item, index) => 
                    <Card value={hide?55:item} long={long} key={index} horizontal={horizontal} isLast={index === valueList.length - 1}/>
                )
            }
            </div>
        );
    }
}

export default CardBox;
