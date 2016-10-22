var Resolver = require("./resolver");
var modules = new Resolver();
var a = {custom: 45, other: "b"};
var b = {myKey: "hello"};

modules.dep(a, "other");
modules.dep(b, "other", "a");
modules.obj("a", a);
modules.obj("b", b);
modules.resolve();
console.log(a);
console.log(b);
