import "./GameBoard.css"
import PlayerUser from "../components/PlayerUser.js"
import { useParams } from "react-router-dom";


function GameBoard() {
    const { tableId } = useParams();
    console.log("GameBoard we into table", tableId);

    return (
        <div className="gameboard">
            <div className="left">
                <PlayerUser avatar='/avatar/icon_1.png' nickname="zhang"/> 
            </div>
           
            <div className="middle">
                <div className="top"></div>
                <div className="center"></div>
                <div className="bottom"></div>
            </div>

            <div className="right"></div>
        </div>
    );
}

export default GameBoard;
