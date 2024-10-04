import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import React, { useRef, useEffect, useState } from 'react';
import { gameHallRTDataAction } from '../actions/gameActions';
import { useNavigate } from "react-router-dom";
import { extractNumber, generateAvatarPath } from "../utility/AvatarConvert";


function Dashboard () {
    const [gamehall, setGameHall] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    
    const[trySeatTable, setTrySeatTable] = useState(0);
    const[trySeatPos, setTrySeatPos] = useState(0);

    const [connected, setConnected] = useState(false);
    const websocketRef = useRef(null);
    const reconnectInterval = useRef(1000); // Start with 1 second
    const maxReconnectInterval = 30000; // Maximum of 30 seconds
  
    const connectWebSocket = () => {
      websocketRef.current = new WebSocket('ws://localhost:5256/ws_hall');
  
      websocketRef.current.onopen = () => {
          setConnected(true);
          console.log('Connected to WebSocket');
          reconnectInterval.current = 1000; // Reset interval after successful connection
      };
  
      websocketRef.current.onmessage = (event) => {
          const newMessage = event.data;
          const jsonMessage = JSON.parse(newMessage); // Convert string to JSON object
          
          console.log("We received message from websocket1  ", jsonMessage, "table", trySeatTableRef.current, "Pos", trySeatPosRef.current);
          if (jsonMessage.Type === "BroadCast") {
              setGameHall(jsonMessage.Data);
              dispatch(gameHallRTDataAction(jsonMessage.Data));
          } else if (jsonMessage.Type === 'REPLY' && jsonMessage.Result) {
              navigate('/playing/' + trySeatTableRef.current);
          }
      };
  
      websocketRef.current.onclose = (event) => {
          if (event.wasClean) {
            console.log(`WebSocket closed cleanly with code: ${event.code}`);
          } else {
            console.error("WebSocket connection closed unexpectedly");
          }
          //attemptReconnect();
      };
  
      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    };
  
    const attemptReconnect = () => {
      var attemptInterval = 0;
      if (reconnectInterval.current <= maxReconnectInterval) {
          attemptInterval = reconnectInterval.current
      } else {
        attemptInterval = maxReconnectInterval
      }
      
      setTimeout(() => {
        console.log(`Reconnecting in ${attemptInterval / 1000} seconds...`);
        connectWebSocket();
        reconnectInterval.current *= 2; // Exponentially increase the delay
      }, attemptInterval);
    };
  
    useEffect(() => {
      connectWebSocket();

      return () => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
          websocketRef.current.close(1000, 'Component unmounted');
        }
      };
    }, []);

    useEffect(() => {
      // This effect will run whenever trySeatTable changes
      console.log("Updated trySeatTable:", trySeatTable);
  }, [trySeatTable]);

    const trySeatTableRef = useRef(trySeatTable); // Create a ref to hold the current value
    const trySeatPosRef = useRef(trySeatPos); 

    useEffect(() => {
        trySeatTableRef.current = trySeatTable; // Update the ref whenever trySeatTable changes
        trySeatPosRef.current = trySeatPos;
    }, [trySeatTable, trySeatPos]);

    function takeSeatCallback (tableIdx, pos) {
      // Send the JSON string
      console.log("takeSeatCallback save try seat", tableIdx, pos);
      setTrySeatTable(tableIdx);
      setTrySeatPos(pos);

      const message = { Action: 'TAKESEAT', Avatar: user.avatar, NickName: user.nickName, TableIdx: tableIdx, Pos:pos }; // Create the JSON object
      websocketRef.current.send(JSON.stringify(message)); 
    }

    return (
        <div style={{ display: 'flex', backgroundColor: 'gray', padding: '20px', flexWrap: 'wrap',
        justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            {gamehall.map(item => (
                <Table key={item.tableIdx} tableIdx={item.tableIdx} users={item.tableUsers} takeSeatCallback={takeSeatCallback}/> 
            ))}   
        </div>
    );
};

export default Dashboard;
