import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Vector2 from './Vector2';
import { DefaultSquare, SquareStatus, SquareComponent } from './square';

class BoardDimensions {
    constructor (height, width) {
        this.height = height;
        this.width = width;
    }
}

class BoardConfig {
    constructor (dimensions, numMines) {
        this.dimensions = dimensions;
        this.numMines = numMines;
    }
}

class BoardComponent extends React.Component {
    revealedSquares;

    constructor (props) {
        super(props);
        this.revealSquare = this.revealSquare.bind(this);
        this.state = { squares: this.createArray() };
        this.revealedSquares = new Set();
    }

    componentDidMount () {
        this.placeMines();
        this.setNeighborMineCounts();
    }

    getSquare (index) {
        let { x, y } = index;
        return x in this.state.squares && y in this.state.squares[x] ? this.state.squares[x][y] : null;
    }

    squareExists (index) {
        return this.getSquare(index) !== null;
    }

    // +---------> y axis
    // |
    // |
    // |
    // v
    // x axis
    createArray () {
        let { height, width } = this.props.config.dimensions;
        let squares = [];

        for (let x = 0; x < height; ++x) {
            let row = [];
            for (let y = 0; y < width; ++y) {
                row.push(DefaultSquare(new Vector2(x, y)));
            }
            squares.push(row);
        }
        return squares;
    }

    placeMines () {
        _.sample(_.flatten(this.state.squares), this.props.config.numMines).forEach(square_ => square_.hasMine = true);
    }

    setNeighborMineCounts () {
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            for (let square of _.flatten(newState.squares)) {
                if (square.hasMine) {
                    continue;
                }

                square.neighborMineCount = this.getNeighbors(square).filter(neighbor_ => neighbor_.hasMine).length;
            }

            return newState;
        });
    }

    getSquaresRelativeTo (index, diffs) {
        let squares = [];

        for (let diff of diffs) {
            let newIndex = index.add(diff);
            if (this.squareExists(newIndex)) {
                squares.push(this.getSquare(newIndex));
            }
        }

        return squares;
    }

    getNeighbors (square) {
        let diffs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].map(v_ => new Vector2(v_[0], v_[1]));

        return this.getSquaresRelativeTo(square.index, diffs);
    }

    createTable () {
        let alive = this.props.alive;
        let squares = alive ? this.state.squares : this.createArray();
        let table = [];

        for (let row_ of squares) {
            let row = [];
            for (let square of row_) {
                row.push(<SquareComponent value={square} alive={alive} onClick={this.handleClick.bind(this)} />);
            }
            table.push(<tr>{row}</tr>);
        }

        return table;
    }

    render () {
        return <table><tbody>{this.createTable()}</tbody></table>;
    }

    handleClick (index, event) {
        event.preventDefault();

        let square = this.getSquare(index);

        if (event.type === 'click') {
            if (square.status === SquareStatus.REVEALED) {
                // whether a square with n neighbor mines has n flags around it
                let completelyFlagged = this.getNeighbors(square).filter(
                                            neighbor_ => neighbor_.status === SquareStatus.FLAGGED
                                        ).length === square.neighborMineCount;
                if (!completelyFlagged) {
                    return;
                }

                for (let neighbor of this.getNeighbors(square).filter((neighbor_) => neighbor_.status === SquareStatus.NONE)) {
                    this.revealSquare(neighbor);
                }
            } else if (square.status === SquareStatus.NONE) {
                this.revealSquare(square);
            }
        } else if (event.type === 'contextmenu') {
            if (square.status === SquareStatus.NONE) {
                this.flagSquare(square);
            } else if (square.status === SquareStatus.FLAGGED) {
                this.unflagSquare(square);
            }
        }
    }

    setSquareStatus (square, status) {
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            let { x, y } = square.index;
            newState.squares[x][y].status = status;
            return newState;
        })
    }

    revealSquare (square) {
        this.setSquareStatus(square, SquareStatus.REVEALED);
        this.revealedSquares.add(square);

        if (square.hasMine || square.neighborMineCount !== 0) {
            return;
        }

        for (let neighbor of this.getNeighbors(square)) {
            if (!neighbor.hasMine && !this.revealedSquares.has(neighbor)) {
                this.revealSquare(neighbor);
            }
        }
    }

    flagSquare (square) {
        this.setSquareStatus(square, SquareStatus.FLAGGED);
    }

    unflagSquare (square) {
        this.setSquareStatus(square, SquareStatus.NONE);
    }
}

BoardComponent.propTypes = {
    config: PropTypes.instanceOf(BoardConfig),
    alive: PropTypes.bool
};

export { Vector2, BoardComponent, BoardDimensions, BoardConfig };
