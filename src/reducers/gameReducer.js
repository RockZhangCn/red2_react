// src/reducers/gameReducer.js
const GAME_STATUS = {
  WAITINGUSERS: 0,
  PLAYING: 0,
  ENDED: 1,
};

const USER_STATUS = {
  LOGOUT: -1,
  LOGIN: 0,
  HANGOUT: 1,

  SEATED: 1, // have a table postion.
  READY: 2, // waiting for game to start
  PLAYING: 3, // game starts, and player is playing
  SELF_END: 4, // player successed or failed priorily in the game
  // After the game end, retured to SEATED status.
};

const initialState = {
  tableId: -1,
  tablePos: -1,
  gamehall: [],
};

const gameReducer = (state = initialState, action) => {
  console.log("gameReducer received action ", action);
  var result = null;
  switch (action.type) {
    case "TAKEASEAT":
      result = {
        ...state,
        tableId: Math.floor(action.composedPos / 10),
        tablePos: action.composedPos % 10,
      };
      console.log("gameReducer new state ", result);
      return result;

    case "GAMEHALL_RT_DATA":
      console.log(
        "AAAAA gameReducer received GAMEHALL_RT_DATA action",
        action.data,
      );
      result = { ...state, gamehall: action.data };
      localStorage.setItem("gamehall", JSON.stringify(result)); // store the mocked court data.
      return result;

    case "GAMEHALL_SEAT_POS":
      result = {
        ...state,
        tableId: action.data.table,
        tablePos: action.data.pos,
      };

      localStorage.setItem("gamehall", JSON.stringify(result)); // store the mocked court data.
      return result;

    case "RESTORE_GAMEHALL_DATA":
      console.log("AAAAA we finally restore gamehall data", action);
      return {
        ...state,
        gamehall: action.data.gamehall,
        tableId: action.data.tableId,
        tablePos: action.data.tablePos,
      };

    case "STANDUP":
      return { ...state, tableId: -1, tablePos: -1 };

    default:
      return state;
  }
};

export default gameReducer;
