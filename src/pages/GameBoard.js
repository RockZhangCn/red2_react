import "./GameBoard.css"
import PlayerUser from "../components/PlayerUser.js"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CardBox from "../components/CardBox.js"
import CommandBoard from "../components/CommandBoard.js";

function GameBoard() {
    const { tableId } = useParams();
    // const dispatch = useDispatch();
    const websocketRef = useRef(null);
    var game = useSelector(state => state.game);
    var user = useSelector(state => state.user);
    console.log("AAAA GameBoard we have user", user);
    console.log("AAAAA GameBoard we have data", game.gamehall, "tableId", tableId);

    var seatPos = game.tablePos - 1;

    var leftPlayerPos = (seatPos + 3) % 4;
    var rightPlayerPos = (seatPos + 1) % 4;
    var topPlayerPos = (seatPos + 2) % 4;

    console.log("We seat", seatPos, "left is", leftPlayerPos, "right is", rightPlayerPos, "top is", topPlayerPos);

    const tableData = game.gamehall.find(item => (item.tableIdx === Number(tableId)));

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

    const connectWebSocket = () => {
        console.log("We are connectWebSocket.");
        websocketRef.current = new WebSocket('ws://localhost:5256/ws_playing');
    
        websocketRef.current.onopen = () => {
            console.log('Connected to WebSocket');
        };
    
        websocketRef.current.onmessage = (event) => {
            const newMessage = event.data;
            const jsonMessage = JSON.parse(newMessage); // Convert string to JSON object
            
            if (jsonMessage.Type === "BroadCast") {
                console.log("We received broadcast data ", jsonMessage);
            } else if (jsonMessage.Type === 'REPLY' && jsonMessage.Result) {
                
            }
        };
    
        websocketRef.current.onclose = (event) => {
            if (event.wasClean) {
                console.warn(`WebSocket closed cleanly with code: ${event.code}`);
            } else {
                console.error("WebSocket connection closed unexpectedly");
            }
        };
    
        websocketRef.current.onerror = (error) => {
          console.error('WebSocket error', error);
        };
      };

    
    useEffect(() => {
        connectWebSocket();
        return () => {
            if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                websocketRef.current.close(1000, 'Component unmounted');
            }
        };
    }, []);

    function UserActionClicked(button) {
        console.log("Button", button, "is Clicked");

    }

    const leftUser = tableData.tableUsers.find(item => item.pos === leftPlayerPos + 1);
    // const bottomUser = tableData.tableUsers.find(item => item.pos === 2);
    const rightUser = tableData.tableUsers.find(item => item.pos === rightPlayerPos + 1);
    const topUser = tableData.tableUsers.find(item => item.pos === topPlayerPos + 1);
    return (
        <div className="gameboard">
            <div className="left">
                    {leftUser && <PlayerUser avatar={leftUser.avatar} nickname={leftUser.nickname} horizontal={false}/> }
                    <CardBox valueList={[2, 3,5, 9,16, 23, 33,45, 46, 50]} long='40%' horizontal={false} hide={true} />
             
            </div>
            <div className="middle">
                <div className="top"> 
                    {topUser && <PlayerUser avatar={topUser.avatar} nickname={topUser.nickname} horizontal={true}/> } 
                    <CardBox valueList={[2, 3,5, 9,16, 23, 33,45, 46, 50]}  long='80%' hide={true} horizontal={true}  />

                </div>
                <div className="center">
                    <CardBox valueList={[2, 3,5, 9,16, 23, 33,45, 46, 50]} long='50%' horizontal={true}/>
                </div>

                <div className="bottom">
                    {/* {bottomUser && <PlayerUser avatar={bottomUser.avatar} nickname={bottomUser.nickname} horizontal={true}/> } */}
                    <CommandBoard handleButtonClick= {UserActionClicked}/>  
                    <CardBox valueList={[2, 3,5, 9,16, 23, 33,45, 46, 50]} long='50%' horizontal={true} selectable={true}/> 
                  
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
