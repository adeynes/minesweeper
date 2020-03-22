import _ from "underscore";

import { DefaultSquare } from "model/square/Square";
import SquareStatus from "model/square/SquareStatus";

import Vector2 from "utils/Vector2";
import { create2dArray } from "utils/ArrayUtils";
import { getMineListFromSeed } from "utils/SeedGenerator";


export default class Board {
    /**
     * @type {BoardConfig}
     */
    config;

    /**
     * @type {string}
     */
    seed;

    /**
     * @type {Square[][]}
     */
    squares;

    /**
     * @type {Set<Square>}
     */
    revealedSquares;

    /**
     * @callback noticeCallback
     * @param {Board} newBoard
     * @param {boolean} noticeStatus
     */

    /**
     * @type {noticeCallback}
     */
    postSetStateCallback;

    /**
     * @param {BoardConfig} config
     * @param {string} seed
     * @param {noticeCallback} postSetStateCallback
     */
    constructor(config, seed, postSetStateCallback) {
        this.config = config;
        this.seed = seed;
        this.squares = create2dArray(config.dimensions, (x, y) => DefaultSquare(new Vector2(x, y)));
        this.revealedSquares = new Set();
        this.postSetStateCallback = postSetStateCallback;
    }

    /**
     * Returns the Vector2 index (0 => [0, 0], 164 => [5, 14], 479 => [15, 29] for 16x30)
     * @param {number} number
     * @returns {?Vector2}
     */
    getIndexFromNumber(number) {
        let width = this.config.dimensions.width;
        return new Vector2(Math.floor(number / width), number % width);
    }

    /**
     * @param {Vector2} index
     * @returns {?Square}
     */
    getSquare(index) {
        let { x, y } = index;
        return x in this.squares && y in this.squares[x] ? this.squares[x][y] : null;
    }

    /**
     * @param {Vector2} index
     * @returns {boolean}
     */
    squareExists(index) {
        return this.getSquare(index) !== null;
    }

    /**
     * @param {Square} square
     * @param {Vector2[]} diffs
     * @returns {Square[]}
     */
    getSquaresRelativeTo(square, diffs) {
        return diffs.map(diff => this.getSquare(square.index.add(diff)))
                    .filter(square_ => square_ !== null);
    }

    /**
     * @param {Square} square
     * @returns {Square[]}
     */
    getNeighbors(square) {
        let diffs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
                    .map(diff => new Vector2(diff[0], diff[1]));

        return this.getSquaresRelativeTo(square, diffs);
    }

    initialize() {
        this.placeMines();
        this.setNeighborMineCounts();
    }

    placeMines() {
        getMineListFromSeed(this.seed, this.config.dimensions.getTotalCellCount())
            .forEach(index => this.getSquare(this.getIndexFromNumber(index)).hasMine = true);
    }

    setNeighborMineCounts() {
        for (let square of _.flatten(this.squares)) {
            if (square.hasMine) {
                continue;
            }

            square.neighborMineCount = this.getNeighbors(square).filter(neighbor => neighbor.hasMine).length;
        }
    }

    /**
     * @param {Square} square
     * @param {SquareStatus} newStatus
     * @param {boolean} noticeStatus The status passed to postSetStateCallback
     */
    setSquareStatus(square, newStatus, noticeStatus) {
        let { x, y } = square.index;
        this.squares[x][y].status = newStatus;

        this.postSetStateCallback(this, noticeStatus);
    }

    /**
     * @param {Square} square
     * @returns {?boolean} null => nothing has been done <= the square status isn't NONE. otherwise true
     */
    revealSquare(square) {
        if (square.status !== SquareStatus.NONE) {
            return null;
        }

        this.setSquareStatus(square, SquareStatus.REVEALED, !square.hasMine);
        this.revealedSquares.add(square);

        if (!square.hasMine && square.neighborMineCount === 0) {
            for (let neighbor of this.getNeighbors(square)) {
                if (!this.revealedSquares.has(neighbor)) {
                    // we don't care about the return value since there are no neighbor mines anyways
                    this.revealSquare(neighbor);
                }
            }
        }

        return true;
    }

    /**
     * This is a REQUEST to reveal the neighbors; the conditions are checked here
     * @param {Square} square
     * @returns {?boolean} null => nothing has been done <= the square status isn't REVEALED or isn't completely flagged. otherwise true
     */
    revealNeighbors(square) {
        // whether a square with n neighbor mines has n flags around it
        let completelyFlagged = this.getNeighbors(square)
            .filter(neighbor_ =>
                        (neighbor_.status === SquareStatus.FLAGGED) ||
                        (neighbor_.hasMine && neighbor_.status === SquareStatus.REVEALED)
            )
            .length === square.neighborMineCount;
        if (square.status !== SquareStatus.REVEALED || !completelyFlagged) {
            return null;
        }

        for (let neighbor of this.getNeighbors(square).filter((neighbor_) => neighbor_.status === SquareStatus.NONE)) {
            this.revealSquare(neighbor);
        }

        return true;
    }

    /**
     * @param {Square} square
     * @returns {?boolean} null => nothing has been done <= the square status isn't NONE. otherwise true
     */
    flagSquare(square) {
        if (square.status !== SquareStatus.NONE) {
            return null;
        }

        this.setSquareStatus(square, SquareStatus.FLAGGED, true);

        return true;
    }

    /**
     * @param {Square} square
     * @returns {?boolean} null => nothing has been done <= the square status isn't FLAGGED. otherwise true
     */
    unflagSquare(square) {
        if (square.status !== SquareStatus.FLAGGED) {
            return null;
        }

        this.setSquareStatus(square, SquareStatus.NONE, true);

        return true;
    }
}
