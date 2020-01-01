import React from "react";
import ReactDOM from "react-dom";

import MinesweeperComponent from "components/MinesweeperComponent";

import BoardConfig from "model/board/BoardConfig";
import BoardDimensions from "model/board/BoardDimensions";

import "./index.css"

ReactDOM.render(
    <MinesweeperComponent boardConfig={new BoardConfig(new BoardDimensions(16, 30), 99)} />,
    document.getElementById("root")
);
