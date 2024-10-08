import "./GameBoard.css"
import PlayerUser from "../components/PlayerUser.js"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CardBox from "../components/CardBox.js"
import CommandBoard from "../components/CommandBoard.js";
import { leaveTheSeatAction } from "../actions/gameActions.js"
import { WS_SERVER } from "../Server/Server.js"

function GameBoard() {
    const { tableId } = useParams();
    const dispatch = useDispatch();
    const websocketRef = useRef(null);
    const [buttonGroup, setButtonGroup] = useState({"Ready":true});

    var game = useSelector(state => state.game);
    var user = useSelector(state => state.user);
    console.log("AAAA GameBoard we have user", user);
    console.log("AAAAA GameBoard we have data tableId", tableId);

    const [tableData, setTableData] = useState(null);
    var seatPos = game.tablePos - 1;

    var leftPlayerPos = (seatPos + 3) % 4 + 1;
    var rightPlayerPos = (seatPos + 1) % 4 + 1;
    var topPlayerPos = (seatPos + 2) % 4 + 1;

    console.log("We seat", game.tablePos, "left is", leftPlayerPos, "right is", rightPlayerPos, "top is", topPlayerPos, "table Data is", tableData);

    const leftUser = tableData?.Players.find(item => item.Pos === leftPlayerPos );
    const bottomUser = tableData?.Players.find(item => item.Pos === game.tablePos );
    const rightUser = tableData?.Players.find(item => item.Pos === rightPlayerPos );
    const topUser = tableData?.Players.find(item => item.Pos === topPlayerPos );

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

    function WeAreIn() {
        const message = {
            Action: "IAMIN",
            Avatar: user.avatar,
            NickName: user.nickName,
            TableIdx: Number(tableId),
            Pos: game.tablePos,
          }; // Create the JSON object
          websocketRef.current.send(JSON.stringify(message));
    }

    const connectWebSocket = () => {
        console.log("We are connectWebSocket.");
        websocketRef.current = new WebSocket(WS_SERVER + '/ws_playing');
    
        websocketRef.current.onopen = () => {
            console.log('Connected to WebSocket');
            WeAreIn();
        };
    
        websocketRef.current.onmessage = (event) => {
            const newMessage = event.data;
            const jsonMessage = JSON.parse(newMessage); // Convert string to JSON object
            
            if (jsonMessage.Type === "BroadCast") {
                console.log("We received broadcast room data ", jsonMessage.Data);
                setTableData(jsonMessage.Data);

                var mySelf = jsonMessage.Data?.Players.find(item => item.Pos === game.tablePos );
                if (mySelf.Status === 2) {
                    setButtonGroup({"Ready":false});
                } else if (jsonMessage.Data.GameStatus === 2) { // GameGrab2.
                    setButtonGroup({"Grab2s":true, "NoGrab":false});
                }
            }
        };
    
        websocketRef.current.onclose = (event) => {
            if (event.wasClean) {
                console.warn(`WebSocket closed cleanly with code: ${event.code}`);
            } else {
                console.warn("GameBoard WebSocket connection closed");
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
                console.log("User exit current page");
                // You can add additional logic here if needed
                const message = {
                    Action: "IAMQUIT",
                    Avatar: user.avatar,
                    NickName: user.nickName,
                    TableIdx: Number(tableId),
                    Pos: game.tablePos,
                }; // Create the JSON object
                websocketRef.current.send(JSON.stringify(message));

                dispatch(leaveTheSeatAction());

                websocketRef.current.close(1000, 'Component unmounted');
            }
        };
    }, []);


    function sendActionMessage(Action) {
        const message = {
            Action: "IAMREADY",
            Avatar: user.avatar,
            NickName: user.nickName,
            TableIdx: Number(tableId),
            Pos: game.tablePos,
        }; // Create the JSON object
        websocketRef.current.send(JSON.stringify(message));
    }

    function UserActionClicked(button) {
        console.log("Button", button, "is Clicked");

        if (button === "Ready") {
            sendActionMessage("IAMREADY");
        } else if (button === "Grab2s") {
            sendActionMessage("IAMREADY");
        } else if (button === "Yield2") {
            sendActionMessage("YIELD2");
        } else if (button === "Shot") {

        } else if (button === "Skip") {
            sendActionMessage("SKIP");
        }

    }

    return (
        <div className="gameboard">
            <div className="left">
                    {leftUser && <PlayerUser avatar={leftUser?.AvatarId} nickname={leftUser?.Nickname} horizontal={false} message={leftUser?.Message}/> }
                    {leftUser?(<CardBox valueList={leftUser?.Cards} long='40%' horizontal={false} hide={true} />):
                    ( <div style={{display: 'flex', height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}
             
            </div>
            <div className="middle">
                <div className="top"> 
                    {topUser && <PlayerUser avatar={topUser?.AvatarId} nickname={topUser?.Nickname} horizontal={true} message={topUser?.Message}/> } 
                    {topUser?(<CardBox valueList={topUser?.Cards}  long='80%' hide={true} horizontal={true} />):
                    ( <div style={{display: 'flex', height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}

                </div>
                <div className="center">
                    <CardBox valueList={tableData?.CentreCards??[]} long='50%' horizontal={true}/>
                </div>

                <div className="bottom">
                    {/* {bottomUser && <PlayerUser avatar={bottomUser.avatar} nickname={bottomUser.nickname} horizontal={true}/> } */}
                    <CommandBoard handleButtonClick={UserActionClicked} buttons = {buttonGroup} showedText={bottomUser?.Message}/>  
                    <CardBox valueList={bottomUser?.Cards} long='50%' horizontal={true} selectable={true}/> 
                  
                </div>
            </div>

            <div className="right">
                {rightUser && <PlayerUser avatar={rightUser?.AvatarId} nickname={rightUser?.Nickname} horizontal={false} message={rightUser?.Message}/> }
                {rightUser?(<CardBox valueList={rightUser?.Cards} long='40%' horizontal={false} hide={true} />):
                    ( <div style={{display: 'flex', height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}

            </div>
        </div>
    );
}

export default GameBoard;
