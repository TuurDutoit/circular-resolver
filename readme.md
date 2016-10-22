circular-resolver
=================

Resolves modules with circular dependencies.

## Installation
```
npm install --save circular-resolver
```

## Usage
This module exports just one class, `Resolver`. Use a regular `require()` to get it and create a new instance:

```js
var Resolver = require("circular-resolver");
var modules = new Resolver();

modules.dep(a, "b");
modules.obj("a", a);
// etc.
```


## API
>  Coming soon, maybe?

In the meantime, just look at `example.js` or just the source code; it's less than 50 lines of code...


## License
MIT
