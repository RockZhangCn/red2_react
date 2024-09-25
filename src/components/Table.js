import SeatedUser from "../pages/SeatedUser";
import { useSelector } from "react-redux";
import React from "react";
import "./TableCss.css"

function Table({tableIdx, users}) {
    const user = useSelector(state => state.user);
    const url = "http://rockzhang.com/1.jpeg";

    return (<div className="grid-container">
      <div className="grid-item hidden"></div>
      <div className="grid-item small">
        {users.user4 && 
        <SeatedUser avatar={users.user4.avatar} nickname={users.user4.nickname}/>
        }
      </div>   
      <div className="grid-item hidden"></div> 
      <div className="grid-item small">
        {users.user1 && 
            <SeatedUser avatar={users.user1.avatar} nickname={users.user1.nickname}/>
        }
      </div>  
      <div className="grid-item large"><h3>{tableIdx}</h3></div> 
      <div className="grid-item small">
        {users.user3 && 
            <SeatedUser avatar={users.user3.avatar} nickname={users.user3.nickname}/>
        }
      </div>  

      <div className="grid-item hidden"></div> 
      <div className="grid-item small">
        {users.user2 && 
            <SeatedUser avatar={users.user2.avatar} nickname={users.user2.nickname}/>
        }
      </div>  
      <div className="grid-item hidden"></div> 
    </div>
  );
}

export default Table;