class Trojan {
  constructor(key) { return key; }
}

class Tagger extends Trojan {
  #value;

  constructor(key, value) {
    super(key);
    this.#value = value;
  }
}

// struct instances born sealed
new Tagger(struct, 'a'); // adds #value to struct anyway
