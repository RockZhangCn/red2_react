import Card from "./Card"
import {useState} from 'react'

function CardBox({valueList, long, horizontal, hide, selectable, onCardsSelected, active}) {
    const [selectedSet, setSelectedSet] = useState([]);
    
    if (hide && valueList) {
        valueList = valueList.slice(0,8);
    }

    if (valueList) {
        valueList.sort((a,b) => b - a);
    }

    function onCardClicked(selected, cardValue) {
        setSelectedSet(prevSelectedSet => {
            if(selected) {
                const newValue = [...prevSelectedSet, cardValue];
                console.log("we select", newValue);

                onCardsSelected(newValue);
                return newValue;
            } else {
                const indexToRemove = prevSelectedSet.findIndex(element => element === cardValue);
                const newValue = [
                    ...prevSelectedSet.slice(0, indexToRemove),
                    ...prevSelectedSet.slice(indexToRemove + 1)
                ];

                onCardsSelected(newValue);
                return newValue;
            }
        });
    }

    if (horizontal) {
        return (
            <div style={{display:'flex', flex:'1', border:active? '1px solid red':'1px solid', padding:'15px', height:'70%', flexDirection: 'row', justifyContent: 'center'}}>
            { valueList&&
                valueList.map((item, index) => 
                    <Card value={hide?55:item} long={long} key={index} onClick={onCardClicked}
                 horizontal={horizontal} isLast={index === valueList.length - 1} selectable={selectable}/>
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
