import SeatedUser from "../pages/SeatedUser";
import { useSelector } from "react-redux";
import React from "react";
import "./TableCss.css"

function Table({tableIdx, users}) {
    const user = useSelector(state => state.user);
    const url = "http://rockzhang.com/1.jpeg";

    return (<div className="grid-container">
      <div className="grid-item hidden"></div> {/* 左上角空白 */}
      <div className="grid-item small">
        <SeatedUser avatar="http://rockzhang.com/1.jpeg" nickname="rockzhang"/>
        </div>   {/* 上方小单元 */}
      <div className="grid-item hidden"></div>  {/* 右上角空白 */}

      <div className="grid-item small"></div>   {/* 左边小单元 */}
      <div className="grid-item large">{tableIdx}</div>   {/* 中间大单元 */}
      <div className="grid-item small"></div>   {/* 右边小单元 */}

      <div className="grid-item hidden"></div>  {/* 左下角空白 */}
      <div className="grid-item small"></div>   {/* 下方小单元 */}
      <div className="grid-item hidden"></div>  {/* 右下角空白 */}
    </div>
  );
}

export default Table;