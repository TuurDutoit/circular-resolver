module.exports = class Resolver {
  constructor({filter, process, objs = {}, deps = {}} = {}) {
    this.filter = filter || (name => name);
    this.process = process || ((src, dest, key) => src)
    this.objs = this.objs(objs);
    this.deps = deps;
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

  objs(objs) {
    for(var name in objs) {
      this.obj(name, objs[name]);
    }

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
        dest[key] = this.process(obj, dest, key);
      }
    }

    return this;
  }
}
