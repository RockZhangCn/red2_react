import SeatedUser from "../components/SeatedUser";
import { useDispatch, useSelector } from "react-redux";
import React from "react"; // Add useState import
import "./TableCss.css";
import { selectAPosAction } from "../actions/gameActions";

function Table({ tableIdx, users, takeSeatCallback }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  function SelectASeat(seatPos) {
    const tableUsers = game.gamehall[tableIdx - 1].tableUsers;
    console.log(
      "we Select seat ",
      tableIdx,
      seatPos,
      game.gamehall,
      tableUsers,
    );

    var clickMySelf = tableIdx === game.tableId && seatPos === game.tablePos;
    if (clickMySelf) console.log("we Select outself");

    if (tableUsers.find((user) => user.pos == seatPos) && !clickMySelf) {
      console.log("Already have a people seated here");
    } else {
      dispatch(selectAPosAction(tableIdx * 10 + seatPos));
      takeSeatCallback(tableIdx, seatPos);
    }
  }

  const isSeatThisTable = game.tableId === tableIdx;
  const clickedSeat = isSeatThisTable ? game.tablePos : -1;

  if (isSeatThisTable)
    console.log("we seat at table ", tableIdx, " pos is ", clickedSeat);

  // Find the users with pos 1, 2, and 4 in tableUsers
  var userWithPos1 = users.find((user) => user.pos === 1);
  var userWithPos2 = users.find((user) => user.pos === 2);
  var userWithPos3 = users.find((user) => user.pos === 3);
  var userWithPos4 = users.find((user) => user.pos === 4);

  return (
    <div className="grid-container">
      <div className="grid-item hidden"></div>
      <div
        className={`grid-item small ${clickedSeat === 4 ? "clicked" : ""}`}
        onClick={() => {
          SelectASeat(4);
        }}
      >
        {userWithPos4 ? (
          <SeatedUser
            key={4}
            avatar={userWithPos4.avatar}
            nickname={userWithPos4.nickname}
          />
        ) : clickedSeat === 4 ? (
          <SeatedUser key={4} avatar={user.avatar} nickname={user.nickName} />
        ) : null}
      </div>
      <div className="grid-item hidden"></div>
      <div
        className={`grid-item small ${clickedSeat === 1 ? "clicked" : ""}`}
        onClick={() => {
          SelectASeat(1);
        }}
      >
        {userWithPos1 ? (
          <SeatedUser
            key={1}
            avatar={userWithPos1.avatar}
            nickname={userWithPos1.nickname}
          />
        ) : clickedSeat === 1 ? (
          <SeatedUser key={1} avatar={user.avatar} nickname={user.nickName} />
        ) : null}
      </div>
      <div className="grid-item large">
        <h3>{tableIdx}</h3>
      </div>
      <div
        className={`grid-item small ${clickedSeat === 3 ? "clicked" : ""}`}
        onClick={() => {
          SelectASeat(3);
        }}
      >
        {userWithPos3 ? (
          <SeatedUser
            key={3}
            avatar={userWithPos3.avatar}
            nickname={userWithPos3.nickname}
          />
        ) : clickedSeat === 3 ? (
          <SeatedUser key={3} avatar={user.avatar} nickname={user.nickName} />
        ) : null}
      </div>

      <div className="grid-item hidden"></div>
      <div
        className={`grid-item small ${clickedSeat === 2 ? "clicked" : ""}`}
        onClick={() => {
          SelectASeat(2);
        }}
      >
        {userWithPos2 ? (
          <SeatedUser
            key={2}
            avatar={userWithPos2.avatar}
            nickname={userWithPos2.nickname}
          />
        ) : clickedSeat === 2 ? (
          <SeatedUser key={2} avatar={user.avatar} nickname={user.nickName} />
        ) : null}
      </div>
    </div>
  );
}

export default Table;
