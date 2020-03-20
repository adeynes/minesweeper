export default class BoardDimensions {
    /**
     * @param {number} height
     * @param {number} width
     */
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    /**
     * @returns {number}
     */
    getTotalCellCount() {
        return this.height * this.width;
    }
}
