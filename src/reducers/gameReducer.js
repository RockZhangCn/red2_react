import { wait } from "@testing-library/user-event/dist/utils";

// src/reducers/gameReducer.js
const GAME_STATUS = {
    WAITINGUSERS: 0,
    PLAYING: 0,
    ENDED: 1,
}

const USER_STATUS = {
    LOGOUT: -1,
    LOGIN: 0,
    HANGOUT: 1,

    SEATED: 1, // have a table postion.
    READY: 2,  // waiting for game to start
    PLAYING: 3, // game starts, and player is playing
    SELF_END: 4, // player successed or failed priorily in the game
    
    // After the game end, retured to SEATED status.
}

const initialState = {
    userEmail: null,
    tableId: -1,
    tablePos: -1,
    otherPlayers: null,
    userStatus: USER_STATUS.LOGOUT,
  };
  
  const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_SCORE':
        return { ...state, score: state.score + action.payload };
      case 'LEVEL_UP':
        return { ...state, level: state.level + 1 };
      case 'GAME_OVER':
        return { ...state, isGameOver: true };
      default:
        return state;
    }
  };
  
  export default gameReducer;
  