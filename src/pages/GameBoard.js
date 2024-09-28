import "./GameBoard.css"
import PlayerUser from "../components/PlayerUser.js"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InfoBoard from "../components/InfoBoard.js"
import CardBox from "../components/CardBox.js"
import CommandBoard from "../components/CommandBoard.js";

function GameBoard() {
    const { tableId } = useParams();
    const dispatch = useDispatch();

    var gameData = useSelector(state => state.game);
    console.log("AAAAA GameBoard we have data", gameData.gamehall);

    const tableData = gameData.gamehall.find(item => item.tableIdx == tableId);
    console.log("GameBoard we into table", tableData);

    // stop refresh the page.
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';  // 显示提示框（现代浏览器不支持自定义消息）
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const leftUser = tableData.tableUsers.find(item => item.pos === 1);
    const bottomUser = tableData.tableUsers.find(item => item.pos === 2);
    const rightUser = tableData.tableUsers.find(item => item.pos === 3);
    const topUser = tableData.tableUsers.find(item => item.pos === 4);
    return (
        <div className="gameboard">
            <div className="left">
                    {leftUser && <PlayerUser avatar={leftUser.avatar} nickname={leftUser.nickname} horizontal={false}/> }
                    <CardBox valueList={[3,3,2,5, 9, 23, 45, 46, 2]} long='40%' horizontal={false} hide={true} />
             
            </div>
            <div className="middle">
                <div className="top"> 
                    {topUser && <PlayerUser avatar={topUser.avatar} nickname={topUser.nickname} horizontal={true}/> } 
                    <CardBox valueList={[3,3,2,5, 9, 23, 45, 46, 2]}  long='80%' hide={true} horizontal={true}  />

                </div>
                <div className="center">
                    <CardBox valueList={[3,3,2,5, 9, 23, 45, 46, 2]} long='50%' horizontal={true}/>
                </div>

                <div className="bottom">
                    {/* {bottomUser && <PlayerUser avatar={bottomUser.avatar} nickname={bottomUser.nickname} horizontal={true}/> } */}
                    <CommandBoard/>  
                    <CardBox valueList={[3,3,2,5, 9, 23, 45, 46, 2]} long='80%' horizontal={true}/> 
                  
                </div>
            </div>

            <div className="right">
                {rightUser && <PlayerUser avatar={rightUser.avatar} nickname={rightUser.nickname} horizontal={false}/> }
                
                <CardBox valueList={[3,3,2,5, 9, 23, 45, 46, 2]} long='40%' horizontal={false} hide={true} />

            </div>
        </div>
    );
}

export default GameBoard;
