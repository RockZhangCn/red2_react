import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import React, { useRef, useEffect, useState } from 'react';


function Dashboard () {

    const TABLE_COUNT = 6;
    const url = "http://rockzhang.com/1.jpeg";
    //
    const mockData = [
        {
            "tableIdx":0,
            "user1":{"avatar":"/avatar/icon_1.png", "nickname":"user1"},
            "user2":{"avatar":"/avatar/icon_4.png", "nickname":"user2"},
            "user3":{"avatar":"/avatar/icon_14.png", "nickname":"user3"},
            "user4":{"avatar":"/avatar/icon_24.png", "nickname":"user4"},
        },
        {     
            "tableIdx":1,       
            "user1":{"avatar":"/avatar/icon_5.png", "nickname":"user1"},
            "user2":{"avatar":"/avatar/icon_19.png", "nickname":"user2"},
            "user3":{"avatar":"/avatar/icon_9.png", "nickname":"user3"},
            "user4":{"avatar":"/avatar/icon_4.png", "nickname":"user4"},
        },
        {
            "tableIdx":2,
            "user1":{"avatar":"/avatar/icon_13.png", "nickname":"user1"},
            "user2":{"avatar":"/avatar/icon_6.png", "nickname":"user2"},
            "user3":null,
            "user4":{"avatar":"/avatar/icon_22.png", "nickname":"user4"},
        },
        {
            "tableIdx":3,
            "user1":null,
            "user2":null,
            "user3":null,
            "user4":null,
        },
        {
            "tableIdx":4,
            "user1":null,
            "user2":{"avatar":"/avatar/icon_7.png", "nickname":"user2"},
            "user3":null,
            "user4":null,
        },
        {
            "tableIdx":5,
            "user1":null,
            "user2":null,
            "user3":null,
            "user4":null,
        },
    ];
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
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
        setMessages((prevMessages) => [...prevMessages, newMessage]);
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
  
      return () => {
        if (websocketRef.current) {
          websocketRef.current.close();
        }
      };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div style={{ display: 'flex', backgroundColor: 'gray', padding: '20px', flexWrap: 'wrap',
        justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            {mockData.map(item => (
                <Table tableIdx={item.tableIdx} users={item}/> 
            ))}   
        </div>
    );

};

export default Dashboard;