bloom-lite
==========

A simple bloom filter.

Installation
============

```bash
$ npm install bloom-lite
```

Usage
=====

```javascript
var Bloom = require("bloom-lite");
var bloom = new Bloom();
bloom.add("http://www.baidu.com");
bloom.add("http://omy2do.com");
bloom.exist("http://www.baidu.com"); // true
bloom.exist("http://github.com"); //false
```