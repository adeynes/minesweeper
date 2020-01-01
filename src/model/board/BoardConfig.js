import BoardDimensions from "model/board/BoardDimensions";


class BoardConfig {
    /**
     * @param {BoardDimensions} dimensions
     * @param {number} numMines
     */
    constructor(dimensions, numMines) {
        this.dimensions = dimensions;
        this.numMines = numMines;
    }
}


/**
 * @type {BoardConfig}
 */
export const DUMMY_CONFIG = new BoardConfig(new BoardDimensions(16, 30), 0);

/**
 * @type {BoardConfig}
 */
export const BEGINNER_CONFIG = new BoardConfig(new BoardDimensions(8, 8), 10);
/**
 * @type {BoardConfig}
 */
export const INTERMEDIATE_CONFIG = new BoardConfig(new BoardDimensions(16, 16), 40);
/**
 * @type {BoardConfig}
 */
export const EXPERT_CONFIG = new BoardConfig(new BoardDimensions(16, 30), 99);


export default BoardConfig;
