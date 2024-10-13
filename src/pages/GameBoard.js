import "./GameBoard.css"
import PlayerUser from "../components/PlayerUser.js"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CardBox from "../components/CardBox.js"
import CommandBoard from "../components/CommandBoard.js";
import { leaveTheSeatAction } from "../actions/gameActions.js"
import { WS_SERVER } from "../Server/Server.js"
import GameStatus from "../constants/GameStatus.js";
import PlayerStatus from "../constants/PlayerStatus.js";

function GameBoard() {
    const { tableId } = useParams();
    const dispatch = useDispatch();
    const websocketRef = useRef(null);
    const [buttonGroup, setButtonGroup] = useState({"Ready":true});
    const [selectedCards, setSelectedCards] = useState([]);
    const [activePos, setAcitvePos] = useState(0);
    let pingInterval; // Store the interval ID
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

    function PingKeepAlive() {
        const message = {
            Action: "PING",
            Avatar: user.avatar,
            NickName: user.nickName,
            TableIdx: Number(tableId),
            Pos: game.tablePos,
        }; // Create the JSON object
        websocketRef.current.send(JSON.stringify(message));
        console.log("PING PING PING");
    }

    const connectWebSocket = () => {
        console.log("We are connectWebSocket.");
        websocketRef.current = new WebSocket(WS_SERVER + '/ws_playing');
    
        websocketRef.current.onopen = () => {
            console.log('Connected to WebSocket, start the PING set');
            WeAreIn();
            // pingInterval = setInterval(() => { PingKeepAlive(); }, 5000);
        };
    
        websocketRef.current.onmessage = (event) => {
            const newMessage = event.data;
            const jsonMessage = JSON.parse(newMessage); // Convert string to JSON object
            if (jsonMessage.Type === "BroadCast") {
                console.log("We received broadcast room data ", jsonMessage.Data);
                setTableData(jsonMessage.Data);

                var mySelf = jsonMessage.Data?.Players.find(item => item.Pos === game.tablePos);
                
                setAcitvePos(jsonMessage.Data?.ActivePos);

                var isMyTurn = (game.tablePos === jsonMessage.Data?.ActivePos);

                if (mySelf == null) {
                    console.error("We can't find ourself in broadcast message");
                    return;
                }

                if (mySelf.Status === PlayerStatus.READY) {
                    setButtonGroup({"Ready":false});
                } 
                
                if (jsonMessage.Data.GameStatus === GameStatus.GRAB2) { // GameGrab2.
                    setButtonGroup({"Grab2s":isMyTurn, "NoGrab":isMyTurn});
                }

                if (jsonMessage.Data.GameStatus === GameStatus.YIELD2) { // GameGrab2.
                    var count = mySelf.Cards.filter(card => card === 48);
                    if (count === 2) {
                        setButtonGroup({"Yield2":true, "NoYield":true});
                    }
                }

                if (jsonMessage.Data.GameStatus === GameStatus.INPROGRESS) {
                    setButtonGroup({"Shot":isMyTurn, "Skip":isMyTurn});
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
            clearInterval(pingInterval); // Clear the interval
        };
    }, []);


    function sendActionMessage(Action) {
        const message = {
            Action: Action,
            Avatar: user.avatar,
            NickName: user.nickName,
            TableIdx: Number(tableId),
            Pos: game.tablePos,
        }; // Create the JSON object
        websocketRef.current.send(JSON.stringify(message));
    }

    function OnUserSelectedCards(cardsList) {
        console.log("User selected cards", cardsList);
        setSelectedCards(cardsList);
    }

    function UserActionClicked(button) {
        console.log("Button", button, "is Clicked");

        if (button === "Ready") {
            sendActionMessage("IAMREADY");
        } else if (button === "Grab2s") {
            sendActionMessage("GRAB2S");
        } else if (button === "NoGrab") {
            sendActionMessage("SKIP");
        } else if (button === "Yield2") {
            sendActionMessage("YIELD2");
        } else if (button === "Shot") {
            const message = {
                Action: "SHOT",
                Avatar: user.avatar,
                NickName: user.nickName,
                TableIdx: Number(tableId),
                Pos: game.tablePos,
                Cards: selectedCards,
            }; // Create the JSON object
            setSelectedCards([]);
            websocketRef.current.send(JSON.stringify(message));
        } else if (button === "Skip") {
            sendActionMessage("SKIP");
        }

    }

    return (
        <div className="gameboard">
            <div className="left">
                    {leftUser && <PlayerUser avatar={leftUser?.AvatarId} nickname={leftUser?.Nickname} horizontal={false} message={leftUser?.Message}/> }
                    {leftUser?(<CardBox valueList={leftUser?.Cards} long='80%' horizontal={false} hide={true} active={leftUser.Pos === activePos}/>):
                    ( <div style={{display: 'flex', flex:1, height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}
             
            </div>
            <div className="middle">
                <div className="top"> 
                    {topUser && <PlayerUser avatar={topUser?.AvatarId} nickname={topUser?.Nickname} horizontal={true} message={topUser?.Message}/> } 
                    {topUser?(<CardBox valueList={topUser?.Cards}  long='80%' hide={true} horizontal={true} active={topUser.Pos === activePos}/>):
                    ( <div style={{display: 'flex', height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}

                </div>
                <div className="center">
                    <CardBox valueList={tableData?.CentreCards??[]} long='50%' horizontal={true}/>
                </div>

                <div className="bottom">
                    <CommandBoard handleButtonClick={UserActionClicked} buttons = {buttonGroup} showedText={bottomUser?.Message}/>  
                    <CardBox valueList={bottomUser?.Cards} long='50%' horizontal={true} selectable={true} onCardsSelected={OnUserSelectedCards} active={bottomUser?.Pos === activePos}/> 
                  
                </div>
            </div>

            <div className="right">
                {rightUser && <PlayerUser avatar={rightUser?.AvatarId} nickname={rightUser?.Nickname} horizontal={false} message={rightUser?.Message}/> }
                {rightUser?(<CardBox valueList={rightUser?.Cards} long='80%' horizontal={false} hide={true} active={rightUser.Pos === activePos}/>):
                    ( <div style={{display: 'flex', flex: 1, height:'100%', width:'100%', border: 'solid 1px', justifyContent: 'center', alignItems: 'center', }}> Waiting player</div>
                    )}

            </div>
        </div>
    );
}

export default GameBoard;
