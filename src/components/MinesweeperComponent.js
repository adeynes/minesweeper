import React from "react";
import PropTypes from "prop-types";

import BoardComponent from "components/BoardComponent";
import BoardConfig, { BEGINNER_CONFIG, INTERMEDIATE_CONFIG, EXPERT_CONFIG } from "model/board/BoardConfig";

import ButtonComponent from "components/ButtonComponent";


class MinesweeperComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { boardConfig: props.boardConfig, isBoardAlive: true };
    }

    render() {
        return (
            <div className="container expert">
                <div className="board">
                    <BoardComponent config={this.state.boardConfig} alive={this.state.isBoardAlive} />
                </div>
                <div className="sidebar">
                    <ButtonComponent value="BEGINNER" onClick={() => this.setBoardConfig(BEGINNER_CONFIG)} />
                    <ButtonComponent value="INTERMEDIATE" onClick={() => this.setBoardConfig(INTERMEDIATE_CONFIG)} />
                    <ButtonComponent value="EXPERT" onClick={() => this.setBoardConfig(EXPERT_CONFIG)} />
                </div>
            </div>
        );
    }

    /**
     * @param {BoardConfig} config
     */
    setBoardConfig(config) {

    }
}


MinesweeperComponent.propTypes = {
    boardConfig: PropTypes.instanceOf(BoardConfig)
};


export default MinesweeperComponent;
