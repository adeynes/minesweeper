/**
 * @callback 2dGenerator
 * @param {number} x
 * @param {number} y
 * @returns T
 * @template T
 */

/**
 * @param {{height: number, width: number}} dimensions
 * @param {2dGenerator} generator
 * @returns {T[]}
 * @template T
 */
export function create2dArray(dimensions, generator) {
    let array = [];

    for (let x = 0; x < dimensions.height; ++x) {
        let row = [];
        for (let y = 0; y < dimensions.width; ++y) {
            row.push(generator(x, y));
        }
        array.push(row);
    }

    return array;
}