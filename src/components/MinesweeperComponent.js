import React from "react";
import PropTypes from "prop-types";

import BoardComponent from "components/BoardComponent";
import BoardConfig, { BEGINNER_CONFIG, INTERMEDIATE_CONFIG, EXPERT_CONFIG } from "model/board/BoardConfig";

import ButtonComponent from "components/ButtonComponent";

import { generateSeed } from "utils/SeedGenerator";


export default class MinesweeperComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { boardConfig: props.boardConfig };
    }

    render() {
        console.log("re");
        console.log(this.state.boardConfig);
        return (
            <div className="container expert">
                <div className="board">
                    <BoardComponent config={this.state.boardConfig} seed={generateSeed(this.state.boardConfig)} />
                </div>
                <div className="sidebar">
                    <ButtonComponent value="BEGINNER" onClick={() => this.newBoard(BEGINNER_CONFIG)} />
                    <ButtonComponent value="INTERMEDIATE" onClick={() => this.newBoard(INTERMEDIATE_CONFIG)} />
                    <ButtonComponent value="EXPERT" onClick={() => this.newBoard(EXPERT_CONFIG)} />
                </div>
            </div>
        );
    }

    /**
     * @param {BoardConfig} config
     */
    newBoard(config) {
        this.setState({ boardConfig : config });
    }
}


MinesweeperComponent.propTypes = {
    boardConfig: PropTypes.instanceOf(BoardConfig)
};
