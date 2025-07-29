class Trojan {
  constructor(key) { return key; }
}
class Tagger extends Trojan {
  #value;
  constructor(key, value) {
    super(key);
    this.#value = value;
  }
  static getOrThrow(obj) {
    return obj.#value;
  }
}

// struct instances born sealed
new Tagger(struct, 'a'); // throws TypeError
Tagger.getOrThrow(struct); // throws TypeError
