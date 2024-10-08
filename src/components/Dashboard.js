import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import React, { useRef, useEffect, useState } from "react";
import { gameHallRTDataAction } from "../actions/gameActions";
import { useNavigate } from "react-router-dom";
import { extractNumber, generateAvatarPath } from "../utility/AvatarConvert";
import { WS_SERVER} from "../Server/Server.js"


function Dashboard() {
  const [gamehall, setGameHall] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [trySeatTable, setTrySeatTable] = useState(0);
  const [trySeatPos, setTrySeatPos] = useState(0);

  const trySeatTableRef = useRef(trySeatTable); // Create a ref to hold the current value
  const trySeatPosRef = useRef(trySeatPos);

  const [connected, setConnected] = useState(false);
  const websocketRef = useRef(null);
  const reconnectInterval = useRef(1000); // Start with 1 second
  const maxReconnectInterval = 30000; // Maximum of 30 seconds

  const connectWebSocket = () => {
    console.log("We are connectWebSocket.");
    websocketRef.current = new WebSocket(WS_SERVER + '/ws_hall');

    websocketRef.current.onopen = () => {
      setConnected(true);
      console.log("Connected to WebSocket");
      reconnectInterval.current = 1000; // Reset interval after successful connection
    };

    websocketRef.current.onmessage = (event) => {
      const newMessage = event.data;
      const jsonMessage = JSON.parse(newMessage); // Convert string to JSON object

      console.log(
        "We received message from websocket bigHall: ",
        jsonMessage,
        "table",
        trySeatTableRef.current,
        "Pos",
        trySeatPosRef.current
      );
      if (jsonMessage.Type === "BroadCast") {
        setGameHall(jsonMessage.Data);
        dispatch(gameHallRTDataAction(jsonMessage.Data));
      } else if (jsonMessage.Type === "REPLY" && jsonMessage.Result) {
        navigate("/playing/" + trySeatTableRef.current);
      }
    };

    websocketRef.current.onclose = (event) => {
      if (event.wasClean) {
        console.warn(`WebSocket closed cleanly with code: ${event.code}`);
      } else {
        console.log("WebSocket connection closed unexpectedly");
      }
      setConnected(false);
      //attemptReconnect();
    };

    websocketRef.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (
        websocketRef.current &&
        websocketRef.current.readyState === WebSocket.OPEN
      ) {
        console.log("We close bighall websocket in client.");
        websocketRef.current.close(1000, "Component unmounted");
      }
    };
  }, []);

  useEffect(() => {
    trySeatTableRef.current = trySeatTable; // Update the ref whenever trySeatTable changes
    trySeatPosRef.current = trySeatPos;
  }, [trySeatTable, trySeatPos]);

  function takeSeatCallback(tableIdx, pos) {
    // Send the JSON string
    console.log("takeSeatCallback save try seat", tableIdx, pos);
    setTrySeatTable(tableIdx);
    setTrySeatPos(pos);

    const message = {
      Action: "TAKESEAT",
      Avatar: user.avatar,
      NickName: user.nickName,
      TableIdx: tableIdx,
      Pos: pos,
    }; // Create the JSON object
    websocketRef.current.send(JSON.stringify(message));
  }

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "gray",
        padding: "20px",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {gamehall.map((item) => (
        <Table
          key={item.tableIdx}
          tableIdx={item.tableIdx}
          users={item.tableUsers}
          takeSeatCallback={takeSeatCallback}
        />
      ))}
    </div>
  );
}

export default Dashboard;
