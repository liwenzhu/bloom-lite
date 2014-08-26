var Bloom = require("./index.js");
var bloom = new Bloom();
bloom.add("http://www.baidu.com");
bloom.add("http://omy2do.com");
console.log(bloom.exist("http://www.baidu.com")); // true
console.log(bloom.exist("http://github.com")); //false