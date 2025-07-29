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

// vRep1 born frozen
new Tagger(vRep1, 'a'); // throws TypeError
Tagger.getOrThrow(vRep1); // throws TypeError
// vRep1 gc'ed. Revived as frozen vRep2
Tagger.getOrThrow(vRep2); // throws TypeError
