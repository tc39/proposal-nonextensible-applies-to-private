class Trojan {
  constructor(key) {
    return key;
  }
}

const makeHiddenWeakMap = () => {
  const tombstone = Symbol('deleted');
  class PrivateTagger extends Trojan {
    #value;
    constructor(key, value) {
      super(key);
      this.#value = value;
    }

    static HiddenWeakMap = class {
      set(key, value) { new PrivateTagger(key, value); }

      has(key) {
        try {
          return key.#value !== tombstone;
        } catch { return false; }
      }
      get(key) {
        try {
          const value = key.#value;
          return value === tombstone ? undefined : value;
        } catch { return undefined; }
      }
      delete(key) {
        if (this.has(key)) {
          key.#value = tombstone;
          return true;
        }
        return false;
      }
    }
  };
  return PrivateTagger.HiddenWeakMap;
}
