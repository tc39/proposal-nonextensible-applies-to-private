# Disallow Adding New Private Fields to Non-extensible Objects

Stage: 0
Champions: Mark Miller, Shu-yu Guo

## Background

A JavaScript object is [extensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) if new properties can be added to it. Objects are born extensible, and may be made non-extensible by [`Object.preventExtensions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions). Being made non-extensible is one way. Once non-extensible, an object cannot become extensible again.

[Private fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) do not respect objects' extensibility. They can be added to any object.

For example, the following snippet works.

```javascript
class NonExtensibleBase {
  constructor() {
    Object.preventExtensions(this);
  }
}

class ClassWithPrivateField extends NonExtensibleBase {
  #val;

  constructor(v) {
    super();
    this.#val = v;
  }
}

new ClassWithPrivateField(42); // doesn't throw
```

Contrast it with using properties, which doesn't work.

```javascript
class ClassWithProperty extends NonExtensibleBase {
  _val;

  constructor(v) {
    super();
    this._val = v;
  }
}

new ClassWithProperty(42); // throws TypeError
```

## Proposal

This proposal proposes to change the behavior of non-extensibility to also apply to private fields. That is, to make it so that private fields cannot be added to non-extensible objects.

For the above example, that means `new ClassWithPrivateField(42)` would throw a `TypeError`, exactly like `new ClassWithProperty(42)`.

## Motivation: fixed layout guarantee

The [JS structs proposal](https://github.com/tc39/proposal-structs/) and the [JS interop for WasmGC proposal](https://github.com/WebAssembly/custom-descriptors/blob/main/proposals/custom-descriptors/Overview.md) are adding fixed layout objects. Specifically, fixed layout means that once an object is constructed, its layout in memory is immutable.

The closest notion the JS language has to fixed layout is being [sealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal), which implies non-extensibility. However, this has the notable exception of private fields not respecting non-extensibility. This proposal addresses the issue by proposing to change non-extensibility to mean fixed layout, inclusive of private fields.

While private fields can be implemented with out-of-line storage outside of the object that contains it (by using a `WeakMap`) doing so is inefficient and slow. Performant JS engines implement private fields as in-line in the object, much like properties.

The champions also contend the use of private fields suggests in-line storage, given its syntactic similarity to properties. Private fields' usage in the normal case (ignoring meta-object protocol manipulation like getting property descriptors) also exactly mirror the usage of properties, suggesting that extending extensibility to be inclusive of private fields would match developer intuition.

## Web compatibility

Private fields have shipped with the extensibility-disrespecting behavior from the beginning. Therefore there is a non-zero chance that the proposed change is not web compatible. To that end, Chrome has a [use counter](https://chromestatus.com/metrics/feature/timeline/popularity/5209) tracking occurrences of extending non-extensible objects with private fields in the wild.

## Alternative

If this proposed change is not web compatible, the alternative design is to make a new integrity trait called "fixed shape", which implies non-extensibility and also prevents private fields from being added. This new trait would be exposed via `Object.makeFixedShape()` and `Object.isFixedShape()`.

This is less ergonomic for the developer, as the champions contend it is already developer intuition that non-extensibility ought to include private fields.

This is also less desirable for implementation, as it requires objects to track another bit in addition to extensibility to see if new private fields may be added.
