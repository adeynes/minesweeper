import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BoardComponent, BoardDimensions, BoardConfig } from './board'
import ButtonComponent from "./ButtonComponent";
import './index.css'

const BEGINNER_CONFIG = new BoardConfig(new BoardDimensions(8, 8), 10);
const INTERMEDIATE_CONFIG = new BoardConfig(new BoardDimensions(16, 16), 40);
const EXPERT_CONFIG = new BoardConfig(new BoardDimensions(16, 30), 99);

class MinesweeperComponent extends React.Component {

    constructor (props) {
        super(props);
        this.state = { boardConfig: props.boardConfig, isBoardAlive: true };
    }

    render () {
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

    setBoardConfig (config) {

    }
}

MinesweeperComponent.propTypes = {
    boardConfig: PropTypes.instanceOf(BoardConfig)
};

ReactDOM.render(
    <MinesweeperComponent boardConfig={new BoardConfig(new BoardDimensions(16, 30), 99)} />,
    document.getElementById("root")
);