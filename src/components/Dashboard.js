import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import React, { useRef, useEffect, useState } from 'react';
import { gameHallRTDataAction } from '../actions/gameActions';

function Dashboard () {
    const mockData = [
        {
            "tableIdx":1,
            tableUsers: [
                {pos:1, "avatar":"/avatar/icon_1.png", "nickname":"user1"},
                {pos:2, "avatar":"/avatar/icon_4.png", "nickname":"user2"},
                {pos:3, "avatar":"/avatar/icon_14.png", "nickname":"user3"},
                {pos:4, "avatar":"/avatar/icon_24.png", "nickname":"user4"},
            ],
        },
        {     
            "tableIdx":2, 
            tableUsers: [      
            {pos:1, "avatar":"/avatar/icon_5.png", "nickname":"user1"},
            {pos:2, "avatar":"/avatar/icon_19.png", "nickname":"user2"},
            {pos:3, "avatar":"/avatar/icon_9.png", "nickname":"user3"},
            {pos:4, "avatar":"/avatar/icon_4.png", "nickname":"user4"},
            ]
        },
        {
            "tableIdx":3,
            tableUsers: [
                {pos:1, "avatar":"/avatar/icon_13.png", "nickname":"user1"},
                {pos:2, "avatar":"/avatar/icon_6.png", "nickname":"user2"},
                {pos:4, "avatar":"/avatar/icon_22.png", "nickname":"user4"},
            ],
        },
        {
            "tableIdx":4,
            tableUsers: [
            ],
        },
        {
            "tableIdx":5,
            tableUsers: [
                {pos:2, "avatar":"/avatar/icon_7.png", "nickname":"user2"},
            ],
        },
        {
            "tableIdx":6,
            tableUsers: [
            ],
        },
        {
            "tableIdx":7,
            tableUsers: [
            ],
        },
        {
            "tableIdx":8,
            tableUsers: [
            ],
        },

    ];

    const [gamehall, setGameHall] = useState([]);

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    
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
        
        console.log("We received message from websocket1  ", jsonMessage);
        setGameHall(jsonMessage);
        dispatch(gameHallRTDataAction(jsonMessage));
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

    return (
        <div style={{ display: 'flex', backgroundColor: 'gray', padding: '20px', flexWrap: 'wrap',
        justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            {gamehall.map(item => (
                <Table key={item.tableIdx} tableIdx={item.tableIdx} users={item.tableUsers}/> 
            ))}   
        </div>
    );
};

export default Dashboard;
