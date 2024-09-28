import Card from "./Card"


function CardBox({valueList, long, horizontal, hide}) {

    if (horizontal) {
        return (
            <div style={{display:'flex', flex:'1', border:'1px solid', padding:'10px',  height:'80%', flexDirection: 'row', justifyContent: 'center'}}>
            {
                valueList.map((item, index) => 
                    <Card value={hide?55:item} long={long} key={index} horizontal={horizontal} isLast={index === valueList.length - 1}/>
                )
            }
            </div>
        );

    } else {
        return (
            <div style={{display:'flex', border:'1px solid', padding:'10px', flexDirection: 'column', justifyContent: 'flex-start'}}>
            {
                valueList.map((item, index) => 
                    <Card value={hide?55:item} long={long} key={index} horizontal={horizontal} isLast={index === valueList.length - 1}/>
                )
            }
            </div>
        );
    }
}

export default CardBox;