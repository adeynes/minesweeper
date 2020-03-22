import React from "react";
import PropTypes from "prop-types";

import Board from "model/Board";
import BoardConfig from "model/board/BoardConfig";

import SquareComponent from "components/SquareComponent";
import SquareStatus from "model/square/SquareStatus";


export default class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(this.props.config, this.props.seed, this.postSetStateCallback.bind(this)),
            isAlive: true
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({ board : new Board(this.props.config, this.props.seed, this.postSetStateCallback.bind(this)) });
        }
    }

    render() {
        this.state.board.initialize();

        return <table><tbody>{this.createTable()}</tbody></table>;
    }

    createTable() {
        let table = [];

        let counter = 0;
        let rowCounter = 0;
        for (let row_ of this.state.board.squares) {
            let row = [];
            for (let square of row_) {
                row.push(<SquareComponent value={square} onClick={this.handleClick.bind(this)} key={counter++}/>);
            }
            table.push(<tr key={rowCounter++}>{row}</tr>);
        }

        return table;
    }

    handleClick(index, event) {
        if (!this.state.isAlive) {
            return;
        }

        event.preventDefault();

        let board = this.state.board;
        let square = board.getSquare(index);

        if (event.type === "click") {
            if (square.status === SquareStatus.REVEALED) {
                board.revealNeighbors(square);
            } else if (square.status === SquareStatus.NONE) {
                board.revealSquare(square);
            }
        } else if (event.type === "contextmenu") {
            if (square.status === SquareStatus.NONE) {
                board.flagSquare(square);
            } else if (square.status === SquareStatus.FLAGGED) {
                board.unflagSquare(square);
            }
        }
    }

    postSetStateCallback(newBoard, noticeStatus) {
        this.setState({ board: newBoard });

        // we have to check for strict falsehood because falsy notice statuses (ex. null) might not indicate a loss
        if (noticeStatus === false) {
            this.setState({ isAlive: false });
        }
    }
}


BoardComponent.propTypes = {
    config: PropTypes.instanceOf(BoardConfig),
    seed: PropTypes.string
};
