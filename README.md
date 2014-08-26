bloom-lite
==========

A simple bloom filter.

[![NPM](https://nodei.co/npm/bloom-lite.png?stars&downloads)](https://nodei.co/npm/bloom-lite/) [![NPM](https://nodei.co/npm-dl/bloom-lite.png)](https://nodei.co/npm/bloom-lite/)

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