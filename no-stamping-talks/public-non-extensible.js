class FrozenBase {
  constructor() {
    Object.freeze(this);
  }
}

class AddsProperty extends FrozenBase {
  _val;

  constructor(v) {
    super();
    this._val = v;
  }
}

// throws TypeError
new AddsProperty(42);

class AddsPrivateField extends FrozenBase {
  #val;

  constructor(v) {
    super();
    this.#val = v;
  }
}

// doesn’t throw
new AddsPrivateField(42);
