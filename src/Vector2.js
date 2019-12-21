class Vector2 {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    add (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
}

export default Vector2;