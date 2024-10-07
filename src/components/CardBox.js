import Card from "./Card"
import {useState} from 'react'

function CardBox({valueList, long, horizontal, hide, selectable}) {
    const [selectedSet, setSelectedSet] = useState([]);

    function onCardClicked(selected, cardValue) {
        setSelectedSet(prevSelectedSet => {
            if(selected) {
                const newValue = [...prevSelectedSet, cardValue];
                console.log("we select", newValue);
                return newValue;
            } else {
                const newValue = prevSelectedSet.filter(element => element !== cardValue);
                console.log("we select", newValue);
                return newValue;
            }
        });
    }

    if (horizontal) {
        return (
            <div style={{display:'flex', flex:'1', border:'1px solid', padding:'25px', height:'70%', flexDirection: 'row', justifyContent: 'center'}}>
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
            <div style={{display:'flex', flex:'1', width:'70%', border:'1px solid', padding:'5px', flexDirection: 'column', justifyContent: 'flex-start'}}>
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
