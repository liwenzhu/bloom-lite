/**
The MIT License (MIT)

Copyright (c) 2014 Vincent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

'use strict';

var crypto = require('crypto');

module.exports = Bloom;

function Bloom () {
    this.buckets = [];
};

Bloom.prototype.add = function (data) {
    var md5Value, sha1Value;
    md5Value = md5(data);
    fillBucket(md5Value, this.buckets);
    sha1Value = sha1(data);
    fillBucket(sha1Value, this.buckets);
};

Bloom.prototype.exist = function (data) {
    var md5Value, sha1Value;
    md5Value = md5(data);
    if(!visited(md5Value, this.buckets))
        return false;
    sha1Value = sha1(data);
    if(!visited(sha1Value, this.buckets))
        return false;
    return true;
};

function visited (hashedValue, buckets) {
    var bucketIndex, positionIndex;
    bucketIndex = getBucketIndex(hashedValue);
    positionIndex = getPositionIndex(hashedValue);
    return ( buckets[bucketIndex] & ( 1 << positionIndex ) );
};

function fillBucket (hashedValue, buckets) {
    var bucketIndex, positionIndex;
    bucketIndex = getBucketIndex(hashedValue);
    positionIndex = getPositionIndex(hashedValue);
    buckets[bucketIndex] = buckets[bucketIndex] || 0;
    buckets[bucketIndex] = buckets[bucketIndex] | ( 1 << positionIndex );
};

function getBucketIndex (hashedValue) {
    return hashedValue >>> 5; 
};

function getPositionIndex (hashedValue) {
    return hashedValue & 31;
};

function md5 (data) {
    return crypto.createHash('md5').update(data).digest().readUInt16LE(0);
};

function sha1 (data) {
    return crypto.createHash('sha1').update(data).digest().readUInt32LE(0);
};




