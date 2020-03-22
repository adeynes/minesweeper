/* global BigInt */

import _ from "underscore";

/**
 * Converts numbers in a given radix to other radices (BigInt)
 * @param {*} value
 * @param {number} radix
 * @returns {BigInt}
 */
function switchRadix(value, radix) {
    return [...value.toString()].reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), BigInt(0));
}

/**
 * Generates a random seed for a given config
 * @param {BoardConfig} config
 * @returns {string} The base-36 string
 */
export function generateSeed(config) {
    let sum = BigInt(0);
    _.sample([...Array(config.dimensions.getTotalCellCount()).keys()], config.numMines)
        .forEach(index => sum |= BigInt(2) ** BigInt(index));

    return sum.toString(36);
}

/**
 * Returns the list of mine indices given the seed
 * @param {string} seed
 * @param {number} maximum_index When to forcefully stop calculation. This handles boards up to 30x48.
 * @returns {number[]}
 */
export function getMineListFromSeed(seed, maximum_index = 1439) {
    let mine_indices = [];
    let sum = switchRadix(seed, 36);

    for (let i = 0; i <= maximum_index; ++i) {
        let p = BigInt(2) ** BigInt(i);

        // noinspection JSBitwiseOperatorUsage
        if (sum & p) {
            sum -= p;
            mine_indices.push(i);
        }

        if (sum === BigInt(0)) {
            break;
        }
    }

    return mine_indices;
}