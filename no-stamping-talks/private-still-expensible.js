class NonExtensibleBase {
  constructor() {
    Object.preventExtensions(this);
  }
}

class ClassWithPrivateField
                    extends NonExtensibleBase {
  #val;

  constructor(v) {
    super();
    this.#val = v;
  }
}

new ClassWithPrivateField(42); // doesn't throw
