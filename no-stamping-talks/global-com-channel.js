class ReturnOverrideClass {
  constructor(key) { return key; }
}

class HiddenWeakMap extends ReturnOverrideClass {
  #value;

  constructor(key, value) {
    super(key);
    this.#value = value;
  }

  static get(hwm) {
    return hwn.#value;
  }
}
harden(HiddenWeakMap);

// HardenedJS builtins all frozen
new HiddenWeakMap(Object, Date);

// in separate compartment
HiddenWeakMap.get(Object); // Date or not.
// Where's the mutability?
