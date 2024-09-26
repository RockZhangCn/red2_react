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

    const dispatch = useDispatch();
    
    //dispatch(gameHallRTDataAction(mockData));

    const user = useSelector(state => state.user);
    
    const [connected, setConnected] = useState(false);
    const websocketRef = useRef(null);
    const reconnectInterval = useRef(1000); // Start with 1 second
    const maxReconnectInterval = 30000; // Maximum of 30 seconds
  
    const connectWebSocket = () => {
      websocketRef.current = new WebSocket('ws://your-websocket-url');
  
      websocketRef.current.onopen = () => {
        setConnected(true);
        console.log('Connected to WebSocket');
        reconnectInterval.current = 1000; // Reset interval after successful connection
      };
  
      websocketRef.current.onmessage = (event) => {
        const newMessage = event.data;
        dispatch(gameHallRTDataAction(newMessage));
      };
  
      websocketRef.current.onclose = () => {
        setConnected(false);
        console.log('Disconnected. Reconnecting...');
        attemptReconnect();
      };
  
      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    };
  
    const attemptReconnect = () => {
      if (reconnectInterval.current <= maxReconnectInterval) {
        setTimeout(() => {
          console.log(`Reconnecting in ${reconnectInterval.current / 1000} seconds...`);
          connectWebSocket();
          reconnectInterval.current *= 2; // Exponentially increase the delay
        }, reconnectInterval.current);
      }
    };
  
    useEffect(() => {
      //connectWebSocket();
      //TODO move it to websocket received message.
      dispatch(gameHallRTDataAction(mockData));

      return () => {
        if (websocketRef.current) {
          websocketRef.current.close();
        }
      };
    }, []);

    return (
        <div style={{ display: 'flex', backgroundColor: 'gray', padding: '20px', flexWrap: 'wrap',
        justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            {mockData.map(item => (
                <Table key={item.tableIdx} tableIdx={item.tableIdx} users={item.tableUsers}/> 
            ))}   
        </div>
    );
};

export default Dashboard;
