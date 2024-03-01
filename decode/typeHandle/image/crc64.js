// @ts-check

const crc64_table = Array.from({ length: 256 }, () => 0n);
for (let i = 0; i < crc64_table.length; i += 1) {
    let bf = BigInt(i);
    for (let j = 0; j < 8; j++) {
        if ((bf & 1n) != 0n) {
            bf = (bf >> 1n) ^ -7661587058870466123n;
        } else {
            bf >>= 1n;
        }
        crc64_table[i] = bf;
    }
}

/** @type {(input: string) => string} */
const crc64 = input => {
    let v = -1n;
    for (let i = 0; i < input.length; i++) {
        v =
            crc64_table[Number((BigInt(input.charCodeAt(i)) ^ v) & 255n)] ^
            (v >> 8n);
    }
    return v.toString(16);
};

module.exports = { crc64 };

/** Only for test. If it comes out with error, just remove it */
if (process.env.TEST) {
    const assert = require('node:assert');
    /** Only for test. If it comes out with error, just remove it */
    assert.strictEqual(
        crc64('chatimg:73C393EEE6BA2A917FADD8F675985B8C'),
        '79e215c8f13ee1e7'
    );
}
