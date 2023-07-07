// node_modules/@vue/shared/dist/shared.esm-bundler.js
var makeMap = function(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0;i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
};
var normalizeStyle = function(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0;i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
};
var parseStringStyle = function(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
};
var normalizeClass = function(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
};
var includeBooleanAttr = function(value) {
  return !!value || value === "";
};
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var NOOP = () => {
};
var NO = () => false;
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, arg) => {
  for (let i = 0;i < fns.length; i++) {
    fns[i](arg);
  }
};
var def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
var looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
var toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
var isBooleanAttr = makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var recordEffectScope = function(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
};
var getCurrentScope = function() {
  return activeEffectScope;
};
var cleanupEffect = function(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0;i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
};
var pauseTracking = function() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
};
var resetTracking = function() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
};
var track = function(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map);
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = undefined;
    trackEffects(dep, eventInfo);
  }
};
var trackEffects = function(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (false) {
    }
  }
};
var trigger = function(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== undefined) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = undefined;
  if (deps.length === 1) {
    if (deps[0]) {
      if (false) {
      } else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    if (false) {
    } else {
      triggerEffects(createDep(effects));
    }
  }
};
var triggerEffects = function(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
};
var triggerEffect = function(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (false) {
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
};
var createArrayInstrumentations = function() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length;i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
};
var hasOwnProperty2 = function(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
};
var createGetter = function(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
};
var createSetter = function(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
};
var deleteProperty = function(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var has$1 = function(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
};
var ownKeys = function(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
};
var get = function(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
};
var has = function(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
};
var size = function(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
};
var add = function(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
};
var set = function(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (false) {
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
};
var deleteEntry = function(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (false) {
  }
  const oldValue = get2 ? get2.call(target, key) : undefined;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var clear = function() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = undefined;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", undefined, undefined, oldTarget);
  }
  return result;
};
var createForEach = function(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
};
var createIterableMethod = function(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
};
var createReadonlyMethod = function(type) {
  return function(...args) {
    if (false) {
    }
    return type === "delete" ? false : this;
  };
};
var createInstrumentations = function() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
};
var createInstrumentationGetter = function(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && (key in target) ? instrumentations : target, key, receiver);
  };
};
var targetTypeMap = function(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
};
var getTargetType = function(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
};
var reactive = function(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
};
var shallowReactive = function(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
};
var readonly = function(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
};
var createReactiveObject = function(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (false) {
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
};
var isReactive = function(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
};
var isReadonly = function(value) {
  return !!(value && value["__v_isReadonly"]);
};
var isShallow = function(value) {
  return !!(value && value["__v_isShallow"]);
};
var isProxy = function(value) {
  return isReactive(value) || isReadonly(value);
};
var toRaw = function(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
};
var markRaw = function(value) {
  def(value, "__v_skip", true);
  return value;
};
var trackRefValue = function(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    if (false) {
    } else {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
};
var triggerRefValue = function(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    if (false) {
    } else {
      triggerEffects(dep);
    }
  }
};
var isRef = function(r) {
  return !!(r && r.__v_isRef === true);
};
var ref = function(value) {
  return createRef(value, false);
};
var createRef = function(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
};
var unref = function(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
};
var proxyRefs = function(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
};
var computed = function(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (false) {
  }
  return cRef;
};
var activeEffectScope;

class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (false) {
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length;i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length;i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length;i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = undefined;
      this._active = false;
    }
  }
}
var createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
var newTracked = (dep) => (dep.n & trackOpBit) > 0;
var initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0;i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
var finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0;i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
var targetMap = new WeakMap;
var effectTrackDepth = 0;
var trackOpBit = 1;
var maxMarkerBits = 30;
var activeEffect;
var ITERATE_KEY = Symbol("");
var MAP_KEY_ITERATE_KEY = Symbol("");

class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = undefined;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = undefined;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
var shouldTrack = true;
var trackStack = [];
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
var get$1 = createGetter();
var shallowGet = createGetter(false, true);
var readonlyGet = createGetter(true);
var arrayInstrumentations = createArrayInstrumentations();
var set$1 = createSetter();
var shallowSet = createSetter(true);
var mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (false) {
    }
    return true;
  },
  deleteProperty(target, key) {
    if (false) {
    }
    return true;
  }
};
var shallowReactiveHandlers = extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
var [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = createInstrumentations();
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var reactiveMap = new WeakMap;
var shallowReactiveMap = new WeakMap;
var readonlyMap = new WeakMap;
var shallowReadonlyMap = new WeakMap;
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;

class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = undefined;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = undefined;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var warn = function(msg, ...args) {
  if (true)
    return;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
};
var getComponentTrace = function() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
};
var formatTrace = function(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
};
var formatTraceEntry = function({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
};
var formatProps = function(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
};
var formatProp = function(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
};
var callWithErrorHandling = function(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
};
var callWithAsyncErrorHandling = function(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0;i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
};
var handleError = function(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0;i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
};
var logError = function(err, type, contextVNode, throwInDev = true) {
  if (false) {
  } else {
    console.error(err);
  }
};
var nextTick = function(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
};
var findInsertionIndex = function(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
};
var queueJob = function(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
};
var queueFlush = function() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
};
var invalidateJob = function(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
};
var queuePostFlushCb = function(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
};
var flushPreFlushCbs = function(seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (false) {
  }
  for (;i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (false) {
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
};
var flushPostFlushCbs = function(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (false) {
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0;postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (false) {
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
};
var flushJobs = function(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (false) {
  }
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0;flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false) {
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
};
var emit$1 = function(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
};
var setDevtoolsHook = function(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) == null ? undefined : _a.userAgent) == null ? undefined : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3000);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
};
var devtoolsInitApp = function(app, version) {
  emit$1("app:init", app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
};
var devtoolsUnmountApp = function(app) {
  emit$1("app:unmount", app);
};
var createDevtoolsComponentHook = function(hook) {
  return (component) => {
    emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
  };
};
var devtoolsComponentEmit = function(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
};
var emit = function(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (false) {
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && (modelArg in props)) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (__VUE_PROD_DEVTOOLS__) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (false) {
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
};
var normalizeEmitsOptions = function(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== undefined) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
};
var isEmitListener = function(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
};
var setCurrentRenderingInstance = function(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
};
var withCtx = function(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (__VUE_PROD_DEVTOOLS__) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
};
var renderComponentRoot = function(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (false) {
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) {
      }
      result = normalizeVNode(render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = undefined;
  if (false) {
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (false) {
      }
    }
  }
  if (vnode.dirs) {
    if (false) {
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (false) {
    }
    root.transition = vnode.transition;
  }
  if (false) {
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
};
var shouldUpdateComponent = function(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (false) {
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0;i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
};
var hasPropsChanged = function(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0;i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
};
var updateHOCHostEl = function({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
};
var queueEffectWithSuspense = function(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
};
var watch = function(source, cb, options) {
  if (false) {
  }
  return doWatch(source, cb, options);
};
var doWatch = function(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  if (false) {
  }
  const warnInvalidSource = (s) => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? undefined : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : undefined,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? undefined : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, scheduler);
  if (false) {
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
  } else {
    effect2.run();
  }
  const unwatch = () => {
    effect2.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect2);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
};
var instanceWatch = function(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
};
var createPathGetter = function(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0;i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
};
var traverse = function(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || new Set;
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
};
var withDirectives = function(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0;i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: undefined,
        arg,
        modifiers
      });
    }
  }
  return vnode;
};
var invokeDirectiveHook = function(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0;i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
};
var useTransitionState = function() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
};
var getLeavingNodesForType = function(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
};
var resolveTransitionHooks = function(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = undefined;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el._leaveCb = undefined;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
};
var emptyPlaceholder = function(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
};
var getKeepAliveChild = function(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
};
var setTransitionHooks = function(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
};
var getTransitionRawChildren = function(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0;i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0;i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
};
var onActivated = function(hook, target) {
  registerKeepAliveHook(hook, "a", target);
};
var onDeactivated = function(hook, target) {
  registerKeepAliveHook(hook, "da", target);
};
var registerKeepAliveHook = function(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
};
var injectToKeepAliveRoot = function(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
};
var injectHook = function(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (false) {
  }
};
var onErrorCaptured = function(hook, target = currentInstance) {
  injectHook("ec", hook, target);
};
var resolveComponent = function(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
};
var resolveDirective = function(name) {
  return resolveAsset(DIRECTIVES, name);
};
var resolveAsset = function(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (false) {
    }
    return res;
  } else if (false) {
  }
};
var resolve = function(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
};
var renderList = function(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length;i < l; i++) {
      ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (false) {
    }
    ret = new Array(source);
    for (let i = 0;i < source; i++) {
      ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, undefined, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length;i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
};
var renderSlot = function(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (false) {
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, {
    key: props.key || validSlotContent && validSlotContent.key || `_${name}`
  }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
};
var ensureValidVNode = function(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
};
var normalizePropsOrEmits = function(props) {
  return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
};
var applyOptions = function(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (false) {
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (false) {
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (false) {
        }
      } else if (false) {
      }
    }
  }
  if (dataOptions) {
    if (false) {
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (false) {
    }
    if (!isObject(data)) {
    } else {
      instance.data = reactive(data);
      if (false) {
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (false) {
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed2({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (false) {
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
};
var resolveInjections = function(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (false) {
    }
  }
};
var callHook = function(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
};
var createWatcher = function(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (false) {
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (false) {
      }
    }
  } else if (false) {
  }
};
var resolveMergedOptions = function(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
};
var mergeOptions = function(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
};
var mergeDataFn = function(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
};
var mergeInject = function(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
};
var normalizeInject = function(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0;i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
};
var mergeAsArray = function(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
};
var mergeObjectOptions = function(to, from) {
  return to ? extend(Object.create(null), to, from) : from;
};
var mergeEmitsOrPropsOptions = function(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [...new Set([...to, ...from])];
    }
    return extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
  } else {
    return from;
  }
};
var mergeWatchOptions = function(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
};
var createAppContext = function() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  };
};
var createAppAPI = function(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    if (false) {
    }
    const installedPlugins = new Set;
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (false) {
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (false) {
        }
        return app;
      },
      mixin(mixin) {
        if (__VUE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (false) {
          }
        } else if (false) {
        }
        return app;
      },
      component(name, component) {
        if (false) {
        }
        if (!component) {
          return context.components[name];
        }
        if (false) {
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (false) {
        }
        if (!directive) {
          return context.directives[name];
        }
        if (false) {
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (false) {
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (false) {
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (__VUE_PROD_DEVTOOLS__) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (false) {
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          if (__VUE_PROD_DEVTOOLS__) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (false) {
        }
      },
      provide(key, value) {
        if (false) {
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
};
var provide = function(key, value) {
  if (!currentInstance) {
    if (false) {
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
};
var inject = function(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && (key in provides)) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (false) {
    }
  } else if (false) {
  }
};
var initProps = function(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = undefined;
    }
  }
  if (false) {
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
};
var updateProps = function(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0;i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== undefined || rawPrevProps[kebabKey] !== undefined)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  if (false) {
  }
};
var setFullProps = function(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0;i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
};
var resolvePropValue = function(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
};
var normalizePropsOptions = function(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0;i < raw.length; i++) {
      if (false) {
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (false) {
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
};
var validatePropName = function(key) {
  if (key[0] !== "$") {
    return true;
  } else if (false) {
  }
  return false;
};
var getType = function(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
};
var isSameType = function(a, b) {
  return getType(a) === getType(b);
};
var getTypeIndex = function(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
};
var setRef = function(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (false) {
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (false) {
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (false) {
    }
  }
};
var createHydrationFunctions = function(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0;i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
            nextNode = nextSibling(nextNode);
          }
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else if (false) {
        }
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    if (forcePatchValue || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp(el, key, null, props[key], false, undefined, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp(el, "onClick", null, props.onClick, false, undefined, parentComponent);
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        let hasWarned = false;
        while (next) {
          hasMismatch = true;
          if (false) {
          }
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    let hasWarned = false;
    for (let i = 0;i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if (false) {
        }
        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate, hydrateNode];
};
var initFeatureFlags = function() {
  const needWarn = [];
  if (typeof __VUE_OPTIONS_API__ !== "boolean") {
    getGlobalThis().__VUE_OPTIONS_API__ = true;
  }
  if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
  }
  if (false) {
  }
};
var createHydrationRenderer = function(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
};
var baseCreateRenderer = function(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (__VUE_PROD_DEVTOOLS__) {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (false) {
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (false) {
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (__VUE_PROD_DEVTOOLS__) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0;i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (false) {
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start;i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (false) {
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (false) {
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0;i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0;i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (false) {
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (false) {
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (false) {
    }
    if (false) {
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (false) {
      }
      setupComponent(instance);
      if (false) {
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    if (false) {
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (false) {
        }
        updateComponentPreRender(instance, n2, optimized);
        if (false) {
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (false) {
            }
            instance.subTree = renderComponentRoot(instance);
            if (false) {
            }
            if (false) {
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            if (false) {
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          if (false) {
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (false) {
          }
          if (false) {
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          if (false) {
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (__VUE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (false) {
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (false) {
        }
        const nextTree = renderComponentRoot(instance);
        if (false) {
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (false) {
        }
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        if (false) {
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        if (__VUE_PROD_DEVTOOLS__) {
          devtoolsComponentUpdated(instance);
        }
        if (false) {
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(update), instance.scope);
    const update = instance.update = () => effect2.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (false) {
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0;i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map;
      for (i = s2;i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (false) {
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0;i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1;i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2;j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === undefined) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1;i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0;i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (false) {
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (false) {
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (__VUE_PROD_DEVTOOLS__) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start;i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
};
var toggleRecurse = function({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
};
var traverseStaticChildren = function(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0;i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (false) {
      }
    }
  }
};
var getSequence = function(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0;i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
};
var openBlock = function(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
};
var closeBlock = function() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
};
var setBlockTracking = function(value) {
  isBlockTreeEnabled += value;
};
var setupBlock = function(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
};
var createElementBlock = function(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
};
var createBlock = function(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
};
var isVNode = function(value) {
  return value ? value.__v_isVNode === true : false;
};
var isSameVNodeType = function(n1, n2) {
  if (false) {
  }
  return n1.type === n2.type && n1.key === n2.key;
};
var createBaseVNode = function(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (false) {
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
};
var _createVNode = function(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (false) {
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (false) {
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
};
var guardReactiveProps = function(props) {
  if (!props)
    return null;
  return isProxy(props) || (InternalObjectKey in props) ? extend({}, props) : props;
};
var cloneVNode = function(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
};
var createTextVNode = function(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
};
var createCommentVNode = function(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
};
var normalizeVNode = function(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
};
var cloneIfMounted = function(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
};
var normalizeChildren = function(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
};
var mergeProps = function(...args) {
  const ret = {};
  for (let i = 0;i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
};
var invokeVNodeHook = function(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
};
var createComponentInstance = function(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (false) {
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
};
var isStatefulComponent = function(instance) {
  return instance.vnode.shapeFlag & 4;
};
var setupComponent = function(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  isInSSRComponentSetup = false;
  return setupResult;
};
var setupStatefulComponent = function(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (false) {
  }
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (false) {
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (false) {
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
};
var handleSetupResult = function(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (false) {
    }
    if (__VUE_PROD_DEVTOOLS__) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (false) {
    }
  } else if (false) {
  }
  finishComponentSetup(instance, isSSR);
};
var finishComponentSetup = function(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (false) {
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        if (false) {
        }
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (__VUE_OPTIONS_API__ && true) {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (false) {
  }
};
var getAttrsProxy = function(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  }));
};
var createSetupContext = function(instance) {
  const expose = (exposed) => {
    if (false) {
    }
    instance.exposed = exposed || {};
  };
  if (false) {
  } else {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
};
var getExposeProxy = function(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return (key in target) || (key in publicPropertiesMap);
      }
    }));
  }
};
var getComponentName = function(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
};
var formatComponentName = function(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
};
var isClassComponent = function(value) {
  return isFunction(value) && ("__vccOpts" in value);
};
var h = function(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
};
var stack = [];
var isFlushing = false;
var isFlushPending = false;
var queue = [];
var flushIndex = 0;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = Promise.resolve();
var currentFlushPromise = null;
var getId = (job) => job.id == null ? Infinity : job.id;
var comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
if (false) {
}
var devtools;
var buffer = [];
var devtoolsNotInstalled = false;
var devtoolsComponentAdded = createDevtoolsComponentHook("component:added");
var devtoolsComponentUpdated = createDevtoolsComponentHook("component:updated");
var _devtoolsComponentRemoved = createDevtoolsComponentHook("component:removed");
var devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
var currentRenderingInstance = null;
var currentScopeId = null;
var getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
var isSuspense = (type) => type.__isSuspense;
var INITIAL_WATCHER_VALUE = {};
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
var BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (false) {
            }
            child = c;
            hasFound = true;
            if (true)
              break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (false) {
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === undefined) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = undefined;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
var BaseTransition = BaseTransitionImpl;
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
var COMPONENTS = "components";
var DIRECTIVES = "directives";
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
var getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
});
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (false) {
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== undefined) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (false) {
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (false) {
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (false) {
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && (key.slice(1) in instance)) {
      return false;
    } else {
      if (false) {
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (false) {
}
var shouldCacheAccess = true;
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
var uid$1 = 0;
var currentApp = null;
var isInternalKey = (key) => key[0] === "_" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) {
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (false) {
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  if (false) {
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
var updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (false) {
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
var hasMismatch = false;
var isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
var isComment = (node) => node.nodeType === 8;
var queuePostRenderEffect = queueEffectWithSuspense;
var isTeleport = (type) => type.__isTeleport;
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
var isBlockTreeEnabled = 1;
var InternalObjectKey = `__vInternal`;
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
var createVNode = _createVNode;
var emptyAppContext = createAppContext();
var uid = 0;
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var globalCurrentInstanceSetters;
var settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
var setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
var unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
var isInSSRComponentSetup = false;
var compile;
var installWithProxy;
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
var computed2 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
    }
    return ctx;
  }
};
var version = "3.3.4";
// node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var patchClass = function(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
};
var patchStyle = function(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
};
var setStyle = function(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (false) {
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
};
var autoPrefix = function(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && (name in style)) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0;i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
};
var patchAttr = function(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
};
var patchDOMProp = function(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (false) {
    }
  }
  needRemove && el.removeAttribute(key);
};
var addEventListener = function(el, event, handler, options) {
  el.addEventListener(event, handler, options);
};
var removeEventListener = function(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
};
var patchEvent = function(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = undefined;
    }
  }
};
var parseName = function(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
};
var createInvoker = function(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
};
var patchStopImmediatePropagation = function(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
};
var shouldSetAsProp = function(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if ((key in el) && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
};
var resolveTransitionProps = function(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook2(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook2(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook2(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook2(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook2(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook2(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook2(onLeaveCancelled, [el]);
    }
  });
};
var normalizeDuration = function(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
};
var NumberOf = function(val) {
  const res = toNumber(val);
  if (false) {
  }
  return res;
};
var addTransitionClass = function(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set)).add(cls);
};
var removeTransitionClass = function(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = undefined;
    }
  }
};
var nextFrame = function(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
};
var whenTransitionEnds = function(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
};
var getTransitionInfo = function(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
};
var getTimeout = function(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
};
var toMs = function(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1000;
};
var forceReflow = function() {
  return document.body.offsetHeight;
};
var callPendingCbs = function(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
};
var recordPosition = function(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
};
var applyTranslation = function(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
};
var hasCSSTransform = function(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
};
var ensureHydrationRenderer = function() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
};
var normalizeContainer = function(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (false) {
    }
    return res;
  }
  if (false) {
  }
  return container;
};
var svgNS = "http://www.w3.org/2000/svg";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && doc.createElement("template");
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : undefined);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
var importantRE = /\s*!important$/;
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
var xlinkNS = "http://www.w3.org/1999/xlink";
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
var cachedNow = 0;
var p = Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
var nativeOnRE = /^on[a-z]/;
var patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
var TransitionPropsValidators = Transition.props = extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var callHook2 = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
var endId = 0;
var positionMap = new WeakMap;
var newPositionMap = new WeakMap;
var TransitionGroupImpl = {
  name: "TransitionGroup",
  props: extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0;i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else if (false) {
        }
      }
      if (prevChildren) {
        for (let i = 0;i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
var removeMode = (props) => delete props.mode;
TransitionGroupImpl.props;
var rendererOptions = extend({ patchProp }, nodeOps);
var renderer;
var enabledHydration = false;
var createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  if (false) {
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
// node_modules/vue/dist/vue.runtime.esm-bundler.js
if (false) {
}

// node_modules/primevue/utils/utils.esm.js
var handler = function() {
  let zIndexes = [];
  const generateZIndex = (key, autoZIndex, baseZIndex = 999) => {
    const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({ key, value: newZIndex });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = (key, autoZIndex) => {
    return getLastZIndex(key, autoZIndex).value;
  };
  const getLastZIndex = (key, autoZIndex, baseZIndex = 0) => {
    return [...zIndexes].reverse().find((obj) => autoZIndex ? true : obj.key === key) || { key, value: baseZIndex };
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: (key) => getCurrentZIndex(key, true)
  };
};
var DomHandler = {
  innerWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  width(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  getWindowScrollTop() {
    let doc2 = document.documentElement;
    return (window.pageYOffset || doc2.scrollTop) - (doc2.clientTop || 0);
  },
  getWindowScrollLeft() {
    let doc2 = document.documentElement;
    return (window.pageXOffset || doc2.scrollLeft) - (doc2.clientLeft || 0);
  },
  getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth;
      if (margin) {
        let style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width;
    }
    return 0;
  },
  getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight(el, margin) {
    if (el) {
      let height = el.clientHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport() {
    let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h2 = win.innerHeight || e.clientHeight || g.clientHeight;
    return { width: w, height: h2 };
  },
  getOffset(el) {
    if (el) {
      let rect = el.getBoundingClientRect();
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index(element) {
    if (element) {
      let children = element.parentNode.childNodes;
      let num = 0;
      for (let i = 0;i < children.length; i++) {
        if (children[i] === element)
          return num;
        if (children[i].nodeType === 1)
          num++;
      }
    }
    return -1;
  },
  addMultipleClasses(element, className) {
    if (element && className) {
      if (element.classList) {
        let styles = className.split(" ");
        for (let i = 0;i < styles.length; i++) {
          element.classList.add(styles[i]);
        }
      } else {
        let styles = className.split(" ");
        for (let i = 0;i < styles.length; i++) {
          element.className += " " + styles[i];
        }
      }
    }
  },
  addClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += " " + className;
    }
  },
  removeClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass(element, className) {
    if (element) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  getHeight(el) {
    if (el) {
      let height = el.offsetHeight;
      let style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth(el) {
    if (el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width;
    }
    return 0;
  },
  absolutePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      let elementOuterHeight = elementDimensions.height;
      let elementOuterWidth = elementDimensions.width;
      let targetOuterHeight = target.offsetHeight;
      let targetOuterWidth = target.offsetWidth;
      let targetOffset = target.getBoundingClientRect();
      let windowScrollTop = this.getWindowScrollTop();
      let windowScrollLeft = this.getWindowScrollLeft();
      let viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        element.style.transformOrigin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = "top";
      }
      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else
        left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  relativePosition(element, target) {
    if (element) {
      let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top, left;
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        element.style.transformOrigin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
        element.style.transformOrigin = "top";
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  },
  getParents(element, parents = []) {
    return element["parentNode"] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
  },
  getScrollableParents(element) {
    let scrollableParents = [];
    if (element) {
      let parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node) => {
        let styleDeclaration = window["getComputedStyle"](node, null);
        return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
      };
      for (let parent of parents) {
        let scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
        if (scrollSelectors) {
          let selectors = scrollSelectors.split(",");
          for (let selector of selectors) {
            let el = this.findSingle(parent, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          }
        }
        if (parent.nodeType !== 9 && overflowCheck(parent)) {
          scrollableParents.push(parent);
        }
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions(element) {
    if (element) {
      let dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      let last = +new Date;
      let opacity = 0;
      let tick = function() {
        opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date;
        if (+opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  },
  fadeOut(element, ms) {
    if (element) {
      let opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      let fading = setInterval(() => {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent() {
    return navigator.userAgent;
  },
  appendChild(element, target) {
    if (this.isElement(target))
      target.appendChild(element);
    else if (target.el && target.elElement)
      target.elElement.appendChild(element);
    else
      throw new Error("Cannot append " + target + " to " + element);
  },
  isElement(obj) {
    return typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView(container, item) {
    let borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document["selection"] && document["selection"].empty) {
      try {
        document["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection() {
    if (window.getSelection)
      return window.getSelection().toString();
    else if (document.getSelection)
      return document.getSelection().toString();
    else if (document["selection"])
      return document["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth;
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "p-scrollbar-measure";
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  getBrowser() {
    if (!this.browser) {
      let matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && element.parentNode);
  },
  isClient() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  },
  focus(el, options) {
    el && document.activeElement !== el && el.focus(options);
  },
  isFocusableElement(element, selector = "") {
    return this.isElement(element) ? element.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`) : false;
  },
  getFocusableElements(element, selector = "") {
    let focusableElements = this.find(element, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`);
    let visibleFocusableElements = [];
    for (let focusableElement of focusableElements) {
      if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
        visibleFocusableElements.push(focusableElement);
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement(element, selector) {
    const focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement(element, selector) {
    const focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement(container, element, selector) {
    const focusableElements = this.getFocusableElements(container, selector);
    const index = focusableElements.length > 0 ? focusableElements.findIndex((el) => el === element) : -1;
    const nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  isClickable(element) {
    if (element) {
      const targetNode = element.nodeName;
      const parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (let prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
  },
  isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice() {
    return ("ontouchstart" in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  exportCSV(csv, filename) {
    let blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        window.open(encodeURI(csv));
      }
    }
  }
};
var ObjectUtils = {
  equals(obj1, obj2, field) {
    if (field)
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else
      return this.deepEquals(obj1, obj2);
  },
  deepEquals(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length;i-- !== 0; )
          if (!this.deepEquals(a[i], b[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length;i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length;i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData(data, field) {
    if (data && Object.keys(data).length && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        let fields = field.split(".");
        let value = data;
        for (var i = 0, len = fields.length;i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  },
  isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  getItemValue(obj, ...params) {
    return this.isFunction(obj) ? obj(...params) : obj;
  },
  filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  },
  reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList(value, list) {
    let index = -1;
    if (list) {
      for (let i = 0;i < list.length; i++) {
        if (list[i] === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  contains(value, list) {
    if (value != null && list && list.length) {
      for (let val of list) {
        if (this.equals(value, val))
          return true;
      }
    }
    return false;
  },
  insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      let injected = false;
      for (let i = 0;i < arr.length; i++) {
        let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp(vnode, prop) {
    let props = vnode.props;
    if (props) {
      let kebapProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      let propName = Object.prototype.hasOwnProperty.call(props, kebapProp) ? kebapProp : prop;
      return vnode.type.props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
    }
    return null;
  },
  convertToFlatCase(str) {
    return this.isNotEmpty(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  isEmpty(value) {
    return value === null || value === undefined || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && typeof value === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isPrintableCharacter(char = "") {
    return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
  },
  findLast(arr, callback) {
    let item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch {
        item = [...arr].reverse().find(callback);
      }
    }
    return item;
  },
  findLastIndex(arr, callback) {
    let index = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index = arr.findLastIndex(callback);
      } catch {
        index = arr.lastIndexOf([...arr].reverse().find(callback));
      }
    }
    return index;
  }
};
var ZIndexUtils = handler();

// node_modules/primevue/api/api.esm.js
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};

// node_modules/primevue/config/config.esm.js
var switchTheme = function(currentTheme, newTheme, linkElementId, callback) {
  const linkElement = document.getElementById(linkElementId);
  const cloneLinkElement = linkElement.cloneNode(true);
  const newThemeUrl = linkElement.getAttribute("href").replace(currentTheme, newTheme);
  cloneLinkElement.setAttribute("id", linkElementId + "-clone");
  cloneLinkElement.setAttribute("href", newThemeUrl);
  cloneLinkElement.addEventListener("load", () => {
    linkElement.remove();
    cloneLinkElement.setAttribute("id", linkElementId);
    if (callback) {
      callback();
    }
  });
  linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};
var defaultOptions = {
  ripple: false,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100
  },
  pt: undefined
};
var PrimeVueSymbol = Symbol();
var PrimeVue = {
  install: (app, options) => {
    let configOptions = options ? { ...defaultOptions, ...options } : { ...defaultOptions };
    const PrimeVue2 = {
      config: reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};

// node_modules/primevue/basecomponent/basecomponent.esm.js
var script = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    getOption(obj = {}, key = "") {
      const fKey = ObjectUtils.convertToFlatCase(key);
      return obj[Object.keys(obj).find((k) => ObjectUtils.convertToFlatCase(k) === fKey) || ""];
    },
    getPTValue(obj = {}, key = "", params = {}) {
      const self2 = ObjectUtils.getItemValue(this.getOption(obj, key), params);
      const globalPT = ObjectUtils.getItemValue(this.getOption(this.defaultPT, key), params);
      const merged = mergeProps(self2, globalPT);
      return merged;
    },
    ptm(key = "", params = {}) {
      return this.getPTValue(this.pt, key, { props: this.$props, state: this.$data, ...params });
    },
    ptmo(obj = {}, key = "", params = {}) {
      return this.getPTValue(obj, key, params);
    }
  },
  computed: {
    defaultPT() {
      return ObjectUtils.getItemValue(this.getOption(this.$primevue.config.pt, this.$.type.name), this.defaultsParams);
    },
    defaultsParams() {
      return { instance: this.$ };
    }
  }
};

// node_modules/primevue/baseicon/baseicon.esm.js
var styleInject = function(css, ref2) {
  if (ref2 === undefined)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};
var script2 = {
  name: "BaseIcon",
  props: {
    label: {
      type: String,
      default: undefined
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pti() {
      const isLabelEmpty = ObjectUtils.isEmpty(this.label);
      return {
        class: [
          "p-icon",
          {
            "p-icon-spin": this.spin
          }
        ],
        role: !isLabelEmpty ? "img" : undefined,
        "aria-label": !isLabelEmpty ? this.label : undefined,
        "aria-hidden": isLabelEmpty
      };
    }
  }
};
var css_248z = "\n.p-icon {\n    display: inline-block;\n}\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n@-webkit-keyframes p-icon-spin {\n0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n}\n}\n@keyframes p-icon-spin {\n0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n}\n}\n";
styleInject(css_248z);

// node_modules/primevue/icons/spinner/index.esm.js
var render = function(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_3, 16);
};
var script3 = {
  name: "SpinnerIcon",
  extends: script2
};
var _hoisted_1 = createBaseVNode("g", { "clip-path": "url(#clip0_417_21408)" }, [
  createBaseVNode("path", {
    d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
    fill: "currentColor"
  })
], -1);
var _hoisted_2 = createBaseVNode("defs", null, [
  createBaseVNode("clipPath", { id: "clip0_417_21408" }, [
    createBaseVNode("rect", {
      width: "14",
      height: "14",
      fill: "white"
    })
  ])
], -1);
var _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
];
script3.render = render;

// node_modules/primevue/ripple/ripple.esm.js
var bindEvents = function(el) {
  el.addEventListener("mousedown", onMouseDown);
};
var unbindEvents = function(el) {
  el.removeEventListener("mousedown", onMouseDown);
};
var create = function(el) {
  let ink = document.createElement("span");
  ink.className = "p-ink";
  ink.setAttribute("role", "presentation");
  ink.setAttribute("aria-hidden", "true");
  el.appendChild(ink);
  ink.addEventListener("animationend", onAnimationEnd);
};
var remove2 = function(el) {
  let ink = getInk(el);
  if (ink) {
    unbindEvents(el);
    ink.removeEventListener("animationend", onAnimationEnd);
    ink.remove();
  }
};
var onMouseDown = function(event) {
  let target = event.currentTarget;
  let ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === "none") {
    return;
  }
  DomHandler.removeClass(ink, "p-ink-active");
  if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
    let d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
    ink.style.height = d + "px";
    ink.style.width = d + "px";
  }
  let offset = DomHandler.getOffset(target);
  let x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
  let y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
  ink.style.top = y + "px";
  ink.style.left = x + "px";
  DomHandler.addClass(ink, "p-ink-active");
  timeout = setTimeout(() => {
    if (ink) {
      DomHandler.removeClass(ink, "p-ink-active");
    }
  }, 401);
};
var onAnimationEnd = function(event) {
  if (timeout) {
    clearTimeout(timeout);
  }
  DomHandler.removeClass(event.currentTarget, "p-ink-active");
};
var getInk = function(el) {
  for (let i = 0;i < el.children.length; i++) {
    if (typeof el.children[i].className === "string" && el.children[i].className.indexOf("p-ink") !== -1) {
      return el.children[i];
    }
  }
  return null;
};
var timeout;
var Ripple = {
  mounted(el, binding) {
    if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
      create(el);
      bindEvents(el);
    }
  },
  unmounted(el) {
    remove2(el);
  }
};

// node_modules/primevue/button/button.esm.js
var render2 = function(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  const _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    class: $options.buttonClass,
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, _ctx.ptm("root")), [
    renderSlot(_ctx.$slots, "default", {}, () => [
      $props.loading ? renderSlot(_ctx.$slots, "loadingicon", {
        key: 0,
        class: normalizeClass($options.loadingIconStyleClass)
      }, () => [
        $props.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 0,
          class: [$options.loadingIconStyleClass, $props.loadingIcon]
        }, _ctx.ptm("loadingIcon")), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
          key: 1,
          class: $options.loadingIconStyleClass,
          spin: ""
        }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))
      ]) : renderSlot(_ctx.$slots, "icon", {
        key: 1,
        class: normalizeClass($options.iconStyleClass)
      }, () => [
        $props.icon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 0,
          class: [$options.iconStyleClass, $props.icon]
        }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true)
      ]),
      createBaseVNode("span", mergeProps({ class: "p-button-label" }, _ctx.ptm("label")), toDisplayString($props.label || "\xA0"), 17),
      $props.badge ? (openBlock(), createElementBlock("span", mergeProps({
        key: 2,
        class: $options.badgeStyleClass
      }, _ctx.ptm("badge")), toDisplayString($props.badge), 17)) : createCommentVNode("", true)
    ])
  ], 16, _hoisted_12)), [
    [_directive_ripple]
  ]);
};
var script4 = {
  name: "Button",
  extends: script,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPos: {
      type: String,
      default: "left"
    },
    iconClass: {
      type: String,
      default: null
    },
    badge: {
      type: String,
      default: null
    },
    badgeClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: undefined
    },
    link: {
      type: Boolean,
      default: false
    },
    severity: {
      type: String,
      default: null
    },
    raised: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass() {
      return [
        "p-button p-component",
        {
          "p-button-icon-only": this.hasIcon && !this.label,
          "p-button-vertical": (this.iconPos === "top" || this.iconPos === "bottom") && this.label,
          "p-disabled": this.$attrs.disabled || this.loading,
          "p-button-loading": this.loading,
          "p-button-loading-label-only": this.loading && !this.hasIcon && this.label,
          "p-button-link": this.link,
          [`p-button-${this.severity}`]: this.severity,
          "p-button-raised": this.raised,
          "p-button-rounded": this.rounded,
          "p-button-text": this.text,
          "p-button-outlined": this.outlined,
          "p-button-sm": this.size === "small",
          "p-button-lg": this.size === "large",
          "p-button-plain": this.plain
        }
      ];
    },
    iconStyleClass() {
      return [
        "p-button-icon",
        this.iconClass,
        {
          "p-button-icon-left": this.iconPos === "left" && this.label,
          "p-button-icon-right": this.iconPos === "right" && this.label,
          "p-button-icon-top": this.iconPos === "top" && this.label,
          "p-button-icon-bottom": this.iconPos === "bottom" && this.label
        }
      ];
    },
    loadingIconStyleClass() {
      return ["p-button-loading-icon pi-spin", this.iconStyleClass];
    },
    badgeStyleClass() {
      return [
        "p-badge p-component",
        this.badgeClass,
        {
          "p-badge-no-gutter": this.badge && String(this.badge).length === 1
        }
      ];
    },
    disabled() {
      return this.$attrs.disabled || this.loading;
    },
    defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs["aria-label"];
    },
    hasIcon() {
      return this.icon || this.$slots.icon;
    }
  },
  components: {
    SpinnerIcon: script3
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_12 = ["aria-label", "disabled"];
script4.render = render2;

// node_modules/primevue/resources/primevue.min.css
var head = document.head;
var style = document.createElement("style");
head.appendChild(style);
style.type = "text/css";
style.appendChild(document.createTextNode(`.p-component,.p-component *{box-sizing:border-box}.p-hidden{display:none}.p-hidden-space{visibility:hidden}.p-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.p-hidden-accessible input,.p-hidden-accessible select{transform:scale(0)}.p-reset{margin:0;padding:0;border:0;outline:0;text-decoration:none;font-size:100%;list-style:none}.p-disabled,.p-disabled *{cursor:default !important;pointer-events:none;user-select:none}.p-component-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.p-overflow-hidden{overflow:hidden}.p-unselectable-text{user-select:none}.p-scrollbar-measure{width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px}@-webkit-keyframes p-fadein{0%{opacity:0}100%{opacity:1}}@keyframes p-fadein{0%{opacity:0}100%{opacity:1}}input[type="button"],input[type="submit"],input[type="reset"],input[type="file"]::-webkit-file-upload-button,button{border-radius:0}.p-link{text-align:left;background-color:transparent;margin:0;padding:0;border:0;cursor:pointer;user-select:none}.p-link:disabled{cursor:default}.p-connected-overlay{opacity:0;transform:scaleY(0.8);transition:transform .12s cubic-bezier(0,0,0.2,1),opacity .12s cubic-bezier(0,0,0.2,1)}.p-connected-overlay-visible{opacity:1;transform:scaleY(1)}.p-connected-overlay-hidden{opacity:0;transform:scaleY(1);transition:opacity .1s linear}.p-connected-overlay-enter-from{opacity:0;transform:scaleY(0.8)}.p-connected-overlay-leave-to{opacity:0}.p-connected-overlay-enter-active{transition:transform .12s cubic-bezier(0,0,0.2,1),opacity .12s cubic-bezier(0,0,0.2,1)}.p-connected-overlay-leave-active{transition:opacity .1s linear}.p-toggleable-content-enter-from,.p-toggleable-content-leave-to{max-height:0}.p-toggleable-content-enter-to,.p-toggleable-content-leave-from{max-height:1000px}.p-toggleable-content-leave-active{overflow:hidden;transition:max-height .45s cubic-bezier(0,1,0,1)}.p-toggleable-content-enter-active{overflow:hidden;transition:max-height 1s ease-in-out}.p-sr-only{border:0;clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;word-wrap:normal !important}.p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}.p-button{margin:0;display:inline-flex;cursor:pointer;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default}.p-button-icon-only{justify-content:center}.p-button-icon-only .p-button-label{visibility:hidden;width:0;flex:0 0 auto}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0 none}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}.p-checkbox{display:inline-flex;cursor:pointer;user-select:none;vertical-align:bottom;position:relative}.p-checkbox.p-checkbox-disabled{cursor:default}.p-checkbox-box{display:flex;justify-content:center;align-items:center}.p-colorpicker-panel .p-colorpicker-color{background:transparent url("./images/color.png") no-repeat left top}.p-colorpicker-panel .p-colorpicker-hue{background:transparent url("./images/hue.png") no-repeat left top}.p-inputtext{margin:0}.p-fluid .p-inputtext{width:100%}.p-inputgroup{display:flex;align-items:stretch;width:100%}.p-inputgroup-addon{display:flex;align-items:center;justify-content:center}.p-inputgroup .p-float-label{display:flex;align-items:stretch;width:100%}.p-inputgroup .p-inputtext,.p-fluid .p-inputgroup .p-inputtext,.p-inputgroup .p-inputwrapper,.p-fluid .p-inputgroup .p-input{flex:1 1 auto;width:1%}.p-float-label{display:block;position:relative}.p-float-label label{position:absolute;pointer-events:none;top:50%;margin-top:-.5rem;transition-property:all;transition-timing-function:ease;line-height:1}.p-float-label textarea ~ label{top:1rem}.p-float-label input:focus ~ label,.p-float-label input.p-filled ~ label,.p-float-label textarea:focus ~ label,.p-float-label textarea.p-filled ~ label,.p-float-label .p-inputwrapper-focus ~ label,.p-float-label .p-inputwrapper-filled ~ label{top:-.75rem;font-size:12px}.p-float-label .input:-webkit-autofill ~ label{top:-20px;font-size:12px}.p-float-label .p-placeholder,.p-float-label input::placeholder,.p-float-label .p-inputtext::placeholder{opacity:0;transition-property:all;transition-timing-function:ease}.p-float-label .p-focus .p-placeholder,.p-float-label input:focus::placeholder,.p-float-label .p-inputtext:focus::placeholder{opacity:1;transition-property:all;transition-timing-function:ease}.p-input-icon-left,.p-input-icon-right{position:relative;display:inline-block}.p-input-icon-left>i,.p-input-icon-left>svg,.p-input-icon-right>i,.p-input-icon-right>svg{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-input-icon-left,.p-fluid .p-input-icon-right{display:block;width:100%}.p-radiobutton{position:relative;display:inline-flex;cursor:pointer;user-select:none;vertical-align:bottom}.p-radiobutton.p-radiobutton-disabled{cursor:default}.p-radiobutton-box{display:flex;justify-content:center;align-items:center}.p-radiobutton-icon{-webkit-backface-visibility:hidden;backface-visibility:hidden;transform:translateZ(0) scale(.1);border-radius:50%;visibility:hidden}.p-radiobutton-box.p-highlight .p-radiobutton-icon{transform:translateZ(0) scale(1.0,1.0);visibility:visible}.p-ripple{overflow:hidden;position:relative}.p-ink{display:block;position:absolute;background:rgba(255,255,255,0.5);border-radius:100%;transform:scale(0);pointer-events:none}.p-ink-active{animation:ripple .4s linear}.p-ripple-disabled .p-ink{display:none !important}@keyframes ripple{100%{opacity:0;transform:scale(2.5)}}.p-tooltip{position:absolute;display:none;padding:.25em .5rem;max-width:12.5rem}.p-tooltip.p-tooltip-right,.p-tooltip.p-tooltip-left{padding:0 .25rem}.p-tooltip.p-tooltip-top,.p-tooltip.p-tooltip-bottom{padding:.25em 0}.p-tooltip .p-tooltip-text{white-space:pre-line;word-break:break-word}.p-tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.p-tooltip-right .p-tooltip-arrow{top:50%;left:0;margin-top:-.25rem;border-width:.25em .25em .25em 0}.p-tooltip-left .p-tooltip-arrow{top:50%;right:0;margin-top:-.25rem;border-width:.25em 0 .25em .25rem}.p-tooltip.p-tooltip-top{padding:.25em 0}.p-tooltip-top .p-tooltip-arrow{bottom:0;left:50%;margin-left:-.25rem;border-width:.25em .25em 0}.p-tooltip-bottom .p-tooltip-arrow{top:0;left:50%;margin-left:-.25rem;border-width:0 .25em .25rem}`));

// node_modules/primevue/resources/themes/arya-green/theme.css
var head2 = document.head;
var style2 = document.createElement("style");
head2.appendChild(style2);
style2.type = "text/css";
style2.appendChild(document.createTextNode(`:root {
  --surface-a:#1e1e1e;
  --surface-b:#121212;
  --surface-c:rgba(255, 255, 255, 0.03);
  --surface-d:#383838;
  --surface-e:#1e1e1e;
  --surface-f:#1e1e1e;
  --text-color:rgba(255, 255, 255, 0.87);
  --text-color-secondary:rgba(255, 255, 255, 0.6);
  --primary-color:#81C784;
  --primary-color-text:#212529;
  --font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  --surface-0: #121212;
  --surface-50: #2a2a2a;
  --surface-100: #414141;
  --surface-200: #595959;
  --surface-300: #717171;
  --surface-400: #898989;
  --surface-500: #a0a0a0;
  --surface-600: #b8b8b8;
  --surface-700: #d0d0d0;
  --surface-800: #e7e7e7;
  --surface-900: #ffffff;
  --gray-50:#e7e7e7;
  --gray-100: #d0d0d0;
  --gray-200: #b8b8b8;
  --gray-300: #a0a0a0;
  --gray-400: #898989;
  --gray-500: #717171;
  --gray-600: #595959;
  --gray-700: #414141;
  --gray-800: #2a2a2a;
  --gray-900: #121212;
  --content-padding:1rem;
  --inline-spacing:0.5rem;
  --border-radius:3px;
  --surface-ground:#121212;
  --surface-section:#121212;
  --surface-card:#1e1e1e;
  --surface-overlay:#1e1e1e;
  --surface-border:#383838;
  --surface-hover:rgba(255,255,255,.03);
  --focus-ring: 0 0 0 1px #a7d8a9;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: rgba(129, 199, 132, 0.16);
  --highlight-text-color: rgba(255, 255, 255, 0.87);
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

.p-component {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  font-weight: normal;
}

.p-component-overlay {
  background-color: rgba(0, 0, 0, 0.4);
  transition-duration: 0.2s;
}

.p-disabled, .p-component:disabled {
  opacity: 0.4;
}

.p-error {
  color: #ef9a9a;
}

.p-text-secondary {
  color: rgba(255, 255, 255, 0.6);
}

.pi {
  font-size: 1rem;
}

.p-icon {
  width: 1rem;
  height: 1rem;
}

.p-link {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  border-radius: 3px;
}
.p-link:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-component-overlay-enter {
  animation: p-component-overlay-enter-animation 150ms forwards;
}

.p-component-overlay-leave {
  animation: p-component-overlay-leave-animation 150ms forwards;
}

@keyframes p-component-overlay-enter-animation {
  from {
    background-color: transparent;
  }
  to {
    background-color: var(--maskbg);
  }
}
@keyframes p-component-overlay-leave-animation {
  from {
    background-color: var(--maskbg);
  }
  to {
    background-color: transparent;
  }
}

:root {
  --blue-50:#f4fafe;
  --blue-100:#cae6fc;
  --blue-200:#a0d2fa;
  --blue-300:#75bef8;
  --blue-400:#4baaf5;
  --blue-500:#2196f3;
  --blue-600:#1c80cf;
  --blue-700:#1769aa;
  --blue-800:#125386;
  --blue-900:#0d3c61;
  --green-50:#f6fbf6;
  --green-100:#d4ecd5;
  --green-200:#b2ddb4;
  --green-300:#90cd93;
  --green-400:#6ebe71;
  --green-500:#4caf50;
  --green-600:#419544;
  --green-700:#357b38;
  --green-800:#2a602c;
  --green-900:#1e4620;
  --yellow-50:#fffcf5;
  --yellow-100:#fef0cd;
  --yellow-200:#fde4a5;
  --yellow-300:#fdd87d;
  --yellow-400:#fccc55;
  --yellow-500:#fbc02d;
  --yellow-600:#d5a326;
  --yellow-700:#b08620;
  --yellow-800:#8a6a19;
  --yellow-900:#644d12;
  --cyan-50:#f2fcfd;
  --cyan-100:#c2eff5;
  --cyan-200:#91e2ed;
  --cyan-300:#61d5e4;
  --cyan-400:#30c9dc;
  --cyan-500:#00bcd4;
  --cyan-600:#00a0b4;
  --cyan-700:#008494;
  --cyan-800:#006775;
  --cyan-900:#004b55;
  --pink-50:#fef4f7;
  --pink-100:#fac9da;
  --pink-200:#f69ebc;
  --pink-300:#f1749e;
  --pink-400:#ed4981;
  --pink-500:#e91e63;
  --pink-600:#c61a54;
  --pink-700:#a31545;
  --pink-800:#801136;
  --pink-900:#5d0c28;
  --indigo-50:#f5f6fb;
  --indigo-100:#d1d5ed;
  --indigo-200:#acb4df;
  --indigo-300:#8893d1;
  --indigo-400:#6372c3;
  --indigo-500:#3f51b5;
  --indigo-600:#36459a;
  --indigo-700:#2c397f;
  --indigo-800:#232d64;
  --indigo-900:#192048;
  --teal-50:#f2faf9;
  --teal-100:#c2e6e2;
  --teal-200:#91d2cc;
  --teal-300:#61beb5;
  --teal-400:#30aa9f;
  --teal-500:#009688;
  --teal-600:#008074;
  --teal-700:#00695f;
  --teal-800:#00534b;
  --teal-900:#003c36;
  --orange-50:#fff8f2;
  --orange-100:#fde0c2;
  --orange-200:#fbc791;
  --orange-300:#f9ae61;
  --orange-400:#f79530;
  --orange-500:#f57c00;
  --orange-600:#d06900;
  --orange-700:#ac5700;
  --orange-800:#874400;
  --orange-900:#623200;
  --bluegray-50:#f7f9f9;
  --bluegray-100:#d9e0e3;
  --bluegray-200:#bbc7cd;
  --bluegray-300:#9caeb7;
  --bluegray-400:#7e96a1;
  --bluegray-500:#607d8b;
  --bluegray-600:#526a76;
  --bluegray-700:#435861;
  --bluegray-800:#35454c;
  --bluegray-900:#263238;
  --purple-50:#faf4fb;
  --purple-100:#e7cbec;
  --purple-200:#d4a2dd;
  --purple-300:#c279ce;
  --purple-400:#af50bf;
  --purple-500:#9c27b0;
  --purple-600:#852196;
  --purple-700:#6d1b7b;
  --purple-800:#561561;
  --purple-900:#3e1046;
  --red-50:#fff5f5;
  --red-100:#ffd1ce;
  --red-200:#ffada7;
  --red-300:#ff8980;
  --red-400:#ff6459;
  --red-500:#ff4032;
  --red-600:#d9362b;
  --red-700:#b32d23;
  --red-800:#8c231c;
  --red-900:#661a14;
  --primary-50:#f9fcf9;
  --primary-100:#e1f2e1;
  --primary-200:#c9e7ca;
  --primary-300:#b1dcb3;
  --primary-400:#99d29b;
  --primary-500:#81c784;
  --primary-600:#6ea970;
  --primary-700:#5a8b5c;
  --primary-800:#476d49;
  --primary-900:#345035;
}

.p-autocomplete .p-autocomplete-loader {
  right: 0.5rem;
}
.p-autocomplete.p-autocomplete-dd .p-autocomplete-loader {
  right: 2.857rem;
}
.p-autocomplete:not(.p-disabled):hover .p-autocomplete-multiple-container {
  border-color: #81C784;
}
.p-autocomplete:not(.p-disabled).p-focus .p-autocomplete-multiple-container {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-autocomplete .p-autocomplete-multiple-container {
  padding: 0.25rem 0.5rem;
  gap: 0.5rem;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-input-token {
  padding: 0.25rem 0;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-input-token input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.87);
  padding: 0;
  margin: 0;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token {
  padding: 0.25rem 0.5rem;
  background: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 16px;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token .p-autocomplete-token-icon {
  margin-left: 0.5rem;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token.p-focus {
  background: #464646;
  color: rgba(255, 255, 255, 0.87);
}
.p-autocomplete.p-invalid.p-component > .p-inputtext {
  border-color: #ef9a9a;
}

.p-autocomplete-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-autocomplete-panel .p-autocomplete-items {
  padding: 0.5rem 0;
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item-group {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
}

.p-calendar.p-invalid.p-component > .p-inputtext {
  border-color: #ef9a9a;
}

.p-datepicker {
  padding: 0.5rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
}
.p-datepicker:not(.p-datepicker-inline) {
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-datepicker:not(.p-datepicker-inline) .p-datepicker-header {
  background: #1e1e1e;
}
.p-datepicker .p-datepicker-header {
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
  margin: 0;
  border-bottom: 1px solid #383838;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-datepicker .p-datepicker-header .p-datepicker-prev,
.p-datepicker .p-datepicker-header .p-datepicker-next {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-datepicker .p-datepicker-header .p-datepicker-prev:enabled:hover,
.p-datepicker .p-datepicker-header .p-datepicker-next:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-datepicker .p-datepicker-header .p-datepicker-prev:focus,
.p-datepicker .p-datepicker-header .p-datepicker-next:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datepicker .p-datepicker-header .p-datepicker-title {
  line-height: 2rem;
}
.p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-year,
.p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-month {
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  font-weight: 600;
  padding: 0.5rem;
}
.p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-year:enabled:hover,
.p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-month:enabled:hover {
  color: #81C784;
}
.p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-month {
  margin-right: 0.5rem;
}
.p-datepicker table {
  font-size: 1rem;
  margin: 0.5rem 0;
}
.p-datepicker table th {
  padding: 0.5rem;
}
.p-datepicker table th > span {
  width: 2.5rem;
  height: 2.5rem;
}
.p-datepicker table td {
  padding: 0.5rem;
}
.p-datepicker table td > span {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  transition: box-shadow 0.2s;
  border: 1px solid transparent;
}
.p-datepicker table td > span.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-datepicker table td > span:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datepicker table td.p-datepicker-today > span {
  background: transparent;
  color: #81C784;
  border-color: transparent;
}
.p-datepicker table td.p-datepicker-today > span.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-datepicker .p-datepicker-buttonbar {
  padding: 1rem 0;
  border-top: 1px solid #383838;
}
.p-datepicker .p-datepicker-buttonbar .p-button {
  width: auto;
}
.p-datepicker .p-timepicker {
  border-top: 1px solid #383838;
  padding: 0.5rem;
}
.p-datepicker .p-timepicker button {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-datepicker .p-timepicker button:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-datepicker .p-timepicker button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datepicker .p-timepicker button:last-child {
  margin-top: 0.2em;
}
.p-datepicker .p-timepicker span {
  font-size: 1.25rem;
}
.p-datepicker .p-timepicker > div {
  padding: 0 0.5rem;
}
.p-datepicker.p-datepicker-timeonly .p-timepicker {
  border-top: 0 none;
}
.p-datepicker .p-monthpicker {
  margin: 0.5rem 0;
}
.p-datepicker .p-monthpicker .p-monthpicker-month {
  padding: 0.5rem;
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-datepicker .p-monthpicker .p-monthpicker-month.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-datepicker .p-yearpicker {
  margin: 0.5rem 0;
}
.p-datepicker .p-yearpicker .p-yearpicker-year {
  padding: 0.5rem;
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-datepicker .p-yearpicker .p-yearpicker-year.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-datepicker.p-datepicker-multiple-month .p-datepicker-group {
  border-left: 1px solid #383838;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-top: 0;
  padding-bottom: 0;
}
.p-datepicker.p-datepicker-multiple-month .p-datepicker-group:first-child {
  padding-left: 0;
  border-left: 0 none;
}
.p-datepicker.p-datepicker-multiple-month .p-datepicker-group:last-child {
  padding-right: 0;
}
.p-datepicker:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled):hover {
  background: rgba(255, 255, 255, 0.03);
}
.p-datepicker:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datepicker:not(.p-disabled) .p-monthpicker .p-monthpicker-month:not(.p-disabled):not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
}
.p-datepicker:not(.p-disabled) .p-monthpicker .p-monthpicker-month:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datepicker:not(.p-disabled) .p-yearpicker .p-yearpicker-year:not(.p-disabled):not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
}
.p-datepicker:not(.p-disabled) .p-yearpicker .p-yearpicker-year:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

@media screen and (max-width: 769px) {
  .p-datepicker table th, .p-datepicker table td {
    padding: 0;
  }
}
.p-cascadeselect {
  background: #121212;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.p-cascadeselect:not(.p-disabled):hover {
  border-color: #81C784;
}
.p-cascadeselect:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-cascadeselect .p-cascadeselect-label {
  background: transparent;
  border: 0 none;
  padding: 0.5rem 0.5rem;
}
.p-cascadeselect .p-cascadeselect-label.p-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.p-cascadeselect .p-cascadeselect-label:enabled:focus {
  outline: 0 none;
  box-shadow: none;
}
.p-cascadeselect .p-cascadeselect-trigger {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  width: 2.357rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.p-cascadeselect.p-invalid.p-component {
  border-color: #ef9a9a;
}

.p-cascadeselect-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-cascadeselect-panel .p-cascadeselect-items {
  padding: 0.5rem 0;
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item {
  margin: 0;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item .p-cascadeselect-item-content {
  padding: 0.5rem 1rem;
}
.p-cascadeselect-panel .p-cascadeselect-items .p-cascadeselect-item .p-cascadeselect-group-icon {
  font-size: 0.875rem;
}

.p-input-filled .p-cascadeselect {
  background: #383838;
}
.p-input-filled .p-cascadeselect:not(.p-disabled):hover {
  background-color: #383838;
}
.p-input-filled .p-cascadeselect:not(.p-disabled).p-focus {
  background-color: #383838;
}

.p-checkbox {
  width: 20px;
  height: 20px;
}
.p-checkbox .p-checkbox-box {
  border: 2px solid #383838;
  background: #121212;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-checkbox .p-checkbox-box .p-checkbox-icon {
  transition-duration: 0.2s;
  color: #212529;
  font-size: 14px;
}
.p-checkbox .p-checkbox-box .p-checkbox-icon.p-icon {
  width: 14px;
  height: 14px;
}
.p-checkbox .p-checkbox-box.p-highlight {
  border-color: #81C784;
  background: #81C784;
}
.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
  border-color: #81C784;
}
.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
  border-color: #54b358;
  background: #54b358;
  color: #212529;
}
.p-checkbox.p-invalid > .p-checkbox-box {
  border-color: #ef9a9a;
}

.p-input-filled .p-checkbox .p-checkbox-box {
  background-color: #383838;
}
.p-input-filled .p-checkbox .p-checkbox-box.p-highlight {
  background: #81C784;
}
.p-input-filled .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
  background-color: #383838;
}
.p-input-filled .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
  background: #54b358;
}

.p-chips:not(.p-disabled):hover .p-chips-multiple-container {
  border-color: #81C784;
}
.p-chips:not(.p-disabled).p-focus .p-chips-multiple-container {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-chips .p-chips-multiple-container {
  padding: 0.25rem 0.5rem;
}
.p-chips .p-chips-multiple-container .p-chips-token {
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  background: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 16px;
}
.p-chips .p-chips-multiple-container .p-chips-token.p-focus {
  background: #464646;
  color: rgba(255, 255, 255, 0.87);
}
.p-chips .p-chips-multiple-container .p-chips-token .p-chips-token-icon {
  margin-left: 0.5rem;
}
.p-chips .p-chips-multiple-container .p-chips-input-token {
  padding: 0.25rem 0;
}
.p-chips .p-chips-multiple-container .p-chips-input-token input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.87);
  padding: 0;
  margin: 0;
}
.p-chips.p-invalid.p-component > .p-inputtext {
  border-color: #ef9a9a;
}

.p-colorpicker-preview {
  width: 2rem;
  height: 2rem;
}

.p-colorpicker-panel {
  background: #1e1e1e;
  border: 1px solid #383838;
}
.p-colorpicker-panel .p-colorpicker-color-handle,
.p-colorpicker-panel .p-colorpicker-hue-handle {
  border-color: rgba(255, 255, 255, 0.87);
}

.p-colorpicker-overlay-panel {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.p-dropdown {
  background: #121212;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.p-dropdown:not(.p-disabled):hover {
  border-color: #81C784;
}
.p-dropdown:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-dropdown.p-dropdown-clearable .p-dropdown-label {
  padding-right: 1.5rem;
}
.p-dropdown .p-dropdown-label {
  background: transparent;
  border: 0 none;
}
.p-dropdown .p-dropdown-label.p-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.p-dropdown .p-dropdown-label:focus, .p-dropdown .p-dropdown-label:enabled:focus {
  outline: 0 none;
  box-shadow: none;
}
.p-dropdown .p-dropdown-trigger {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  width: 2.357rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.p-dropdown .p-dropdown-clear-icon {
  color: rgba(255, 255, 255, 0.6);
  right: 2.357rem;
}
.p-dropdown.p-invalid.p-component {
  border-color: #ef9a9a;
}

.p-dropdown-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-dropdown-panel .p-dropdown-header {
  padding: 0.5rem 1rem;
  border-bottom: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  margin: 0;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter {
  padding-right: 1.5rem;
  margin-right: -1.5rem;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon {
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-dropdown-panel .p-dropdown-items {
  padding: 0.5rem 0;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item-group {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-empty-message {
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
}

.p-input-filled .p-dropdown {
  background: #383838;
}
.p-input-filled .p-dropdown:not(.p-disabled):hover {
  background-color: #383838;
}
.p-input-filled .p-dropdown:not(.p-disabled).p-focus {
  background-color: #383838;
}
.p-input-filled .p-dropdown:not(.p-disabled).p-focus .p-inputtext {
  background-color: transparent;
}

.p-editor-container .p-editor-toolbar {
  background: #1e1e1e;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-editor-container .p-editor-toolbar.ql-snow {
  border: 1px solid #383838;
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-stroke {
  stroke: rgba(255, 255, 255, 0.6);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-fill {
  fill: rgba(255, 255, 255, 0.6);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
  border: 0 none;
  color: rgba(255, 255, 255, 0.6);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
  stroke: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
  fill: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
  color: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
  stroke: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
  fill: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 0.5rem 0;
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
  color: rgba(255, 255, 255, 0.87);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-icon-picker) .ql-picker-item {
  padding: 0.5rem 1rem;
}
.p-editor-container .p-editor-content {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-editor-container .p-editor-content.ql-snow {
  border: 1px solid #383838;
}
.p-editor-container .p-editor-content .ql-editor {
  background: #121212;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-editor-container .ql-snow.ql-toolbar button:hover,
.p-editor-container .ql-snow.ql-toolbar button:focus {
  color: rgba(255, 255, 255, 0.87);
}
.p-editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
.p-editor-container .ql-snow.ql-toolbar button:focus .ql-stroke {
  stroke: rgba(255, 255, 255, 0.87);
}
.p-editor-container .ql-snow.ql-toolbar button:hover .ql-fill,
.p-editor-container .ql-snow.ql-toolbar button:focus .ql-fill {
  fill: rgba(255, 255, 255, 0.87);
}
.p-editor-container .ql-snow.ql-toolbar button.ql-active,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
  color: #81C784;
}
.p-editor-container .ql-snow.ql-toolbar button.ql-active .ql-stroke,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
  stroke: #81C784;
}
.p-editor-container .ql-snow.ql-toolbar button.ql-active .ql-fill,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
  fill: #81C784;
}
.p-editor-container .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
.p-editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
  color: #81C784;
}

.p-inputgroup-addon {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid #383838;
  border-left: 1px solid #383838;
  border-bottom: 1px solid #383838;
  padding: 0.5rem 0.5rem;
  min-width: 2.357rem;
}
.p-inputgroup-addon:last-child {
  border-right: 1px solid #383838;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-inputtext,
.p-inputgroup > .p-float-label > .p-component {
  border-radius: 0;
  margin: 0;
}
.p-inputgroup > .p-component + .p-inputgroup-addon,
.p-inputgroup > .p-inputwrapper > .p-inputtext + .p-inputgroup-addon,
.p-inputgroup > .p-float-label > .p-component + .p-inputgroup-addon {
  border-left: 0 none;
}
.p-inputgroup > .p-component:focus,
.p-inputgroup > .p-inputwrapper > .p-inputtext:focus,
.p-inputgroup > .p-float-label > .p-component:focus {
  z-index: 1;
}
.p-inputgroup > .p-component:focus ~ label,
.p-inputgroup > .p-inputwrapper > .p-inputtext:focus ~ label,
.p-inputgroup > .p-float-label > .p-component:focus ~ label {
  z-index: 1;
}

.p-inputgroup-addon:first-child,
.p-inputgroup button:first-child,
.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-inputtext {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.p-inputgroup .p-float-label:first-child input {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.p-inputgroup-addon:last-child,
.p-inputgroup button:last-child,
.p-inputgroup input:last-child,
.p-inputgroup > .p-inputwrapper:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.p-inputgroup .p-float-label:last-child input {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.p-fluid .p-inputgroup .p-button {
  width: auto;
}
.p-fluid .p-inputgroup .p-button.p-button-icon-only {
  width: 2.357rem;
}

.p-inputnumber.p-invalid.p-component > .p-inputtext {
  border-color: #ef9a9a;
}

.p-inputswitch {
  width: 3rem;
  height: 1.75rem;
}
.p-inputswitch .p-inputswitch-slider {
  background: #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 30px;
}
.p-inputswitch .p-inputswitch-slider:before {
  background: rgba(255, 255, 255, 0.6);
  width: 1.25rem;
  height: 1.25rem;
  left: 0.25rem;
  margin-top: -0.625rem;
  border-radius: 50%;
  transition-duration: 0.2s;
}
.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
  transform: translateX(1.25rem);
}
.p-inputswitch.p-focus .p-inputswitch-slider {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-inputswitch:not(.p-disabled):hover .p-inputswitch-slider {
  background: rgba(255, 255, 255, 0.03);
}
.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background: #81C784;
}
.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
  background: rgba(255, 255, 255, 0.87);
}
.p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider {
  background: #6abd6e;
}
.p-inputswitch.p-invalid .p-inputswitch-slider {
  border-color: #ef9a9a;
}

.p-inputtext {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #121212;
  padding: 0.5rem 0.5rem;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  border-radius: 3px;
}
.p-inputtext:enabled:hover {
  border-color: #81C784;
}
.p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-inputtext.p-invalid.p-component {
  border-color: #ef9a9a;
}
.p-inputtext.p-inputtext-sm {
  font-size: 0.875rem;
  padding: 0.4375rem 0.4375rem;
}
.p-inputtext.p-inputtext-lg {
  font-size: 1.25rem;
  padding: 0.625rem 0.625rem;
}

.p-float-label > label {
  left: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  transition-duration: 0.2s;
}

.p-float-label > .p-invalid + label {
  color: #ef9a9a;
}

.p-input-icon-left > svg:first-of-type,
.p-input-icon-left > i:first-of-type {
  left: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}

.p-input-icon-left > .p-inputtext {
  padding-left: 2rem;
}

.p-input-icon-left.p-float-label > label {
  left: 2rem;
}

.p-input-icon-right > svg:last-of-type,
.p-input-icon-right > i:last-of-type {
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}

.p-input-icon-right > .p-inputtext {
  padding-right: 2rem;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

:-moz-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

::-moz-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.p-input-filled .p-inputtext {
  background-color: #383838;
}
.p-input-filled .p-inputtext:enabled:hover {
  background-color: #383838;
}
.p-input-filled .p-inputtext:enabled:focus {
  background-color: #383838;
}

.p-inputtext-sm .p-inputtext {
  font-size: 0.875rem;
  padding: 0.4375rem 0.4375rem;
}

.p-inputtext-lg .p-inputtext {
  font-size: 1.25rem;
  padding: 0.625rem 0.625rem;
}

.p-listbox {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-listbox .p-listbox-header {
  padding: 0.5rem 1rem;
  border-bottom: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  margin: 0;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-listbox .p-listbox-header .p-listbox-filter {
  padding-right: 1.5rem;
}
.p-listbox .p-listbox-header .p-listbox-filter-icon {
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-listbox .p-listbox-list {
  padding: 0.5rem 0;
  outline: 0 none;
}
.p-listbox .p-listbox-list .p-listbox-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-listbox .p-listbox-list .p-listbox-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-listbox .p-listbox-list .p-listbox-item-group {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
}
.p-listbox .p-listbox-list .p-listbox-empty-message {
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
}
.p-listbox:not(.p-disabled) .p-listbox-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-listbox:not(.p-disabled) .p-listbox-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-listbox:not(.p-disabled) .p-listbox-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-listbox.p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-listbox.p-invalid {
  border-color: #ef9a9a;
}

.p-multiselect {
  background: #121212;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.p-multiselect:not(.p-disabled):hover {
  border-color: #81C784;
}
.p-multiselect:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-multiselect .p-multiselect-label {
  padding: 0.5rem 0.5rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-multiselect .p-multiselect-label.p-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.p-multiselect.p-multiselect-chip .p-multiselect-token {
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  background: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 16px;
}
.p-multiselect.p-multiselect-chip .p-multiselect-token .p-multiselect-token-icon {
  margin-left: 0.5rem;
}
.p-multiselect .p-multiselect-trigger {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  width: 2.357rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.p-multiselect.p-invalid.p-component {
  border-color: #ef9a9a;
}

.p-inputwrapper-filled.p-multiselect.p-multiselect-chip .p-multiselect-label {
  padding: 0.25rem 0.5rem;
}

.p-multiselect-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-multiselect-panel .p-multiselect-header {
  padding: 0.5rem 1rem;
  border-bottom: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  margin: 0;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container .p-inputtext {
  padding-right: 1.5rem;
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container .p-multiselect-filter-icon {
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-multiselect-panel .p-multiselect-header .p-checkbox {
  margin-right: 0.5rem;
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-close {
  margin-left: 0.5rem;
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-close:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-close:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-multiselect-panel .p-multiselect-items {
  padding: 0.5rem 0;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item .p-checkbox {
  margin-right: 0.5rem;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item-group {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-empty-message {
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
}

.p-input-filled .p-multiselect {
  background: #383838;
}
.p-input-filled .p-multiselect:not(.p-disabled):hover {
  background-color: #383838;
}
.p-input-filled .p-multiselect:not(.p-disabled).p-focus {
  background-color: #383838;
}

.p-password.p-invalid.p-component > .p-inputtext {
  border-color: #ef9a9a;
}

.p-password-panel {
  padding: 1rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.p-password-panel .p-password-meter {
  margin-bottom: 0.5rem;
  background: #383838;
}
.p-password-panel .p-password-meter .p-password-strength.weak {
  background: #F48FB1;
}
.p-password-panel .p-password-meter .p-password-strength.medium {
  background: #FFE082;
}
.p-password-panel .p-password-meter .p-password-strength.strong {
  background: #C5E1A5;
}

.p-radiobutton {
  width: 20px;
  height: 20px;
}
.p-radiobutton .p-radiobutton-box {
  border: 2px solid #383838;
  background: #121212;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-radiobutton .p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover {
  border-color: #81C784;
}
.p-radiobutton .p-radiobutton-box:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
  width: 12px;
  height: 12px;
  transition-duration: 0.2s;
  background-color: #212529;
}
.p-radiobutton .p-radiobutton-box.p-highlight {
  border-color: #81C784;
  background: #81C784;
}
.p-radiobutton .p-radiobutton-box.p-highlight:not(.p-disabled):hover {
  border-color: #54b358;
  background: #54b358;
  color: #212529;
}
.p-radiobutton.p-invalid > .p-radiobutton-box {
  border-color: #ef9a9a;
}
.p-radiobutton:focus {
  outline: 0 none;
}

.p-input-filled .p-radiobutton .p-radiobutton-box {
  background-color: #383838;
}
.p-input-filled .p-radiobutton .p-radiobutton-box:not(.p-disabled):hover {
  background-color: #383838;
}
.p-input-filled .p-radiobutton .p-radiobutton-box.p-highlight {
  background: #81C784;
}
.p-input-filled .p-radiobutton .p-radiobutton-box.p-highlight:not(.p-disabled):hover {
  background: #54b358;
}

.p-rating {
  gap: 0.5rem;
}
.p-rating .p-rating-item .p-rating-icon {
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  font-size: 1.143rem;
}
.p-rating .p-rating-item .p-rating-icon.p-icon {
  width: 1.143rem;
  height: 1.143rem;
}
.p-rating .p-rating-item .p-rating-icon.p-rating-cancel {
  color: #F48FB1;
}
.p-rating .p-rating-item.p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: #81C784;
}
.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-item:hover .p-rating-icon {
  color: #81C784;
}
.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-item:hover .p-rating-icon.p-rating-cancel {
  color: #F48FB1;
}

.p-selectbutton .p-button {
  background: #1e1e1e;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-selectbutton .p-button .p-button-icon-left,
.p-selectbutton .p-button .p-button-icon-right {
  color: rgba(255, 255, 255, 0.6);
}
.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon-left,
.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon-right {
  color: rgba(255, 255, 255, 0.6);
}
.p-selectbutton .p-button.p-highlight {
  background: #81C784;
  border-color: #81C784;
  color: #212529;
}
.p-selectbutton .p-button.p-highlight .p-button-icon-left,
.p-selectbutton .p-button.p-highlight .p-button-icon-right {
  color: #212529;
}
.p-selectbutton .p-button.p-highlight:hover {
  background: #6abd6e;
  border-color: #6abd6e;
  color: #212529;
}
.p-selectbutton .p-button.p-highlight:hover .p-button-icon-left,
.p-selectbutton .p-button.p-highlight:hover .p-button-icon-right {
  color: #212529;
}
.p-selectbutton.p-invalid > .p-button {
  border-color: #ef9a9a;
}

.p-slider {
  background: #383838;
  border: 0 none;
  border-radius: 3px;
}
.p-slider.p-slider-horizontal {
  height: 0.286rem;
}
.p-slider.p-slider-horizontal .p-slider-handle {
  margin-top: -0.5715rem;
  margin-left: -0.5715rem;
}
.p-slider.p-slider-vertical {
  width: 0.286rem;
}
.p-slider.p-slider-vertical .p-slider-handle {
  margin-left: -0.5715rem;
  margin-bottom: -0.5715rem;
}
.p-slider .p-slider-handle {
  height: 1.143rem;
  width: 1.143rem;
  background: #383838;
  border: 2px solid #81C784;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-slider .p-slider-handle:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-slider .p-slider-range {
  background: #81C784;
}
.p-slider:not(.p-disabled) .p-slider-handle:hover {
  background: #81C784;
  border-color: #81C784;
}

.p-treeselect {
  background: #121212;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.p-treeselect:not(.p-disabled):hover {
  border-color: #81C784;
}
.p-treeselect:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-treeselect .p-treeselect-label {
  padding: 0.5rem 0.5rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-treeselect .p-treeselect-label.p-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.p-treeselect.p-treeselect-chip .p-treeselect-token {
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  background: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 16px;
}
.p-treeselect .p-treeselect-trigger {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  width: 2.357rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.p-treeselect.p-invalid.p-component {
  border-color: #ef9a9a;
}

.p-inputwrapper-filled.p-treeselect.p-treeselect-chip .p-treeselect-label {
  padding: 0.25rem 0.5rem;
}

.p-treeselect-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-treeselect-panel .p-treeselect-items-wrapper .p-tree {
  border: 0 none;
}
.p-treeselect-panel .p-treeselect-items-wrapper .p-treeselect-empty-message {
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
}

.p-input-filled .p-treeselect {
  background: #383838;
}
.p-input-filled .p-treeselect:not(.p-disabled):hover {
  background-color: #383838;
}
.p-input-filled .p-treeselect:not(.p-disabled).p-focus {
  background-color: #383838;
}

.p-togglebutton.p-button {
  background: #1e1e1e;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-togglebutton.p-button .p-button-icon-left,
.p-togglebutton.p-button .p-button-icon-right {
  color: rgba(255, 255, 255, 0.6);
}
.p-togglebutton.p-button:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: #81C784;
}
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon-left,
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon-right {
  color: rgba(255, 255, 255, 0.6);
}
.p-togglebutton.p-button.p-highlight {
  background: #81C784;
  border-color: #81C784;
  color: #212529;
}
.p-togglebutton.p-button.p-highlight .p-button-icon-left,
.p-togglebutton.p-button.p-highlight .p-button-icon-right {
  color: #212529;
}
.p-togglebutton.p-button.p-highlight:hover {
  background: #6abd6e;
  border-color: #6abd6e;
  color: #212529;
}
.p-togglebutton.p-button.p-highlight:hover .p-button-icon-left,
.p-togglebutton.p-button.p-highlight:hover .p-button-icon-right {
  color: #212529;
}
.p-togglebutton.p-button.p-invalid > .p-button {
  border-color: #ef9a9a;
}

.p-button {
  color: #212529;
  background: #81C784;
  border: 1px solid #81C784;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.p-button:enabled:hover {
  background: #6abd6e;
  color: #212529;
  border-color: #6abd6e;
}
.p-button:enabled:active {
  background: #54b358;
  color: #212529;
  border-color: #54b358;
}
.p-button.p-button-outlined {
  background-color: transparent;
  color: #81C784;
  border: 1px solid;
}
.p-button.p-button-outlined:enabled:hover {
  background: rgba(129, 199, 132, 0.04);
  color: #81C784;
  border: 1px solid;
}
.p-button.p-button-outlined:enabled:active {
  background: rgba(129, 199, 132, 0.16);
  color: #81C784;
  border: 1px solid;
}
.p-button.p-button-outlined.p-button-plain {
  color: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.6);
}
.p-button.p-button-outlined.p-button-plain:enabled:hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.6);
}
.p-button.p-button-outlined.p-button-plain:enabled:active {
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.6);
}
.p-button.p-button-text {
  background-color: transparent;
  color: #81C784;
  border-color: transparent;
}
.p-button.p-button-text:enabled:hover {
  background: rgba(129, 199, 132, 0.04);
  color: #81C784;
  border-color: transparent;
}
.p-button.p-button-text:enabled:active {
  background: rgba(129, 199, 132, 0.16);
  color: #81C784;
  border-color: transparent;
}
.p-button.p-button-text.p-button-plain {
  color: rgba(255, 255, 255, 0.6);
}
.p-button.p-button-text.p-button-plain:enabled:hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.6);
}
.p-button.p-button-text.p-button-plain:enabled:active {
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.6);
}
.p-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-button .p-button-label {
  transition-duration: 0.2s;
}
.p-button .p-button-icon-left {
  margin-right: 0.5rem;
}
.p-button .p-button-icon-right {
  margin-left: 0.5rem;
}
.p-button .p-button-icon-bottom {
  margin-top: 0.5rem;
}
.p-button .p-button-icon-top {
  margin-bottom: 0.5rem;
}
.p-button .p-badge {
  margin-left: 0.5rem;
  min-width: 1rem;
  height: 1rem;
  line-height: 1rem;
  color: #81C784;
  background-color: #212529;
}
.p-button.p-button-raised {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.p-button.p-button-rounded {
  border-radius: 2rem;
}
.p-button.p-button-icon-only {
  width: 2.357rem;
  padding: 0.5rem 0;
}
.p-button.p-button-icon-only .p-button-icon-left,
.p-button.p-button-icon-only .p-button-icon-right {
  margin: 0;
}
.p-button.p-button-icon-only.p-button-rounded {
  border-radius: 50%;
  height: 2.357rem;
}
.p-button.p-button-sm {
  font-size: 0.875rem;
  padding: 0.4375rem 0.875rem;
}
.p-button.p-button-sm .p-button-icon {
  font-size: 0.875rem;
}
.p-button.p-button-lg {
  font-size: 1.25rem;
  padding: 0.625rem 1.25rem;
}
.p-button.p-button-lg .p-button-icon {
  font-size: 1.25rem;
}
.p-button.p-button-loading-label-only .p-button-label {
  margin-left: 0.5rem;
}
.p-button.p-button-loading-label-only .p-button-loading-icon {
  margin-right: 0;
}

.p-fluid .p-button {
  width: 100%;
}
.p-fluid .p-button-icon-only {
  width: 2.357rem;
}
.p-fluid .p-buttonset {
  display: flex;
}
.p-fluid .p-buttonset .p-button {
  flex: 1;
}

.p-button.p-button-secondary, .p-buttonset.p-button-secondary > .p-button, .p-splitbutton.p-button-secondary > .p-button {
  color: #ffffff;
  background: #78909C;
  border: 1px solid #78909C;
}
.p-button.p-button-secondary:enabled:hover, .p-buttonset.p-button-secondary > .p-button:enabled:hover, .p-splitbutton.p-button-secondary > .p-button:enabled:hover {
  background: #69838f;
  color: #ffffff;
  border-color: #69838f;
}
.p-button.p-button-secondary:enabled:focus, .p-buttonset.p-button-secondary > .p-button:enabled:focus, .p-splitbutton.p-button-secondary > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #a1b1ba;
}
.p-button.p-button-secondary:enabled:active, .p-buttonset.p-button-secondary > .p-button:enabled:active, .p-splitbutton.p-button-secondary > .p-button:enabled:active {
  background: #5d747f;
  color: #ffffff;
  border-color: #5d747f;
}
.p-button.p-button-secondary.p-button-outlined, .p-buttonset.p-button-secondary > .p-button.p-button-outlined, .p-splitbutton.p-button-secondary > .p-button.p-button-outlined {
  background-color: transparent;
  color: #78909C;
  border: 1px solid;
}
.p-button.p-button-secondary.p-button-outlined:enabled:hover, .p-buttonset.p-button-secondary > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-secondary > .p-button.p-button-outlined:enabled:hover {
  background: rgba(120, 144, 156, 0.04);
  color: #78909C;
  border: 1px solid;
}
.p-button.p-button-secondary.p-button-outlined:enabled:active, .p-buttonset.p-button-secondary > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-secondary > .p-button.p-button-outlined:enabled:active {
  background: rgba(120, 144, 156, 0.16);
  color: #78909C;
  border: 1px solid;
}
.p-button.p-button-secondary.p-button-text, .p-buttonset.p-button-secondary > .p-button.p-button-text, .p-splitbutton.p-button-secondary > .p-button.p-button-text {
  background-color: transparent;
  color: #78909C;
  border-color: transparent;
}
.p-button.p-button-secondary.p-button-text:enabled:hover, .p-buttonset.p-button-secondary > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-secondary > .p-button.p-button-text:enabled:hover {
  background: rgba(120, 144, 156, 0.04);
  border-color: transparent;
  color: #78909C;
}
.p-button.p-button-secondary.p-button-text:enabled:active, .p-buttonset.p-button-secondary > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-secondary > .p-button.p-button-text:enabled:active {
  background: rgba(120, 144, 156, 0.16);
  border-color: transparent;
  color: #78909C;
}

.p-button.p-button-info, .p-buttonset.p-button-info > .p-button, .p-splitbutton.p-button-info > .p-button {
  color: #121212;
  background: #81D4FA;
  border: 1px solid #81D4FA;
}
.p-button.p-button-info:enabled:hover, .p-buttonset.p-button-info > .p-button:enabled:hover, .p-splitbutton.p-button-info > .p-button:enabled:hover {
  background: #5dc8f9;
  color: #121212;
  border-color: #5dc8f9;
}
.p-button.p-button-info:enabled:focus, .p-buttonset.p-button-info > .p-button:enabled:focus, .p-splitbutton.p-button-info > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #a7e1fc;
}
.p-button.p-button-info:enabled:active, .p-buttonset.p-button-info > .p-button:enabled:active, .p-splitbutton.p-button-info > .p-button:enabled:active {
  background: #38bbf7;
  color: #121212;
  border-color: #38bbf7;
}
.p-button.p-button-info.p-button-outlined, .p-buttonset.p-button-info > .p-button.p-button-outlined, .p-splitbutton.p-button-info > .p-button.p-button-outlined {
  background-color: transparent;
  color: #81D4FA;
  border: 1px solid;
}
.p-button.p-button-info.p-button-outlined:enabled:hover, .p-buttonset.p-button-info > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-info > .p-button.p-button-outlined:enabled:hover {
  background: rgba(129, 212, 250, 0.04);
  color: #81D4FA;
  border: 1px solid;
}
.p-button.p-button-info.p-button-outlined:enabled:active, .p-buttonset.p-button-info > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-info > .p-button.p-button-outlined:enabled:active {
  background: rgba(129, 212, 250, 0.16);
  color: #81D4FA;
  border: 1px solid;
}
.p-button.p-button-info.p-button-text, .p-buttonset.p-button-info > .p-button.p-button-text, .p-splitbutton.p-button-info > .p-button.p-button-text {
  background-color: transparent;
  color: #81D4FA;
  border-color: transparent;
}
.p-button.p-button-info.p-button-text:enabled:hover, .p-buttonset.p-button-info > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-info > .p-button.p-button-text:enabled:hover {
  background: rgba(129, 212, 250, 0.04);
  border-color: transparent;
  color: #81D4FA;
}
.p-button.p-button-info.p-button-text:enabled:active, .p-buttonset.p-button-info > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-info > .p-button.p-button-text:enabled:active {
  background: rgba(129, 212, 250, 0.16);
  border-color: transparent;
  color: #81D4FA;
}

.p-button.p-button-success, .p-buttonset.p-button-success > .p-button, .p-splitbutton.p-button-success > .p-button {
  color: #121212;
  background: #C5E1A5;
  border: 1px solid #C5E1A5;
}
.p-button.p-button-success:enabled:hover, .p-buttonset.p-button-success > .p-button:enabled:hover, .p-splitbutton.p-button-success > .p-button:enabled:hover {
  background: #b2d788;
  color: #121212;
  border-color: #b2d788;
}
.p-button.p-button-success:enabled:focus, .p-buttonset.p-button-success > .p-button:enabled:focus, .p-splitbutton.p-button-success > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #d6eac0;
}
.p-button.p-button-success:enabled:active, .p-buttonset.p-button-success > .p-button:enabled:active, .p-splitbutton.p-button-success > .p-button:enabled:active {
  background: #9fce6b;
  color: #121212;
  border-color: #9fce6b;
}
.p-button.p-button-success.p-button-outlined, .p-buttonset.p-button-success > .p-button.p-button-outlined, .p-splitbutton.p-button-success > .p-button.p-button-outlined {
  background-color: transparent;
  color: #C5E1A5;
  border: 1px solid;
}
.p-button.p-button-success.p-button-outlined:enabled:hover, .p-buttonset.p-button-success > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-success > .p-button.p-button-outlined:enabled:hover {
  background: rgba(197, 225, 165, 0.04);
  color: #C5E1A5;
  border: 1px solid;
}
.p-button.p-button-success.p-button-outlined:enabled:active, .p-buttonset.p-button-success > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-success > .p-button.p-button-outlined:enabled:active {
  background: rgba(197, 225, 165, 0.16);
  color: #C5E1A5;
  border: 1px solid;
}
.p-button.p-button-success.p-button-text, .p-buttonset.p-button-success > .p-button.p-button-text, .p-splitbutton.p-button-success > .p-button.p-button-text {
  background-color: transparent;
  color: #C5E1A5;
  border-color: transparent;
}
.p-button.p-button-success.p-button-text:enabled:hover, .p-buttonset.p-button-success > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-success > .p-button.p-button-text:enabled:hover {
  background: rgba(197, 225, 165, 0.04);
  border-color: transparent;
  color: #C5E1A5;
}
.p-button.p-button-success.p-button-text:enabled:active, .p-buttonset.p-button-success > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-success > .p-button.p-button-text:enabled:active {
  background: rgba(197, 225, 165, 0.16);
  border-color: transparent;
  color: #C5E1A5;
}

.p-button.p-button-warning, .p-buttonset.p-button-warning > .p-button, .p-splitbutton.p-button-warning > .p-button {
  color: #121212;
  background: #FFE082;
  border: 1px solid #FFE082;
}
.p-button.p-button-warning:enabled:hover, .p-buttonset.p-button-warning > .p-button:enabled:hover, .p-splitbutton.p-button-warning > .p-button:enabled:hover {
  background: #ffd65c;
  color: #121212;
  border-color: #ffd65c;
}
.p-button.p-button-warning:enabled:focus, .p-buttonset.p-button-warning > .p-button:enabled:focus, .p-splitbutton.p-button-warning > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #ffe9a8;
}
.p-button.p-button-warning:enabled:active, .p-buttonset.p-button-warning > .p-button:enabled:active, .p-splitbutton.p-button-warning > .p-button:enabled:active {
  background: #ffcd35;
  color: #121212;
  border-color: #ffcd35;
}
.p-button.p-button-warning.p-button-outlined, .p-buttonset.p-button-warning > .p-button.p-button-outlined, .p-splitbutton.p-button-warning > .p-button.p-button-outlined {
  background-color: transparent;
  color: #FFE082;
  border: 1px solid;
}
.p-button.p-button-warning.p-button-outlined:enabled:hover, .p-buttonset.p-button-warning > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-warning > .p-button.p-button-outlined:enabled:hover {
  background: rgba(255, 224, 130, 0.04);
  color: #FFE082;
  border: 1px solid;
}
.p-button.p-button-warning.p-button-outlined:enabled:active, .p-buttonset.p-button-warning > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-warning > .p-button.p-button-outlined:enabled:active {
  background: rgba(255, 224, 130, 0.16);
  color: #FFE082;
  border: 1px solid;
}
.p-button.p-button-warning.p-button-text, .p-buttonset.p-button-warning > .p-button.p-button-text, .p-splitbutton.p-button-warning > .p-button.p-button-text {
  background-color: transparent;
  color: #FFE082;
  border-color: transparent;
}
.p-button.p-button-warning.p-button-text:enabled:hover, .p-buttonset.p-button-warning > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-warning > .p-button.p-button-text:enabled:hover {
  background: rgba(255, 224, 130, 0.04);
  border-color: transparent;
  color: #FFE082;
}
.p-button.p-button-warning.p-button-text:enabled:active, .p-buttonset.p-button-warning > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-warning > .p-button.p-button-text:enabled:active {
  background: rgba(255, 224, 130, 0.16);
  border-color: transparent;
  color: #FFE082;
}

.p-button.p-button-help, .p-buttonset.p-button-help > .p-button, .p-splitbutton.p-button-help > .p-button {
  color: #121212;
  background: #CE93D8;
  border: 1px solid #CE93D8;
}
.p-button.p-button-help:enabled:hover, .p-buttonset.p-button-help > .p-button:enabled:hover, .p-splitbutton.p-button-help > .p-button:enabled:hover {
  background: #c278ce;
  color: #121212;
  border-color: #c278ce;
}
.p-button.p-button-help:enabled:focus, .p-buttonset.p-button-help > .p-button:enabled:focus, .p-splitbutton.p-button-help > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #ddb3e4;
}
.p-button.p-button-help:enabled:active, .p-buttonset.p-button-help > .p-button:enabled:active, .p-splitbutton.p-button-help > .p-button:enabled:active {
  background: #b65ec5;
  color: #121212;
  border-color: #b65ec5;
}
.p-button.p-button-help.p-button-outlined, .p-buttonset.p-button-help > .p-button.p-button-outlined, .p-splitbutton.p-button-help > .p-button.p-button-outlined {
  background-color: transparent;
  color: #CE93D8;
  border: 1px solid;
}
.p-button.p-button-help.p-button-outlined:enabled:hover, .p-buttonset.p-button-help > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-help > .p-button.p-button-outlined:enabled:hover {
  background: rgba(206, 147, 216, 0.04);
  color: #CE93D8;
  border: 1px solid;
}
.p-button.p-button-help.p-button-outlined:enabled:active, .p-buttonset.p-button-help > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-help > .p-button.p-button-outlined:enabled:active {
  background: rgba(206, 147, 216, 0.16);
  color: #CE93D8;
  border: 1px solid;
}
.p-button.p-button-help.p-button-text, .p-buttonset.p-button-help > .p-button.p-button-text, .p-splitbutton.p-button-help > .p-button.p-button-text {
  background-color: transparent;
  color: #CE93D8;
  border-color: transparent;
}
.p-button.p-button-help.p-button-text:enabled:hover, .p-buttonset.p-button-help > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-help > .p-button.p-button-text:enabled:hover {
  background: rgba(206, 147, 216, 0.04);
  border-color: transparent;
  color: #CE93D8;
}
.p-button.p-button-help.p-button-text:enabled:active, .p-buttonset.p-button-help > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-help > .p-button.p-button-text:enabled:active {
  background: rgba(206, 147, 216, 0.16);
  border-color: transparent;
  color: #CE93D8;
}

.p-button.p-button-danger, .p-buttonset.p-button-danger > .p-button, .p-splitbutton.p-button-danger > .p-button {
  color: #121212;
  background: #F48FB1;
  border: 1px solid #F48FB1;
}
.p-button.p-button-danger:enabled:hover, .p-buttonset.p-button-danger > .p-button:enabled:hover, .p-splitbutton.p-button-danger > .p-button:enabled:hover {
  background: #f16c98;
  color: #121212;
  border-color: #f16c98;
}
.p-button.p-button-danger:enabled:focus, .p-buttonset.p-button-danger > .p-button:enabled:focus, .p-splitbutton.p-button-danger > .p-button:enabled:focus {
  box-shadow: 0 0 0 1px #f7b1c8;
}
.p-button.p-button-danger:enabled:active, .p-buttonset.p-button-danger > .p-button:enabled:active, .p-splitbutton.p-button-danger > .p-button:enabled:active {
  background: #ed4980;
  color: #121212;
  border-color: #ed4980;
}
.p-button.p-button-danger.p-button-outlined, .p-buttonset.p-button-danger > .p-button.p-button-outlined, .p-splitbutton.p-button-danger > .p-button.p-button-outlined {
  background-color: transparent;
  color: #F48FB1;
  border: 1px solid;
}
.p-button.p-button-danger.p-button-outlined:enabled:hover, .p-buttonset.p-button-danger > .p-button.p-button-outlined:enabled:hover, .p-splitbutton.p-button-danger > .p-button.p-button-outlined:enabled:hover {
  background: rgba(244, 143, 177, 0.04);
  color: #F48FB1;
  border: 1px solid;
}
.p-button.p-button-danger.p-button-outlined:enabled:active, .p-buttonset.p-button-danger > .p-button.p-button-outlined:enabled:active, .p-splitbutton.p-button-danger > .p-button.p-button-outlined:enabled:active {
  background: rgba(244, 143, 177, 0.16);
  color: #F48FB1;
  border: 1px solid;
}
.p-button.p-button-danger.p-button-text, .p-buttonset.p-button-danger > .p-button.p-button-text, .p-splitbutton.p-button-danger > .p-button.p-button-text {
  background-color: transparent;
  color: #F48FB1;
  border-color: transparent;
}
.p-button.p-button-danger.p-button-text:enabled:hover, .p-buttonset.p-button-danger > .p-button.p-button-text:enabled:hover, .p-splitbutton.p-button-danger > .p-button.p-button-text:enabled:hover {
  background: rgba(244, 143, 177, 0.04);
  border-color: transparent;
  color: #F48FB1;
}
.p-button.p-button-danger.p-button-text:enabled:active, .p-buttonset.p-button-danger > .p-button.p-button-text:enabled:active, .p-splitbutton.p-button-danger > .p-button.p-button-text:enabled:active {
  background: rgba(244, 143, 177, 0.16);
  border-color: transparent;
  color: #F48FB1;
}

.p-button.p-button-link {
  color: #81C784;
  background: transparent;
  border: transparent;
}
.p-button.p-button-link:enabled:hover {
  background: transparent;
  color: #81C784;
  border-color: transparent;
}
.p-button.p-button-link:enabled:hover .p-button-label {
  text-decoration: underline;
}
.p-button.p-button-link:enabled:focus {
  background: transparent;
  box-shadow: 0 0 0 1px #a7d8a9;
  border-color: transparent;
}
.p-button.p-button-link:enabled:active {
  background: transparent;
  color: #81C784;
  border-color: transparent;
}

.p-speeddial-button.p-button.p-button-icon-only {
  width: 4rem;
  height: 4rem;
}
.p-speeddial-button.p-button.p-button-icon-only .p-button-icon {
  font-size: 1.3rem;
}
.p-speeddial-button.p-button.p-button-icon-only .p-icon {
  width: 1.3rem;
  height: 1.3rem;
}

.p-speeddial-list {
  outline: 0 none;
}

.p-speeddial-item.p-focus > .p-speeddial-action {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-speeddial-action {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.87);
  color: #121212;
}
.p-speeddial-action:hover {
  background: rgba(255, 255, 255, 0.6);
  color: #121212;
}

.p-speeddial-direction-up .p-speeddial-item {
  margin: 0.25rem 0;
}
.p-speeddial-direction-up .p-speeddial-item:first-child {
  margin-bottom: 0.5rem;
}

.p-speeddial-direction-down .p-speeddial-item {
  margin: 0.25rem 0;
}
.p-speeddial-direction-down .p-speeddial-item:first-child {
  margin-top: 0.5rem;
}

.p-speeddial-direction-left .p-speeddial-item {
  margin: 0 0.25rem;
}
.p-speeddial-direction-left .p-speeddial-item:first-child {
  margin-right: 0.5rem;
}

.p-speeddial-direction-right .p-speeddial-item {
  margin: 0 0.25rem;
}
.p-speeddial-direction-right .p-speeddial-item:first-child {
  margin-left: 0.5rem;
}

.p-speeddial-circle .p-speeddial-item,
.p-speeddial-semi-circle .p-speeddial-item,
.p-speeddial-quarter-circle .p-speeddial-item {
  margin: 0;
}
.p-speeddial-circle .p-speeddial-item:first-child, .p-speeddial-circle .p-speeddial-item:last-child,
.p-speeddial-semi-circle .p-speeddial-item:first-child,
.p-speeddial-semi-circle .p-speeddial-item:last-child,
.p-speeddial-quarter-circle .p-speeddial-item:first-child,
.p-speeddial-quarter-circle .p-speeddial-item:last-child {
  margin: 0;
}

.p-speeddial-mask {
  background-color: rgba(0, 0, 0, 0.4);
}

.p-splitbutton {
  border-radius: 3px;
}
.p-splitbutton.p-button-outlined > .p-button {
  background-color: transparent;
  color: #81C784;
  border: 1px solid;
}
.p-splitbutton.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(129, 199, 132, 0.04);
  color: #81C784;
}
.p-splitbutton.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(129, 199, 132, 0.16);
  color: #81C784;
}
.p-splitbutton.p-button-outlined.p-button-plain > .p-button {
  color: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-outlined.p-button-plain > .p-button:enabled:hover, .p-splitbutton.p-button-outlined.p-button-plain > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-outlined.p-button-plain > .p-button:enabled:active, .p-splitbutton.p-button-outlined.p-button-plain > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-text > .p-button {
  background-color: transparent;
  color: #81C784;
  border-color: transparent;
}
.p-splitbutton.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(129, 199, 132, 0.04);
  color: #81C784;
  border-color: transparent;
}
.p-splitbutton.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(129, 199, 132, 0.16);
  color: #81C784;
  border-color: transparent;
}
.p-splitbutton.p-button-text.p-button-plain > .p-button {
  color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-text.p-button-plain > .p-button:enabled:hover, .p-splitbutton.p-button-text.p-button-plain > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-text.p-button-plain > .p-button:enabled:active, .p-splitbutton.p-button-text.p-button-plain > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.6);
}
.p-splitbutton.p-button-raised {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.p-splitbutton.p-button-rounded {
  border-radius: 2rem;
}
.p-splitbutton.p-button-rounded > .p-button {
  border-radius: 2rem;
}
.p-splitbutton.p-button-sm > .p-button {
  font-size: 0.875rem;
  padding: 0.4375rem 0.875rem;
}
.p-splitbutton.p-button-sm > .p-button .p-button-icon {
  font-size: 0.875rem;
}
.p-splitbutton.p-button-lg > .p-button {
  font-size: 1.25rem;
  padding: 0.625rem 1.25rem;
}
.p-splitbutton.p-button-lg > .p-button .p-button-icon {
  font-size: 1.25rem;
}

.p-splitbutton.p-button-secondary.p-button-outlined > .p-button {
  background-color: transparent;
  color: #78909C;
  border: 1px solid;
}
.p-splitbutton.p-button-secondary.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-secondary.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(120, 144, 156, 0.04);
  color: #78909C;
}
.p-splitbutton.p-button-secondary.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-secondary.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(120, 144, 156, 0.16);
  color: #78909C;
}
.p-splitbutton.p-button-secondary.p-button-text > .p-button {
  background-color: transparent;
  color: #78909C;
  border-color: transparent;
}
.p-splitbutton.p-button-secondary.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-secondary.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(120, 144, 156, 0.04);
  border-color: transparent;
  color: #78909C;
}
.p-splitbutton.p-button-secondary.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-secondary.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(120, 144, 156, 0.16);
  border-color: transparent;
  color: #78909C;
}

.p-splitbutton.p-button-info.p-button-outlined > .p-button {
  background-color: transparent;
  color: #81D4FA;
  border: 1px solid;
}
.p-splitbutton.p-button-info.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-info.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(129, 212, 250, 0.04);
  color: #81D4FA;
}
.p-splitbutton.p-button-info.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-info.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(129, 212, 250, 0.16);
  color: #81D4FA;
}
.p-splitbutton.p-button-info.p-button-text > .p-button {
  background-color: transparent;
  color: #81D4FA;
  border-color: transparent;
}
.p-splitbutton.p-button-info.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-info.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(129, 212, 250, 0.04);
  border-color: transparent;
  color: #81D4FA;
}
.p-splitbutton.p-button-info.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-info.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(129, 212, 250, 0.16);
  border-color: transparent;
  color: #81D4FA;
}

.p-splitbutton.p-button-success.p-button-outlined > .p-button {
  background-color: transparent;
  color: #C5E1A5;
  border: 1px solid;
}
.p-splitbutton.p-button-success.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-success.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(197, 225, 165, 0.04);
  color: #C5E1A5;
}
.p-splitbutton.p-button-success.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-success.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(197, 225, 165, 0.16);
  color: #C5E1A5;
}
.p-splitbutton.p-button-success.p-button-text > .p-button {
  background-color: transparent;
  color: #C5E1A5;
  border-color: transparent;
}
.p-splitbutton.p-button-success.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-success.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(197, 225, 165, 0.04);
  border-color: transparent;
  color: #C5E1A5;
}
.p-splitbutton.p-button-success.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-success.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(197, 225, 165, 0.16);
  border-color: transparent;
  color: #C5E1A5;
}

.p-splitbutton.p-button-warning.p-button-outlined > .p-button {
  background-color: transparent;
  color: #FFE082;
  border: 1px solid;
}
.p-splitbutton.p-button-warning.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-warning.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(255, 224, 130, 0.04);
  color: #FFE082;
}
.p-splitbutton.p-button-warning.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-warning.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(255, 224, 130, 0.16);
  color: #FFE082;
}
.p-splitbutton.p-button-warning.p-button-text > .p-button {
  background-color: transparent;
  color: #FFE082;
  border-color: transparent;
}
.p-splitbutton.p-button-warning.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-warning.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(255, 224, 130, 0.04);
  border-color: transparent;
  color: #FFE082;
}
.p-splitbutton.p-button-warning.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-warning.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(255, 224, 130, 0.16);
  border-color: transparent;
  color: #FFE082;
}

.p-splitbutton.p-button-help.p-button-outlined > .p-button {
  background-color: transparent;
  color: #CE93D8;
  border: 1px solid;
}
.p-splitbutton.p-button-help.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-help.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(206, 147, 216, 0.04);
  color: #CE93D8;
}
.p-splitbutton.p-button-help.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-help.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(206, 147, 216, 0.16);
  color: #CE93D8;
}
.p-splitbutton.p-button-help.p-button-text > .p-button {
  background-color: transparent;
  color: #CE93D8;
  border-color: transparent;
}
.p-splitbutton.p-button-help.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-help.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(206, 147, 216, 0.04);
  border-color: transparent;
  color: #CE93D8;
}
.p-splitbutton.p-button-help.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-help.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(206, 147, 216, 0.16);
  border-color: transparent;
  color: #CE93D8;
}

.p-splitbutton.p-button-danger.p-button-outlined > .p-button {
  background-color: transparent;
  color: #F48FB1;
  border: 1px solid;
}
.p-splitbutton.p-button-danger.p-button-outlined > .p-button:enabled:hover, .p-splitbutton.p-button-danger.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(244, 143, 177, 0.04);
  color: #F48FB1;
}
.p-splitbutton.p-button-danger.p-button-outlined > .p-button:enabled:active, .p-splitbutton.p-button-danger.p-button-outlined > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(244, 143, 177, 0.16);
  color: #F48FB1;
}
.p-splitbutton.p-button-danger.p-button-text > .p-button {
  background-color: transparent;
  color: #F48FB1;
  border-color: transparent;
}
.p-splitbutton.p-button-danger.p-button-text > .p-button:enabled:hover, .p-splitbutton.p-button-danger.p-button-text > .p-button:not(button):not(a):not(.p-disabled):hover {
  background: rgba(244, 143, 177, 0.04);
  border-color: transparent;
  color: #F48FB1;
}
.p-splitbutton.p-button-danger.p-button-text > .p-button:enabled:active, .p-splitbutton.p-button-danger.p-button-text > .p-button:not(button):not(a):not(.p-disabled):active {
  background: rgba(244, 143, 177, 0.16);
  border-color: transparent;
  color: #F48FB1;
}

.p-carousel .p-carousel-content .p-carousel-prev,
.p-carousel .p-carousel-content .p-carousel-next {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  margin: 0.5rem;
}
.p-carousel .p-carousel-content .p-carousel-prev:enabled:hover,
.p-carousel .p-carousel-content .p-carousel-next:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-carousel .p-carousel-content .p-carousel-prev:focus,
.p-carousel .p-carousel-content .p-carousel-next:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-carousel .p-carousel-indicators {
  padding: 1rem;
}
.p-carousel .p-carousel-indicators .p-carousel-indicator {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.p-carousel .p-carousel-indicators .p-carousel-indicator button {
  background-color: #383838;
  width: 2rem;
  height: 0.5rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 0;
}
.p-carousel .p-carousel-indicators .p-carousel-indicator button:hover {
  background: #4c4c4c;
}
.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}

.p-datatable .p-paginator-top {
  border-width: 1px 0 1px 0;
  border-radius: 0;
}
.p-datatable .p-paginator-bottom {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.p-datatable .p-datatable-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-datatable .p-datatable-footer {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  transition: box-shadow 0.2s;
}
.p-datatable .p-datatable-tfoot > tr > td {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
}
.p-datatable .p-sortable-column .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}
.p-datatable .p-sortable-column .p-sortable-column-badge {
  border-radius: 50%;
  height: 1.143rem;
  min-width: 1.143rem;
  line-height: 1.143rem;
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
  margin-left: 0.5rem;
}
.p-datatable .p-sortable-column:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-sortable-column:not(.p-highlight):hover .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-sortable-column.p-highlight {
  background: #1e1e1e;
  color: #81C784;
}
.p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
  color: #81C784;
}
.p-datatable .p-sortable-column.p-highlight:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #81C784;
}
.p-datatable .p-sortable-column.p-highlight:hover .p-sortable-column-icon {
  color: #81C784;
}
.p-datatable .p-sortable-column:focus {
  box-shadow: inset 0 0 0 0.15rem #a7d8a9;
  outline: 0 none;
}
.p-datatable .p-datatable-tbody > tr {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
}
.p-datatable .p-datatable-tbody > tr > td {
  text-align: left;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler:focus,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:focus,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:focus,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save {
  margin-right: 0.5rem;
}
.p-datatable .p-datatable-tbody > tr > td > .p-column-title {
  font-weight: 600;
}
.p-datatable .p-datatable-tbody > tr:focus {
  outline: 0.15rem solid #a7d8a9;
  outline-offset: -0.15rem;
}
.p-datatable .p-datatable-tbody > tr.p-highlight {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
  box-shadow: inset 0 2px 0 0 rgba(129, 199, 132, 0.16);
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
  box-shadow: inset 0 -2px 0 0 rgba(129, 199, 132, 0.16);
}
.p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-column-resizer-helper {
  background: #81C784;
}
.p-datatable .p-datatable-scrollable-header,
.p-datatable .p-datatable-scrollable-footer {
  background: #1e1e1e;
}
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-datatable-table > .p-datatable-thead,
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tfoot, .p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-virtualscroller > .p-datatable-table > .p-datatable-thead,
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {
  background-color: #1e1e1e;
}
.p-datatable .p-datatable-loading-icon {
  font-size: 2rem;
}
.p-datatable .p-datatable-loading-icon.p-icon {
  width: 2rem;
  height: 2rem;
}
.p-datatable.p-datatable-gridlines .p-datatable-header {
  border-width: 1px 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-footer {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-paginator-top {
  border-width: 0 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-paginator-bottom {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th:last-child {
  border-width: 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td {
  border-width: 1px 0 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
  border-width: 1px 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {
  border-width: 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {
  border-width: 1px 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {
  border-width: 0 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
  border-width: 0 0 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {
  border-width: 0 0 0 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {
  border-width: 0 1px 0 1px;
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even) {
  background: #242424;
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even).p-highlight {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even).p-highlight .p-row-toggler {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even).p-highlight .p-row-toggler:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-sm .p-datatable-header {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-footer {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-lg .p-datatable-header {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-footer {
  padding: 1.25rem 1.25rem;
}

.p-dataview .p-paginator-top {
  border-width: 1px 0 1px 0;
  border-radius: 0;
}
.p-dataview .p-paginator-bottom {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.p-dataview .p-dataview-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-dataview .p-dataview-content {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 0 none;
  padding: 0;
}
.p-dataview.p-dataview-list .p-dataview-content > .p-grid > div {
  border: solid #383838;
  border-width: 0 0 1px 0;
}
.p-dataview .p-dataview-footer {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.p-column-filter-row .p-column-filter-menu-button,
.p-column-filter-row .p-column-filter-clear-button {
  margin-left: 0.5rem;
}

.p-column-filter-menu-button {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-column-filter-menu-button:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-column-filter-menu-button.p-column-filter-menu-button-open, .p-column-filter-menu-button.p-column-filter-menu-button-open:hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-column-filter-menu-button.p-column-filter-menu-button-active, .p-column-filter-menu-button.p-column-filter-menu-button-active:hover {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-column-filter-menu-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-column-filter-clear-button {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-column-filter-clear-button:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-column-filter-clear-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-column-filter-overlay {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  min-width: 12.5rem;
}
.p-column-filter-overlay .p-column-filter-row-items {
  padding: 0.5rem 0;
}
.p-column-filter-overlay .p-column-filter-row-items .p-column-filter-row-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-column-filter-overlay .p-column-filter-row-items .p-column-filter-row-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-column-filter-overlay .p-column-filter-row-items .p-column-filter-row-item:not(.p-highlight):not(.p-disabled):hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-column-filter-overlay .p-column-filter-row-items .p-column-filter-row-item:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.15rem #a7d8a9;
}
.p-column-filter-overlay .p-column-filter-row-items .p-column-filter-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}

.p-column-filter-overlay-menu .p-column-filter-operator {
  padding: 0.5rem 1rem;
  border-bottom: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  margin: 0;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-column-filter-overlay-menu .p-column-filter-constraint {
  padding: 1rem;
  border-bottom: 1px solid #383838;
}
.p-column-filter-overlay-menu .p-column-filter-constraint .p-column-filter-matchmode-dropdown {
  margin-bottom: 0.5rem;
}
.p-column-filter-overlay-menu .p-column-filter-constraint .p-column-filter-remove-button {
  margin-top: 0.5rem;
}
.p-column-filter-overlay-menu .p-column-filter-constraint:last-child {
  border-bottom: 0 none;
}
.p-column-filter-overlay-menu .p-column-filter-add-rule {
  padding: 0.5rem 1rem;
}
.p-column-filter-overlay-menu .p-column-filter-buttonbar {
  padding: 1rem;
}

.fc {
  /* FullCalendar 4 */
  /* FullCalendar 5 */
}
.fc.fc-unthemed .fc-view-container th {
  background: #1e1e1e;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-unthemed .fc-view-container td.fc-widget-content {
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-unthemed .fc-view-container td.fc-head-container {
  border: 1px solid #383838;
}
.fc.fc-unthemed .fc-view-container .fc-view {
  background: #1e1e1e;
}
.fc.fc-unthemed .fc-view-container .fc-row {
  border-right: 1px solid #383838;
}
.fc.fc-unthemed .fc-view-container .fc-event {
  background: #6abd6e;
  border: 1px solid #6abd6e;
  color: #212529;
}
.fc.fc-unthemed .fc-view-container .fc-divider {
  background: #1e1e1e;
  border: 1px solid #383838;
}
.fc.fc-unthemed .fc-toolbar .fc-button {
  color: #212529;
  background: #81C784;
  border: 1px solid #81C784;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.fc.fc-unthemed .fc-toolbar .fc-button:enabled:hover {
  background: #6abd6e;
  color: #212529;
  border-color: #6abd6e;
}
.fc.fc-unthemed .fc-toolbar .fc-button:enabled:active {
  background: #54b358;
  color: #212529;
  border-color: #54b358;
}
.fc.fc-unthemed .fc-toolbar .fc-button:enabled:active:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.fc.fc-unthemed .fc-toolbar .fc-button .fc-icon-chevron-left {
  font-family: "PrimeIcons" !important;
  text-indent: 0;
  font-size: 1rem;
}
.fc.fc-unthemed .fc-toolbar .fc-button .fc-icon-chevron-left:before {
  content: "e900";
}
.fc.fc-unthemed .fc-toolbar .fc-button .fc-icon-chevron-right {
  font-family: "PrimeIcons" !important;
  text-indent: 0;
  font-size: 1rem;
}
.fc.fc-unthemed .fc-toolbar .fc-button .fc-icon-chevron-right:before {
  content: "e901";
}
.fc.fc-unthemed .fc-toolbar .fc-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.fc.fc-unthemed .fc-toolbar .fc-button.fc-dayGridMonth-button, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridWeek-button, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridDay-button {
  background: #1e1e1e;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.fc.fc-unthemed .fc-toolbar .fc-button.fc-dayGridMonth-button:hover, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridWeek-button:hover, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridDay-button:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-unthemed .fc-toolbar .fc-button.fc-dayGridMonth-button.fc-button-active, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridWeek-button.fc-button-active, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridDay-button.fc-button-active {
  background: #81C784;
  border-color: #81C784;
  color: #212529;
}
.fc.fc-unthemed .fc-toolbar .fc-button.fc-dayGridMonth-button.fc-button-active:hover, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridWeek-button.fc-button-active:hover, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridDay-button.fc-button-active:hover {
  background: #6abd6e;
  border-color: #6abd6e;
  color: #212529;
}
.fc.fc-unthemed .fc-toolbar .fc-button.fc-dayGridMonth-button:focus, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridWeek-button:focus, .fc.fc-unthemed .fc-toolbar .fc-button.fc-timeGridDay-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  z-index: 1;
}
.fc.fc-unthemed .fc-toolbar .fc-button-group .fc-button {
  border-radius: 0;
}
.fc.fc-unthemed .fc-toolbar .fc-button-group .fc-button:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.fc.fc-unthemed .fc-toolbar .fc-button-group .fc-button:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fc.fc-theme-standard .fc-view-harness .fc-scrollgrid {
  border-color: #383838;
}
.fc.fc-theme-standard .fc-view-harness th {
  background: #1e1e1e;
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-theme-standard .fc-view-harness td {
  color: rgba(255, 255, 255, 0.87);
  border-color: #383838;
}
.fc.fc-theme-standard .fc-view-harness .fc-view {
  background: #1e1e1e;
}
.fc.fc-theme-standard .fc-view-harness .fc-popover {
  background: none;
  border: 0 none;
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-header {
  border: 1px solid #383838;
  padding: 1rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-header .fc-popover-close {
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: "PrimeIcons" !important;
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-header .fc-popover-close:before {
  content: "e90b";
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-header .fc-popover-close:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-header .fc-popover-close:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.fc.fc-theme-standard .fc-view-harness .fc-popover .fc-popover-body {
  padding: 1rem;
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-top: 0 none;
}
.fc.fc-theme-standard .fc-view-harness .fc-event.fc-daygrid-block-event {
  color: #212529;
  background: #6abd6e;
  border-color: #6abd6e;
}
.fc.fc-theme-standard .fc-view-harness .fc-event.fc-daygrid-block-event .fc-event-main {
  color: #212529;
}
.fc.fc-theme-standard .fc-view-harness .fc-event.fc-daygrid-dot-event .fc-daygrid-event-dot {
  background: #6abd6e;
  border-color: #6abd6e;
}
.fc.fc-theme-standard .fc-view-harness .fc-event.fc-daygrid-dot-event:hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-theme-standard .fc-view-harness .fc-cell-shaded {
  background: #1e1e1e;
}
.fc.fc-theme-standard .fc-toolbar .fc-button {
  color: #212529;
  background: #81C784;
  border: 1px solid #81C784;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
}
.fc.fc-theme-standard .fc-toolbar .fc-button:enabled:hover {
  background: #6abd6e;
  color: #212529;
  border-color: #6abd6e;
}
.fc.fc-theme-standard .fc-toolbar .fc-button:enabled:active {
  background: #54b358;
  color: #212529;
  border-color: #54b358;
}
.fc.fc-theme-standard .fc-toolbar .fc-button:enabled:active:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.fc.fc-theme-standard .fc-toolbar .fc-button:disabled {
  opacity: 0.4;
  color: #212529;
  background: #81C784;
  border: 1px solid #81C784;
}
.fc.fc-theme-standard .fc-toolbar .fc-button .fc-icon-chevron-left {
  font-family: "PrimeIcons" !important;
  text-indent: 0;
  font-size: 1rem;
}
.fc.fc-theme-standard .fc-toolbar .fc-button .fc-icon-chevron-left:before {
  content: "e900";
}
.fc.fc-theme-standard .fc-toolbar .fc-button .fc-icon-chevron-right {
  font-family: "PrimeIcons" !important;
  text-indent: 0;
  font-size: 1rem;
}
.fc.fc-theme-standard .fc-toolbar .fc-button .fc-icon-chevron-right:before {
  content: "e901";
}
.fc.fc-theme-standard .fc-toolbar .fc-button:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.fc.fc-theme-standard .fc-toolbar .fc-button.fc-dayGridMonth-button, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridWeek-button, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridDay-button {
  background: #1e1e1e;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.fc.fc-theme-standard .fc-toolbar .fc-button.fc-dayGridMonth-button:hover, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridWeek-button:hover, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridDay-button:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.fc.fc-theme-standard .fc-toolbar .fc-button.fc-dayGridMonth-button.fc-button-active, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridWeek-button.fc-button-active, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridDay-button.fc-button-active {
  background: #81C784;
  border-color: #81C784;
  color: #212529;
}
.fc.fc-theme-standard .fc-toolbar .fc-button.fc-dayGridMonth-button.fc-button-active:hover, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridWeek-button.fc-button-active:hover, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridDay-button.fc-button-active:hover {
  background: #6abd6e;
  border-color: #6abd6e;
  color: #212529;
}
.fc.fc-theme-standard .fc-toolbar .fc-button.fc-dayGridMonth-button:not(:disabled):focus, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridWeek-button:not(:disabled):focus, .fc.fc-theme-standard .fc-toolbar .fc-button.fc-timeGridDay-button:not(:disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
  z-index: 1;
}
.fc.fc-theme-standard .fc-toolbar .fc-button-group .fc-button {
  border-radius: 0;
}
.fc.fc-theme-standard .fc-toolbar .fc-button-group .fc-button:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.fc.fc-theme-standard .fc-toolbar .fc-button-group .fc-button:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fc.fc-theme-standard .fc-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}

.p-orderlist .p-orderlist-controls {
  padding: 1rem;
}
.p-orderlist .p-orderlist-controls .p-button {
  margin-bottom: 0.5rem;
}
.p-orderlist .p-orderlist-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  padding: 1rem;
  font-weight: 600;
  border-bottom: 0 none;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-orderlist .p-orderlist-list {
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 0.5rem 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: 0 none;
}
.p-orderlist .p-orderlist-list .p-orderlist-item {
  padding: 0.5rem 1rem;
  margin: 0;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.p-orderlist .p-orderlist-list .p-orderlist-item:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-orderlist .p-orderlist-list .p-orderlist-item.p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-orderlist .p-orderlist-list .p-orderlist-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-orderlist .p-orderlist-list .p-orderlist-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-orderlist.p-orderlist-striped .p-orderlist-list .p-orderlist-item:nth-child(even) {
  background: rgba(255, 255, 255, 0.01);
}
.p-orderlist.p-orderlist-striped .p-orderlist-list .p-orderlist-item:nth-child(even):hover {
  background: rgba(255, 255, 255, 0.03);
}

.p-organizationchart .p-organizationchart-node-content.p-organizationchart-selectable-node:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-organizationchart .p-organizationchart-node-content.p-highlight {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-organizationchart .p-organizationchart-node-content.p-highlight .p-node-toggler i {
  color: rgba(62, 139, 65, 0.16);
}
.p-organizationchart .p-organizationchart-line-down {
  background: #383838;
}
.p-organizationchart .p-organizationchart-line-left {
  border-right: 1px solid #383838;
  border-color: #383838;
}
.p-organizationchart .p-organizationchart-line-top {
  border-top: 1px solid #383838;
  border-color: #383838;
}
.p-organizationchart .p-organizationchart-node-content {
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 1rem;
}
.p-organizationchart .p-organizationchart-node-content .p-node-toggler {
  background: inherit;
  color: inherit;
  border-radius: 50%;
}
.p-organizationchart .p-organizationchart-node-content .p-node-toggler:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-paginator {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border: solid #383838;
  border-width: 1px;
  padding: 0.5rem 1rem;
  border-radius: 3px;
}
.p-paginator .p-paginator-first,
.p-paginator .p-paginator-prev,
.p-paginator .p-paginator-next,
.p-paginator .p-paginator-last {
  background-color: transparent;
  border: 0 none;
  color: rgba(255, 255, 255, 0.6);
  min-width: 2.286em;
  height: 2.286em;
  margin: 0.143rem;
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-paginator .p-paginator-first:not(.p-disabled):not(.p-highlight):hover,
.p-paginator .p-paginator-prev:not(.p-disabled):not(.p-highlight):hover,
.p-paginator .p-paginator-next:not(.p-disabled):not(.p-highlight):hover,
.p-paginator .p-paginator-last:not(.p-disabled):not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: transparent;
  color: rgba(255, 255, 255, 0.87);
}
.p-paginator .p-paginator-first {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-paginator .p-paginator-last {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.p-paginator .p-dropdown {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 2.286em;
}
.p-paginator .p-dropdown .p-dropdown-label {
  padding-right: 0;
}
.p-paginator .p-paginator-page-input {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.p-paginator .p-paginator-page-input .p-inputtext {
  max-width: 2.286em;
}
.p-paginator .p-paginator-current {
  background-color: transparent;
  border: 0 none;
  color: rgba(255, 255, 255, 0.6);
  min-width: 2.286em;
  height: 2.286em;
  margin: 0.143rem;
  padding: 0 0.5rem;
}
.p-paginator .p-paginator-pages .p-paginator-page {
  background-color: transparent;
  border: 0 none;
  color: rgba(255, 255, 255, 0.6);
  min-width: 2.286em;
  height: 2.286em;
  margin: 0.143rem;
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: rgba(129, 199, 132, 0.16);
  border-color: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-paginator .p-paginator-pages .p-paginator-page:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: transparent;
  color: rgba(255, 255, 255, 0.87);
}

.p-picklist .p-picklist-buttons {
  padding: 1rem;
}
.p-picklist .p-picklist-buttons .p-button {
  margin-bottom: 0.5rem;
}
.p-picklist .p-picklist-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  padding: 1rem;
  font-weight: 600;
  border-bottom: 0 none;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-picklist .p-picklist-list {
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 0.5rem 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: 0 none;
}
.p-picklist .p-picklist-list .p-picklist-item {
  padding: 0.5rem 1rem;
  margin: 0;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.p-picklist .p-picklist-list .p-picklist-item:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-picklist .p-picklist-list .p-picklist-item.p-focus {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-picklist .p-picklist-list .p-picklist-item.p-highlight {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
}
.p-picklist .p-picklist-list .p-picklist-item.p-highlight.p-focus {
  background: rgba(129, 199, 132, 0.24);
}
.p-picklist.p-picklist-striped .p-picklist-list .p-picklist-item:nth-child(even) {
  background: rgba(255, 255, 255, 0.01);
}
.p-picklist.p-picklist-striped .p-picklist-list .p-picklist-item:nth-child(even):hover {
  background: rgba(255, 255, 255, 0.03);
}

.p-timeline .p-timeline-event-marker {
  border: 2px solid #81C784;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background-color: #1e1e1e;
}
.p-timeline .p-timeline-event-connector {
  background-color: #383838;
}
.p-timeline.p-timeline-vertical .p-timeline-event-opposite,
.p-timeline.p-timeline-vertical .p-timeline-event-content {
  padding: 0 1rem;
}
.p-timeline.p-timeline-vertical .p-timeline-event-connector {
  width: 2px;
}
.p-timeline.p-timeline-horizontal .p-timeline-event-opposite,
.p-timeline.p-timeline-horizontal .p-timeline-event-content {
  padding: 1rem 0;
}
.p-timeline.p-timeline-horizontal .p-timeline-event-connector {
  height: 2px;
}

.p-tree {
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 1rem;
  border-radius: 3px;
}
.p-tree .p-tree-container .p-treenode {
  padding: 0.143rem;
  outline: 0 none;
}
.p-tree .p-tree-container .p-treenode:focus > .p-treenode-content {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.15rem #a7d8a9;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content {
  border-radius: 3px;
  transition: box-shadow 0.2s;
  padding: 0;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler {
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-treenode-icon {
  margin-right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-checkbox {
  margin-right: 0.5rem;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-checkbox .p-indeterminate .p-checkbox-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-highlight {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-highlight .p-tree-toggler,
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-highlight .p-treenode-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-highlight .p-tree-toggler:hover,
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-highlight .p-treenode-icon:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selectable:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-tree .p-tree-filter-container {
  margin-bottom: 0.5rem;
}
.p-tree .p-tree-filter-container .p-tree-filter {
  width: 100%;
  padding-right: 1.5rem;
}
.p-tree .p-tree-filter-container .p-tree-filter-icon {
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-tree .p-treenode-children {
  padding: 0 0 0 1rem;
}
.p-tree .p-tree-loading-icon {
  font-size: 2rem;
}
.p-tree .p-tree-loading-icon.p-icon {
  width: 2rem;
  height: 2rem;
}

.p-treetable .p-paginator-top {
  border-width: 1px 0 1px 0;
  border-radius: 0;
}
.p-treetable .p-paginator-bottom {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.p-treetable .p-treetable-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-treetable .p-treetable-footer {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-treetable .p-treetable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  transition: box-shadow 0.2s;
}
.p-treetable .p-treetable-tfoot > tr > td {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
}
.p-treetable .p-sortable-column {
  outline-color: #a7d8a9;
}
.p-treetable .p-sortable-column .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}
.p-treetable .p-sortable-column .p-sortable-column-badge {
  border-radius: 50%;
  height: 1.143rem;
  min-width: 1.143rem;
  line-height: 1.143rem;
  color: rgba(255, 255, 255, 0.87);
  background: rgba(129, 199, 132, 0.16);
  margin-left: 0.5rem;
}
.p-treetable .p-sortable-column:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-sortable-column:not(.p-highlight):hover .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-sortable-column.p-highlight {
  background: #1e1e1e;
  color: #81C784;
}
.p-treetable .p-sortable-column.p-highlight .p-sortable-column-icon {
  color: #81C784;
}
.p-treetable .p-treetable-tbody > tr {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
}
.p-treetable .p-treetable-tbody > tr > td {
  text-align: left;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  margin-right: 0.5rem;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler + .p-checkbox {
  margin-right: 0.5rem;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler + .p-checkbox .p-indeterminate .p-checkbox-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-treetable-tbody > tr:focus {
  outline: 0.15rem solid #a7d8a9;
  outline-offset: -0.15rem;
}
.p-treetable .p-treetable-tbody > tr.p-highlight {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-treetable-tbody > tr.p-highlight .p-treetable-toggler {
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-treetable-tbody > tr.p-highlight .p-treetable-toggler:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable.p-treetable-hoverable-rows .p-treetable-tbody > tr:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable.p-treetable-hoverable-rows .p-treetable-tbody > tr:not(.p-highlight):hover .p-treetable-toggler {
  color: rgba(255, 255, 255, 0.87);
}
.p-treetable .p-column-resizer-helper {
  background: #81C784;
}
.p-treetable .p-treetable-scrollable-header,
.p-treetable .p-treetable-scrollable-footer {
  background: #1e1e1e;
}
.p-treetable .p-treetable-loading-icon {
  font-size: 2rem;
}
.p-treetable .p-treetable-loading-icon.p-icon {
  width: 2rem;
  height: 2rem;
}
.p-treetable.p-treetable-gridlines .p-datatable-header {
  border-width: 1px 1px 0 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-footer {
  border-width: 0 1px 1px 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-top {
  border-width: 0 1px 0 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-bottom {
  border-width: 0 1px 1px 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-thead > tr > th {
  border-width: 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-tbody > tr > td {
  border-width: 1px;
}
.p-treetable.p-treetable-gridlines .p-treetable-tfoot > tr > td {
  border-width: 1px;
}
.p-treetable.p-treetable-sm .p-treetable-header {
  padding: 0.875rem 0.875rem;
}
.p-treetable.p-treetable-sm .p-treetable-thead > tr > th {
  padding: 0.5rem 0.5rem;
}
.p-treetable.p-treetable-sm .p-treetable-tbody > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-treetable.p-treetable-sm .p-treetable-tfoot > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-treetable.p-treetable-sm .p-treetable-footer {
  padding: 0.5rem 0.5rem;
}
.p-treetable.p-treetable-lg .p-treetable-header {
  padding: 1.25rem 1.25rem;
}
.p-treetable.p-treetable-lg .p-treetable-thead > tr > th {
  padding: 1.25rem 1.25rem;
}
.p-treetable.p-treetable-lg .p-treetable-tbody > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-treetable.p-treetable-lg .p-treetable-tfoot > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-treetable.p-treetable-lg .p-treetable-footer {
  padding: 1.25rem 1.25rem;
}

.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 1rem;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.p-accordion .p-accordion-header .p-accordion-header-link .p-accordion-toggle-icon {
  margin-right: 0.5rem;
}
.p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 1px #a7d8a9;
}
.p-accordion .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link {
  background: #1e1e1e;
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link {
  border-color: #383838;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-accordion .p-accordion-content {
  padding: 1rem;
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-accordion .p-accordion-tab {
  margin-bottom: 0;
}
.p-accordion .p-accordion-tab .p-accordion-header .p-accordion-header-link {
  border-radius: 0;
}
.p-accordion .p-accordion-tab .p-accordion-content {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.p-accordion .p-accordion-tab:not(:first-child) .p-accordion-header .p-accordion-header-link {
  border-top: 0 none;
}
.p-accordion .p-accordion-tab:not(:first-child) .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link, .p-accordion .p-accordion-tab:not(:first-child) .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link {
  border-top: 0 none;
}
.p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link {
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-accordion .p-accordion-tab:last-child .p-accordion-header:not(.p-highlight) .p-accordion-header-link {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-accordion .p-accordion-tab:last-child .p-accordion-content {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.p-card {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.p-card .p-card-body {
  padding: 1rem;
}
.p-card .p-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.p-card .p-card-subtitle {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-card .p-card-content {
  padding: 1rem 0;
}
.p-card .p-card-footer {
  padding: 1rem 0 0 0;
}

.p-fieldset {
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 3px;
}
.p-fieldset .p-fieldset-legend {
  padding: 1rem;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
  border-radius: 3px;
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend {
  padding: 0;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend a {
  padding: 1rem;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler {
  margin-right: 0.5rem;
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend a:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend a:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-fieldset.p-fieldset-toggleable .p-fieldset-legend:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.p-fieldset .p-fieldset-content {
  padding: 1rem;
}

.p-divider .p-divider-content {
  background-color: #1e1e1e;
}
.p-divider.p-divider-horizontal {
  margin: 1rem 0;
  padding: 0 1rem;
}
.p-divider.p-divider-horizontal:before {
  border-top: 1px #383838;
}
.p-divider.p-divider-horizontal .p-divider-content {
  padding: 0 0.5rem;
}
.p-divider.p-divider-vertical {
  margin: 0 1rem;
  padding: 1rem 0;
}
.p-divider.p-divider-vertical:before {
  border-left: 1px #383838;
}
.p-divider.p-divider-vertical .p-divider-content {
  padding: 0.5rem 0;
}

.p-panel .p-panel-header {
  border: 1px solid #383838;
  padding: 1rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-panel .p-panel-header .p-panel-title {
  font-weight: 600;
}
.p-panel .p-panel-header .p-panel-header-icon {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-panel .p-panel-header .p-panel-header-icon:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-panel .p-panel-header .p-panel-header-icon:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-panel.p-panel-toggleable .p-panel-header {
  padding: 0.5rem 1rem;
}
.p-panel .p-panel-content {
  padding: 1rem;
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-top: 0 none;
}
.p-panel .p-panel-content:last-child {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-panel .p-panel-footer {
  padding: 0.5rem 1rem;
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 0 none;
}

.p-scrollpanel .p-scrollpanel-bar {
  background: #383838;
  border: 0 none;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-scrollpanel .p-scrollpanel-bar:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-splitter {
  border: 1px solid #383838;
  background: #1e1e1e;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.87);
}
.p-splitter .p-splitter-gutter {
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  background: rgba(255, 255, 255, 0.03);
}
.p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
  background: #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-splitter .p-splitter-gutter .p-splitter-gutter-handle:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-splitter .p-splitter-gutter-resizing {
  background: #383838;
}

.p-tabview .p-tabview-nav {
  background: transparent;
  border: 1px solid #383838;
  border-width: 0 0 2px 0;
}
.p-tabview .p-tabview-nav li {
  margin-right: 0;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid #383838;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #383838 transparent;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 1px #a7d8a9;
}
.p-tabview .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link {
  background: #1e1e1e;
  border-color: #81C784;
  color: rgba(255, 255, 255, 0.87);
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #1e1e1e;
  border-color: #81C784;
  color: #81C784;
}
.p-tabview .p-tabview-nav-btn.p-link {
  background: #1e1e1e;
  color: #81C784;
  width: 2.357rem;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0;
}
.p-tabview .p-tabview-nav-btn.p-link:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 1px #a7d8a9;
}
.p-tabview .p-tabview-panels {
  background: #1e1e1e;
  padding: 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.p-toolbar {
  background: #1e1e1e;
  border: 1px solid #383838;
  padding: 1rem;
  border-radius: 3px;
  gap: 0.5rem;
}
.p-toolbar .p-toolbar-separator {
  margin: 0 0.5rem;
}

.p-confirm-popup {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}
.p-confirm-popup .p-confirm-popup-content {
  padding: 1rem;
}
.p-confirm-popup .p-confirm-popup-footer {
  text-align: right;
  padding: 0 1rem 1rem 1rem;
}
.p-confirm-popup .p-confirm-popup-footer button {
  margin: 0 0.5rem 0 0;
  width: auto;
}
.p-confirm-popup .p-confirm-popup-footer button:last-child {
  margin: 0;
}
.p-confirm-popup:after {
  border: solid transparent;
  border-color: rgba(30, 30, 30, 0);
  border-bottom-color: #1e1e1e;
}
.p-confirm-popup:before {
  border: solid transparent;
  border-color: rgba(56, 56, 56, 0);
  border-bottom-color: #383838;
}
.p-confirm-popup.p-confirm-popup-flipped:after {
  border-top-color: #1e1e1e;
}
.p-confirm-popup.p-confirm-popup-flipped:before {
  border-top-color: #383838;
}
.p-confirm-popup .p-confirm-popup-icon {
  font-size: 1.5rem;
}
.p-confirm-popup .p-confirm-popup-icon.p-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.p-confirm-popup .p-confirm-popup-message {
  margin-left: 1rem;
}

.p-dialog {
  border-radius: 3px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid #383838;
}
.p-dialog .p-dialog-header {
  border-bottom: 0 none;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 1.5rem;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-dialog .p-dialog-header .p-dialog-title {
  font-weight: 600;
  font-size: 1.25rem;
}
.p-dialog .p-dialog-header .p-dialog-header-icon {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  margin-right: 0.5rem;
}
.p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-dialog .p-dialog-header .p-dialog-header-icon:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-dialog .p-dialog-header .p-dialog-header-icon:last-child {
  margin-right: 0;
}
.p-dialog .p-dialog-content {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 1.5rem 2rem 1.5rem;
}
.p-dialog .p-dialog-content:last-of-type {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-dialog .p-dialog-footer {
  border-top: 0 none;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  padding: 0 1.5rem 1.5rem 1.5rem;
  text-align: right;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-dialog .p-dialog-footer button {
  margin: 0 0.5rem 0 0;
  width: auto;
}
.p-dialog.p-confirm-dialog .p-confirm-dialog-icon {
  font-size: 2rem;
}
.p-dialog.p-confirm-dialog .p-confirm-dialog-message:not(:first-child) {
  margin-left: 1rem;
}

.p-overlaypanel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}
.p-overlaypanel .p-overlaypanel-content {
  padding: 1rem;
}
.p-overlaypanel .p-overlaypanel-close {
  background: #81C784;
  color: #212529;
  width: 2rem;
  height: 2rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 50%;
  position: absolute;
  top: -1rem;
  right: -1rem;
}
.p-overlaypanel .p-overlaypanel-close:enabled:hover {
  background: #6abd6e;
  color: #212529;
}
.p-overlaypanel:after {
  border: solid transparent;
  border-color: rgba(30, 30, 30, 0);
  border-bottom-color: #1e1e1e;
}
.p-overlaypanel:before {
  border: solid transparent;
  border-color: rgba(56, 56, 56, 0);
  border-bottom-color: #353535;
}
.p-overlaypanel.p-overlaypanel-flipped:after {
  border-top-color: #1e1e1e;
}
.p-overlaypanel.p-overlaypanel-flipped:before {
  border-top-color: #383838;
}

.p-sidebar {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}
.p-sidebar .p-sidebar-header {
  padding: 1rem;
}
.p-sidebar .p-sidebar-header .p-sidebar-close,
.p-sidebar .p-sidebar-header .p-sidebar-icon {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-sidebar .p-sidebar-header .p-sidebar-close:enabled:hover,
.p-sidebar .p-sidebar-header .p-sidebar-icon:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-sidebar .p-sidebar-header .p-sidebar-close:focus,
.p-sidebar .p-sidebar-header .p-sidebar-icon:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-sidebar .p-sidebar-header + .p-sidebar-content {
  padding-top: 0;
}
.p-sidebar .p-sidebar-content {
  padding: 1rem;
}

.p-tooltip .p-tooltip-text {
  background: #383838;
  color: rgba(255, 255, 255, 0.87);
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.p-tooltip.p-tooltip-right .p-tooltip-arrow {
  border-right-color: #383838;
}
.p-tooltip.p-tooltip-left .p-tooltip-arrow {
  border-left-color: #383838;
}
.p-tooltip.p-tooltip-top .p-tooltip-arrow {
  border-top-color: #383838;
}
.p-tooltip.p-tooltip-bottom .p-tooltip-arrow {
  border-bottom-color: #383838;
}

.p-fileupload .p-fileupload-buttonbar {
  background: #1e1e1e;
  padding: 1rem;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  border-bottom: 0 none;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  gap: 0.5rem;
}
.p-fileupload .p-fileupload-buttonbar .p-button.p-fileupload-choose.p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-fileupload .p-fileupload-content {
  background: #1e1e1e;
  padding: 2rem 1rem;
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-fileupload .p-fileupload-file {
  padding: 1rem;
  border: 1px solid #383838;
  border-radius: 3px;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.p-fileupload .p-fileupload-file:last-child {
  margin-bottom: 0;
}
.p-fileupload .p-fileupload-file-name {
  margin-bottom: 0.5rem;
}
.p-fileupload .p-fileupload-file-size {
  margin-right: 0.5rem;
}
.p-fileupload .p-progressbar {
  height: 0.25rem;
}
.p-fileupload .p-fileupload-row > div {
  padding: 1rem 1rem;
}
.p-fileupload.p-fileupload-advanced .p-message {
  margin-top: 0;
}

.p-fileupload-choose:not(.p-disabled):hover {
  background: #6abd6e;
  color: #212529;
  border-color: #6abd6e;
}
.p-fileupload-choose:not(.p-disabled):active {
  background: #54b358;
  color: #212529;
  border-color: #54b358;
}

.p-breadcrumb {
  background: #1e1e1e;
  border: 1px solid #383838;
  border-radius: 3px;
  padding: 1rem;
}
.p-breadcrumb .p-breadcrumb-list li .p-menuitem-link {
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-breadcrumb .p-breadcrumb-list li .p-menuitem-link:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-breadcrumb .p-breadcrumb-list li .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-breadcrumb .p-breadcrumb-list li .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-breadcrumb .p-breadcrumb-list li.p-menuitem-separator {
  margin: 0 0.5rem 0 0.5rem;
  color: rgba(255, 255, 255, 0.87);
}
.p-breadcrumb .p-breadcrumb-list li:last-child .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-breadcrumb .p-breadcrumb-list li:last-child .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
}

.p-contextmenu {
  padding: 0.25rem 0;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  width: 12.5rem;
}
.p-contextmenu .p-contextmenu-root-list {
  outline: 0 none;
}
.p-contextmenu .p-submenu-list {
  padding: 0.25rem 0;
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.p-contextmenu .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-contextmenu .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-contextmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-contextmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-contextmenu .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-contextmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-contextmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-contextmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-contextmenu .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}
.p-contextmenu .p-submenu-icon {
  font-size: 0.875rem;
}
.p-contextmenu .p-submenu-icon.p-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.p-dock .p-dock-list-container {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
}
.p-dock .p-dock-list-container .p-dock-list {
  outline: 0 none;
}
.p-dock .p-dock-item {
  padding: 0.5rem;
  border-radius: 3px;
}
.p-dock .p-dock-item.p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.15rem #a7d8a9;
}
.p-dock .p-dock-link {
  width: 4rem;
  height: 4rem;
}
.p-dock.p-dock-top .p-dock-item-second-prev,
.p-dock.p-dock-top .p-dock-item-second-next, .p-dock.p-dock-bottom .p-dock-item-second-prev,
.p-dock.p-dock-bottom .p-dock-item-second-next {
  margin: 0 0.9rem;
}
.p-dock.p-dock-top .p-dock-item-prev,
.p-dock.p-dock-top .p-dock-item-next, .p-dock.p-dock-bottom .p-dock-item-prev,
.p-dock.p-dock-bottom .p-dock-item-next {
  margin: 0 1.3rem;
}
.p-dock.p-dock-top .p-dock-item-current, .p-dock.p-dock-bottom .p-dock-item-current {
  margin: 0 1.5rem;
}
.p-dock.p-dock-left .p-dock-item-second-prev,
.p-dock.p-dock-left .p-dock-item-second-next, .p-dock.p-dock-right .p-dock-item-second-prev,
.p-dock.p-dock-right .p-dock-item-second-next {
  margin: 0.9rem 0;
}
.p-dock.p-dock-left .p-dock-item-prev,
.p-dock.p-dock-left .p-dock-item-next, .p-dock.p-dock-right .p-dock-item-prev,
.p-dock.p-dock-right .p-dock-item-next {
  margin: 1.3rem 0;
}
.p-dock.p-dock-left .p-dock-item-current, .p-dock.p-dock-right .p-dock-item-current {
  margin: 1.5rem 0;
}

@media screen and (max-width: 960px) {
  .p-dock.p-dock-top .p-dock-list-container, .p-dock.p-dock-bottom .p-dock-list-container {
    overflow-x: auto;
    width: 100%;
  }
  .p-dock.p-dock-top .p-dock-list-container .p-dock-list, .p-dock.p-dock-bottom .p-dock-list-container .p-dock-list {
    margin: 0 auto;
  }
  .p-dock.p-dock-left .p-dock-list-container, .p-dock.p-dock-right .p-dock-list-container {
    overflow-y: auto;
    height: 100%;
  }
  .p-dock.p-dock-left .p-dock-list-container .p-dock-list, .p-dock.p-dock-right .p-dock-list-container .p-dock-list {
    margin: auto 0;
  }
  .p-dock .p-dock-list .p-dock-item {
    transform: none;
    margin: 0;
  }
}
.p-megamenu {
  padding: 0.5rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
}
.p-megamenu .p-megamenu-root-list {
  outline: 0 none;
}
.p-megamenu .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-megamenu .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-megamenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-megamenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-megamenu .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-megamenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-megamenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-megamenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu .p-megamenu-panel {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-megamenu .p-submenu-header {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-megamenu .p-submenu-list {
  padding: 0.25rem 0;
  width: 12.5rem;
}
.p-megamenu .p-submenu-list .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}
.p-megamenu.p-megamenu-vertical {
  width: 12.5rem;
  padding: 0.25rem 0;
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}

.p-menu {
  padding: 0.25rem 0;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  width: 12.5rem;
}
.p-menu .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-menu .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-menu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-menu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-menu .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-menu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-menu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-menu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menu.p-menu-overlay {
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-menu .p-submenu-header {
  margin: 0;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  font-weight: 600;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.p-menu .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}

.p-menubar {
  padding: 0.5rem;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
}
.p-menubar .p-menubar-root-list {
  outline: 0 none;
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 3px;
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}
.p-menubar .p-menubar-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-menubar .p-menubar-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menubar-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-menubar .p-menubar-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-menubar .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-menubar .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-menubar .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-menubar .p-submenu-list {
  padding: 0.25rem 0;
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  width: 12.5rem;
}
.p-menubar .p-submenu-list .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}
.p-menubar .p-submenu-list .p-submenu-icon {
  font-size: 0.875rem;
}

@media screen and (max-width: 960px) {
  .p-menubar {
    position: relative;
  }
  .p-menubar .p-menubar-button {
    display: flex;
    width: 2rem;
    height: 2rem;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .p-menubar .p-menubar-button:hover {
    color: rgba(255, 255, 255, 0.87);
    background: rgba(255, 255, 255, 0.03);
  }
  .p-menubar .p-menubar-button:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 1px #a7d8a9;
  }
  .p-menubar .p-menubar-root-list {
    position: absolute;
    display: none;
    padding: 0.25rem 0;
    background: #1e1e1e;
    border: 1px solid #383838;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    width: 100%;
  }
  .p-menubar .p-menubar-root-list .p-menuitem-separator {
    border-top: 1px solid #383838;
    margin: 0.25rem 0;
  }
  .p-menubar .p-menubar-root-list .p-submenu-icon {
    font-size: 0.875rem;
  }
  .p-menubar .p-menubar-root-list .p-menuitem {
    width: 100%;
    position: static;
  }
  .p-menubar .p-menubar-root-list .p-menuitem .p-menuitem-content .p-menuitem-link .p-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
  }
  .p-menubar .p-menubar-root-list .p-menuitem.p-menuitem-active > .p-menuitem-content > .p-menuitem-link > .p-submenu-icon {
    transform: rotate(-180deg);
  }
  .p-menubar .p-menubar-root-list .p-submenu-list {
    width: 100%;
    position: static;
    box-shadow: none;
    border: 0 none;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem-active > .p-menuitem-content > .p-menuitem-link > .p-submenu-icon {
    transform: rotate(-90deg);
  }
  .p-menubar .p-menubar-root-list .p-menuitem {
    width: 100%;
    position: static;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link {
    padding-left: 2.25rem;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link {
    padding-left: 3.75rem;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link {
    padding-left: 5.25rem;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link {
    padding-left: 6.75rem;
  }
  .p-menubar .p-menubar-root-list .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-submenu-list .p-menuitem .p-menuitem-content .p-menuitem-link {
    padding-left: 8.25rem;
  }
  .p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 1;
  }
}
.p-panelmenu .p-panelmenu-header {
  outline: 0 none;
}
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
  border: 1px solid #383838;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  border-radius: 3px;
  transition: box-shadow 0.2s;
}
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action {
  color: rgba(255, 255, 255, 0.87);
  padding: 1rem;
  font-weight: 600;
}
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action .p-submenu-icon {
  margin-right: 0.5rem;
}
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action .p-menuitem-icon {
  margin-right: 0.5rem;
}
.p-panelmenu .p-panelmenu-header:not(.p-disabled):focus .p-panelmenu-header-content {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 1px #a7d8a9;
}
.p-panelmenu .p-panelmenu-header:not(.p-highlight):not(.p-disabled):hover .p-panelmenu-header-content {
  background: rgba(255, 255, 255, 0.03);
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-header:not(.p-disabled).p-highlight .p-panelmenu-header-content {
  background: #1e1e1e;
  border-color: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  margin-bottom: 0;
}
.p-panelmenu .p-panelmenu-header:not(.p-disabled).p-highlight:hover .p-panelmenu-header-content {
  border-color: #383838;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content {
  padding: 0.25rem 0;
  border: 1px solid #383838;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-panelmenu .p-panelmenu-content .p-panelmenu-root-list {
  outline: 0 none;
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-panelmenu .p-panelmenu-content .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-panelmenu .p-panelmenu-content .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-panelmenu .p-panelmenu-content .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-panelmenu .p-panelmenu-content .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  margin-right: 0.5rem;
}
.p-panelmenu .p-panelmenu-content .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}
.p-panelmenu .p-panelmenu-content .p-submenu-list:not(.p-panelmenu-root-list) {
  padding: 0 0 0 1rem;
}
.p-panelmenu .p-panelmenu-panel {
  margin-bottom: 0;
}
.p-panelmenu .p-panelmenu-panel .p-panelmenu-header .p-panelmenu-header-content {
  border-radius: 0;
}
.p-panelmenu .p-panelmenu-panel .p-panelmenu-content {
  border-radius: 0;
}
.p-panelmenu .p-panelmenu-panel:not(:first-child) .p-panelmenu-header .p-panelmenu-header-content {
  border-top: 0 none;
}
.p-panelmenu .p-panelmenu-panel:not(:first-child) .p-panelmenu-header:not(.p-highlight):not(.p-disabled):hover .p-panelmenu-header-content, .p-panelmenu .p-panelmenu-panel:not(:first-child) .p-panelmenu-header:not(.p-disabled).p-highlight:hover .p-panelmenu-header-content {
  border-top: 0 none;
}
.p-panelmenu .p-panelmenu-panel:first-child .p-panelmenu-header .p-panelmenu-header-content {
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.p-panelmenu .p-panelmenu-panel:last-child .p-panelmenu-header:not(.p-highlight) .p-panelmenu-header-content {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.p-panelmenu .p-panelmenu-panel:last-child .p-panelmenu-content {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.p-steps .p-steps-item .p-menuitem-link {
  background: transparent;
  transition: box-shadow 0.2s;
  border-radius: 3px;
  background: transparent;
}
.p-steps .p-steps-item .p-menuitem-link .p-steps-number {
  color: rgba(255, 255, 255, 0.87);
  border: 0 none;
  background: transparent;
  min-width: 2rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.143rem;
  z-index: 1;
  border-radius: 50%;
}
.p-steps .p-steps-item .p-menuitem-link .p-steps-title {
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-steps .p-steps-item .p-menuitem-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-steps .p-steps-item.p-highlight .p-steps-number {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-steps .p-steps-item.p-highlight .p-steps-title {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
}
.p-steps .p-steps-item:before {
  content: " ";
  border-top: 1px solid #383838;
  width: 100%;
  top: 50%;
  left: 0;
  display: block;
  position: absolute;
  margin-top: -1rem;
}

.p-tabmenu .p-tabmenu-nav {
  background: transparent;
  border: 1px solid #383838;
  border-width: 0 0 2px 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem {
  margin-right: 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border: solid #383838;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #383838 transparent;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link .p-menuitem-icon {
  margin-right: 0.5rem;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 1px #a7d8a9;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover .p-menuitem-link {
  background: #1e1e1e;
  border-color: #81C784;
  color: rgba(255, 255, 255, 0.87);
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: #1e1e1e;
  border-color: #81C784;
  color: #81C784;
}

.p-tieredmenu {
  padding: 0.25rem 0;
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-radius: 3px;
  width: 12.5rem;
}
.p-tieredmenu.p-tieredmenu-overlay {
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-tieredmenu .p-tieredmenu-root-list {
  outline: 0 none;
}
.p-tieredmenu .p-submenu-list {
  padding: 0.25rem 0;
  background: #1e1e1e;
  border: 1px solid #383838;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
.p-tieredmenu .p-menuitem > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}
.p-tieredmenu .p-menuitem > .p-menuitem-content .p-menuitem-link {
  color: rgba(255, 255, 255, 0.87);
  padding: 0.75rem 1rem;
  user-select: none;
}
.p-tieredmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}
.p-tieredmenu .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.6);
}
.p-tieredmenu .p-menuitem.p-highlight > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-tieredmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-tieredmenu .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem.p-highlight.p-focus > .p-menuitem-content {
  background: rgba(255, 255, 255, 0.03);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.09);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-menuitem-icon, .p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 255, 255, 0.03);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-icon, .p-tieredmenu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-submenu-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-tieredmenu .p-menuitem-separator {
  border-top: 1px solid #383838;
  margin: 0.25rem 0;
}
.p-tieredmenu .p-submenu-icon {
  font-size: 0.875rem;
}
.p-tieredmenu .p-submenu-icon.p-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.p-inline-message {
  padding: 0.5rem 0.5rem;
  margin: 0;
  border-radius: 3px;
}
.p-inline-message.p-inline-message-info {
  background: #B3E5FC;
  border: solid #0891cf;
  border-width: 1px;
  color: #044868;
}
.p-inline-message.p-inline-message-info .p-inline-message-icon {
  color: #044868;
}
.p-inline-message.p-inline-message-success {
  background: #C8E6C9;
  border: solid #439446;
  border-width: 1px;
  color: #224a23;
}
.p-inline-message.p-inline-message-success .p-inline-message-icon {
  color: #224a23;
}
.p-inline-message.p-inline-message-warn {
  background: #FFECB3;
  border: solid #d9a300;
  border-width: 1px;
  color: #6d5100;
}
.p-inline-message.p-inline-message-warn .p-inline-message-icon {
  color: #6d5100;
}
.p-inline-message.p-inline-message-error {
  background: #FFCDD2;
  border: solid #e60017;
  border-width: 1px;
  color: #73000c;
}
.p-inline-message.p-inline-message-error .p-inline-message-icon {
  color: #73000c;
}
.p-inline-message .p-inline-message-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.p-inline-message .p-inline-message-text {
  font-size: 1rem;
}
.p-inline-message.p-inline-message-icon-only .p-inline-message-icon {
  margin-right: 0;
}

.p-message {
  margin: 1rem 0;
  border-radius: 3px;
}
.p-message .p-message-wrapper {
  padding: 1rem 1.5rem;
}
.p-message .p-message-close {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-message .p-message-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.p-message .p-message-close:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-message.p-message-info {
  background: #B3E5FC;
  border: solid #0891cf;
  border-width: 0 0 0 6px;
  color: #044868;
}
.p-message.p-message-info .p-message-icon {
  color: #044868;
}
.p-message.p-message-info .p-message-close {
  color: #044868;
}
.p-message.p-message-success {
  background: #C8E6C9;
  border: solid #439446;
  border-width: 0 0 0 6px;
  color: #224a23;
}
.p-message.p-message-success .p-message-icon {
  color: #224a23;
}
.p-message.p-message-success .p-message-close {
  color: #224a23;
}
.p-message.p-message-warn {
  background: #FFECB3;
  border: solid #d9a300;
  border-width: 0 0 0 6px;
  color: #6d5100;
}
.p-message.p-message-warn .p-message-icon {
  color: #6d5100;
}
.p-message.p-message-warn .p-message-close {
  color: #6d5100;
}
.p-message.p-message-error {
  background: #FFCDD2;
  border: solid #e60017;
  border-width: 0 0 0 6px;
  color: #73000c;
}
.p-message.p-message-error .p-message-icon {
  color: #73000c;
}
.p-message.p-message-error .p-message-close {
  color: #73000c;
}
.p-message .p-message-text {
  font-size: 1rem;
  font-weight: 500;
}
.p-message .p-message-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
.p-message .p-icon:not(.p-message-close-icon) {
  width: 1.5rem;
  height: 1.5rem;
}

.p-toast {
  opacity: 0.9;
}
.p-toast .p-toast-message {
  margin: 0 0 1rem 0;
  box-shadow: none;
  border-radius: 3px;
}
.p-toast .p-toast-message .p-toast-message-content {
  padding: 1rem;
  border-width: 0 0 0 6px;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-message-text {
  margin: 0 0 0 1rem;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-message-icon {
  font-size: 2rem;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-message-icon.p-icon {
  width: 2rem;
  height: 2rem;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-summary {
  font-weight: 700;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-detail {
  margin: 0.5rem 0 0 0;
}
.p-toast .p-toast-message .p-toast-icon-close {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-toast .p-toast-message .p-toast-icon-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.p-toast .p-toast-message .p-toast-icon-close:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}
.p-toast .p-toast-message.p-toast-message-info {
  background: #B3E5FC;
  border: solid #0891cf;
  border-width: 0 0 0 6px;
  color: #044868;
}
.p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon,
.p-toast .p-toast-message.p-toast-message-info .p-toast-icon-close {
  color: #044868;
}
.p-toast .p-toast-message.p-toast-message-success {
  background: #C8E6C9;
  border: solid #439446;
  border-width: 0 0 0 6px;
  color: #224a23;
}
.p-toast .p-toast-message.p-toast-message-success .p-toast-message-icon,
.p-toast .p-toast-message.p-toast-message-success .p-toast-icon-close {
  color: #224a23;
}
.p-toast .p-toast-message.p-toast-message-warn {
  background: #FFECB3;
  border: solid #d9a300;
  border-width: 0 0 0 6px;
  color: #6d5100;
}
.p-toast .p-toast-message.p-toast-message-warn .p-toast-message-icon,
.p-toast .p-toast-message.p-toast-message-warn .p-toast-icon-close {
  color: #6d5100;
}
.p-toast .p-toast-message.p-toast-message-error {
  background: #FFCDD2;
  border: solid #e60017;
  border-width: 0 0 0 6px;
  color: #73000c;
}
.p-toast .p-toast-message.p-toast-message-error .p-toast-message-icon,
.p-toast .p-toast-message.p-toast-message-error .p-toast-icon-close {
  color: #73000c;
}

.p-galleria .p-galleria-close {
  margin: 0.5rem;
  background: transparent;
  color: #f8f9fa;
  width: 4rem;
  height: 4rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 50%;
}
.p-galleria .p-galleria-close .p-galleria-close-icon {
  font-size: 2rem;
}
.p-galleria .p-galleria-close .p-icon {
  width: 2rem;
  height: 2rem;
}
.p-galleria .p-galleria-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f8f9fa;
}
.p-galleria .p-galleria-item-nav {
  background: transparent;
  color: #f8f9fa;
  width: 4rem;
  height: 4rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
  margin: 0 0.5rem;
}
.p-galleria .p-galleria-item-nav .p-galleria-item-prev-icon,
.p-galleria .p-galleria-item-nav .p-galleria-item-next-icon {
  font-size: 2rem;
}
.p-galleria .p-galleria-item-nav .p-icon {
  width: 2rem;
  height: 2rem;
}
.p-galleria .p-galleria-item-nav:not(.p-disabled):hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f8f9fa;
}
.p-galleria .p-galleria-caption {
  background: rgba(0, 0, 0, 0.5);
  color: #f8f9fa;
  padding: 1rem;
}
.p-galleria .p-galleria-indicators {
  padding: 1rem;
}
.p-galleria .p-galleria-indicators .p-galleria-indicator button {
  background-color: #383838;
  width: 1rem;
  height: 1rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 50%;
}
.p-galleria .p-galleria-indicators .p-galleria-indicator button:hover {
  background: #4c4c4c;
}
.p-galleria .p-galleria-indicators .p-galleria-indicator.p-highlight button {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-galleria.p-galleria-indicators-bottom .p-galleria-indicator, .p-galleria.p-galleria-indicators-top .p-galleria-indicator {
  margin-right: 0.5rem;
}
.p-galleria.p-galleria-indicators-left .p-galleria-indicator, .p-galleria.p-galleria-indicators-right .p-galleria-indicator {
  margin-bottom: 0.5rem;
}
.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators {
  background: rgba(0, 0, 0, 0.5);
}
.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators .p-galleria-indicator button {
  background: rgba(255, 255, 255, 0.4);
}
.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators .p-galleria-indicator button:hover {
  background: rgba(255, 255, 255, 0.6);
}
.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators .p-galleria-indicator.p-highlight button {
  background: rgba(129, 199, 132, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-galleria .p-galleria-thumbnail-container {
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem 0.25rem;
}
.p-galleria .p-galleria-thumbnail-container .p-galleria-thumbnail-prev,
.p-galleria .p-galleria-thumbnail-container .p-galleria-thumbnail-next {
  margin: 0.5rem;
  background-color: transparent;
  color: #f8f9fa;
  width: 2rem;
  height: 2rem;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 50%;
}
.p-galleria .p-galleria-thumbnail-container .p-galleria-thumbnail-prev:hover,
.p-galleria .p-galleria-thumbnail-container .p-galleria-thumbnail-next:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f8f9fa;
}
.p-galleria .p-galleria-thumbnail-container .p-galleria-thumbnail-item-content:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-galleria-mask {
  --maskbg: rgba(0, 0, 0, 0.9);
}

.p-image-mask {
  --maskbg: rgba(0, 0, 0, 0.9);
}

.p-image-preview-indicator {
  background-color: transparent;
  color: #f8f9fa;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-image-preview-indicator .p-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.p-image-preview-container:hover > .p-image-preview-indicator {
  background-color: rgba(0, 0, 0, 0.5);
}

.p-image-toolbar {
  padding: 1rem;
}

.p-image-action.p-link {
  color: #f8f9fa;
  background-color: transparent;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  margin-right: 0.5rem;
}
.p-image-action.p-link:last-child {
  margin-right: 0;
}
.p-image-action.p-link:hover {
  color: #f8f9fa;
  background-color: rgba(255, 255, 255, 0.1);
}
.p-image-action.p-link i {
  font-size: 1.5rem;
}
.p-image-action.p-link .p-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.p-avatar {
  background-color: #383838;
  border-radius: 3px;
}
.p-avatar.p-avatar-lg {
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
}
.p-avatar.p-avatar-lg .p-avatar-icon {
  font-size: 1.5rem;
}
.p-avatar.p-avatar-xl {
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
}
.p-avatar.p-avatar-xl .p-avatar-icon {
  font-size: 2rem;
}

.p-avatar-group .p-avatar {
  border: 2px solid #1e1e1e;
}

.p-badge {
  background: #81C784;
  color: #212529;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
}
.p-badge.p-badge-secondary {
  background-color: #78909C;
  color: #ffffff;
}
.p-badge.p-badge-success {
  background-color: #C5E1A5;
  color: #121212;
}
.p-badge.p-badge-info {
  background-color: #81D4FA;
  color: #121212;
}
.p-badge.p-badge-warning {
  background-color: #FFE082;
  color: #121212;
}
.p-badge.p-badge-danger {
  background-color: #F48FB1;
  color: #121212;
}
.p-badge.p-badge-lg {
  font-size: 1.125rem;
  min-width: 2.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
}
.p-badge.p-badge-xl {
  font-size: 1.5rem;
  min-width: 3rem;
  height: 3rem;
  line-height: 3rem;
}

.p-chip {
  background-color: #383838;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 16px;
  padding: 0 0.5rem;
}
.p-chip .p-chip-text {
  line-height: 1.5;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.p-chip .p-chip-icon {
  margin-right: 0.5rem;
}
.p-chip img {
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
  margin-right: 0.5rem;
}
.p-chip .p-chip-remove-icon {
  margin-left: 0.5rem;
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-chip .p-chip-remove-icon:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-inplace .p-inplace-display {
  padding: 0.5rem 0.5rem;
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-inplace .p-inplace-display:not(.p-disabled):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-inplace .p-inplace-display:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #a7d8a9;
}

.p-progressbar {
  border: 0 none;
  height: 1.5rem;
  background: #383838;
  border-radius: 3px;
}
.p-progressbar .p-progressbar-value {
  border: 0 none;
  margin: 0;
  background: #81C784;
}
.p-progressbar .p-progressbar-label {
  color: #212529;
  line-height: 1.5rem;
}

.p-progress-spinner-svg {
  animation: p-progress-spinner-rotate 2s linear infinite;
}

.p-progress-spinner-circle {
  stroke-dasharray: 89, 200;
  stroke-dashoffset: 0;
  stroke: #73000c;
  animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes p-progress-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes p-progress-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes p-progress-spinner-color {
  100%, 0% {
    stroke: #73000c;
  }
  40% {
    stroke: #044868;
  }
  66% {
    stroke: #224a23;
  }
  80%, 90% {
    stroke: #6d5100;
  }
}
.p-scrolltop {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.p-scrolltop.p-link {
  background: rgba(129, 199, 132, 0.16);
}
.p-scrolltop.p-link:hover {
  background: rgba(129, 199, 132, 0.3616);
}
.p-scrolltop .p-scrolltop-icon {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.87);
}
.p-scrolltop .p-scrolltop-icon.p-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.p-skeleton {
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
}
.p-skeleton:after {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0));
}

.p-tag {
  background: #81C784;
  color: #212529;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
}
.p-tag.p-tag-success {
  background-color: #C5E1A5;
  color: #121212;
}
.p-tag.p-tag-info {
  background-color: #81D4FA;
  color: #121212;
}
.p-tag.p-tag-warning {
  background-color: #FFE082;
  color: #121212;
}
.p-tag.p-tag-danger {
  background-color: #F48FB1;
  color: #121212;
}
.p-tag .p-tag-icon {
  margin-right: 0.25rem;
  font-size: 0.75rem;
}
.p-tag .p-tag-icon.p-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.p-terminal {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  padding: 1rem;
}
.p-terminal .p-terminal-input {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

/* Customizations to the designer theme should be defined here */
.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
  background-color: #81C784;
}

.p-galleria .p-galleria-indicators .p-galleria-indicator.p-highlight button {
  background-color: #81C784;
}
.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators .p-galleria-indicator.p-highlight button {
  background: #81C784;
}

.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
  box-shadow: inset 0 2px 0 0 #81C784;
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
  box-shadow: inset 0 -2px 0 0 #81C784;
}
`));

// /home/jani/devel/web/bun-aniversary/.buchta/output/main-dDKCrIs.js
var sfc = {
  __name: "main",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
};
var stylev0u5ep = document.createElement("style");
stylev0u5ep.innerHTML = `
div[data-v-v0u5ep] {
    margin: 25px;
}
`;
document.head.appendChild(stylev0u5ep);
var main_dDKCrIs_default = sfc;

// node_modules/primevue/card/card.esm.js
var render3 = function(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({ class: "p-card p-component" }, _ctx.ptm("root")), [
    _ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
      key: 0,
      class: "p-card-header"
    }, _ctx.ptm("header")), [
      renderSlot(_ctx.$slots, "header")
    ], 16)) : createCommentVNode("", true),
    createBaseVNode("div", mergeProps({ class: "p-card-body" }, _ctx.ptm("body")), [
      _ctx.$slots.title ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: "p-card-title"
      }, _ctx.ptm("title")), [
        renderSlot(_ctx.$slots, "title")
      ], 16)) : createCommentVNode("", true),
      _ctx.$slots.subtitle ? (openBlock(), createElementBlock("div", mergeProps({
        key: 1,
        class: "p-card-subtitle"
      }, _ctx.ptm("subtitle")), [
        renderSlot(_ctx.$slots, "subtitle")
      ], 16)) : createCommentVNode("", true),
      createBaseVNode("div", mergeProps({ class: "p-card-content" }, _ctx.ptm("content")), [
        renderSlot(_ctx.$slots, "content")
      ], 16),
      _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
        key: 2,
        class: "p-card-footer"
      }, _ctx.ptm("footer")), [
        renderSlot(_ctx.$slots, "footer")
      ], 16)) : createCommentVNode("", true)
    ], 16)
  ], 16);
};
var script5 = {
  name: "Card",
  extends: script
};
script5.render = render3;

// /home/jani/devel/web/bun-aniversary/.buchta/output/card-cywJFsq.js
var _hoisted_13 = ["src"];
var sfc2 = {
  __name: "card",
  props: [
    "title",
    "description",
    "imgUrl"
  ],
  setup(__props) {
    const props = __props;
    const child = ref(null);
    onMounted(() => {
      child.value.setAttribute("width", "100%");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(script5), null, {
        header: withCtx(() => [
          createBaseVNode("img", {
            alt: "Background",
            src: props.imgUrl,
            ref_key: "child",
            ref: child
          }, null, 8, _hoisted_13)
        ]),
        title: withCtx(() => [
          createTextVNode(toDisplayString(props.title), 1)
        ]),
        content: withCtx(() => [
          createTextVNode(toDisplayString(props.description), 1)
        ]),
        _: 1
      });
    };
  }
};
var card_cywJFsq_default = sfc2;

// /home/jani/devel/web/bun-aniversary/.buchta/output/index-TmXSvk9.js
var _hoisted_14 = createBaseVNode("div", { class: "title" }, [
  createBaseVNode("h1", null, "Hello, Bun! Thanks for the fun year we had with you all this time \uD83D\uDC96"),
  createBaseVNode("h2", null, "Thanks Jarred Sumner and everyone at Oven.sh for such amazing project!"),
  createBaseVNode("div", { style: { "padding-top": "25px" } }),
  createBaseVNode("h2", null, "Let's look at what Bun community has made so far")
], -1);
var _hoisted_22 = { class: "grd" };
var _hoisted_32 = ["href"];
var sfc3 = {
  __name: "index",
  setup(__props) {
    const data = reactive([]);
    function sleep(ms) {
      return new Promise((resolve2) => setTimeout(resolve2, ms));
    }
    onMounted(async () => {
      const req = await fetch("./projects-WA3Uno5.json");
      const json = await req.json();
      for (const item of json) {
        data.push(item);
        await sleep(250);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(main_dDKCrIs_default, null, {
        default: withCtx(() => [
          _hoisted_14,
          createBaseVNode("div", _hoisted_22, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(data, (project) => {
              return openBlock(), createElementBlock("a", {
                href: project.url
              }, [
                createVNode(card_cywJFsq_default, {
                  title: project.name,
                  description: project.description,
                  imgUrl: project.img,
                  style: { height: "100%" }
                }, null, 8, ["title", "description", "imgUrl"])
              ], 8, _hoisted_32);
            }), 256))
          ])
        ]),
        _: 1
      });
    };
  }
};
var stylevvmhuG = document.createElement("style");
stylevvmhuG.innerHTML = `
@font-face {
        font-family: "IBM Plex Sans";
        src: url("./IBMPlexSans-Regular-veEHcMb.ttf");
}
body {
        margin: 0;
        padding: 0;
        padding-left: 25px;
        padding-right: 25px;
        background-color: var(--surface-ground);
}
* {
        font-family: 'IBM Plex Sans', sans-serif;
        text-decoration: none;
}
.title {
        text-align: center;
}
.grd {
        display: grid;
        width: inherit;
        grid-template-columns: auto;
        grid-gap: 25px;
        animation: fadein 777ms linear;
}
@media only screen and (min-width: 600px) {
.grd {
            grid-template-columns: repeat(2, auto);
}
}
@media only screen and (min-width: 900px) {
.grd {
            grid-template-columns: repeat(3, auto);
}
}
@keyframes fadein {
0% { opacity: 0%;}
100% { opacit: 100%;
}
}
`;
document.head.appendChild(stylevvmhuG);
var a = createSSRApp(sfc3);
a.use(PrimeVue, { ripple: true });
a.mount("#__buchta");
