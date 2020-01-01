import SquareStatus from "model/square/SquareStatus";


export default class Square {
    /**
     * @param {Vector2} index
     * @param {SquareStatus} status
     * @param {boolean} hasMine
     * @param {number} neighborMineCount
     */
    constructor(index, status, hasMine, neighborMineCount) {
        this.index = index;
        this.status = status;
        this.hasMine = hasMine;
        this.neighborMineCount = neighborMineCount;
    }
}


/**
 * @param {Vector2} id
 * @returns {Square}
 * @constructor
 */
export let DefaultSquare = (id) =>  new Square(id, SquareStatus.NONE, false, 0);
