export default class Vector2 {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2} v
     * @returns {Vector2}
     */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
}
