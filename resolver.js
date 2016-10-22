module.exports = class Resolver {
  constructor(filter, objs = {}, deps = {}) {
    this.objs = objs;
    this.deps = deps;
    this.filter = filter || (name => name);
  }

  get() {
    return this.objs;
  }

  dep(dest, key, name) {
    name = name || dest[key];
    if(typeof(name) !== "string") return;
    name = this.filter(name);
    if(!this.deps[name]) this.deps[name] = [];
    this.deps[name].push([dest, key]);

    return this;
  }

  obj(name, obj) {
    this.objs[ this.filter(name) ] = obj;

    return this;
  }

  add(dest, key, name) {
    return typeof(dest) === "object" ? this.dep(dest, key, name) : this.obj(dest, key);
  }

  resolve() {
    for(var name in this.deps) {
      var dep = this.deps[name];
      var obj = this.objs[name];
      for(var i = 0, len = dep.length; i < len; i++) {
        var [dest, key] = dep[i];
        dest[key] = obj;
      }
    }

    return this;
  }
}
