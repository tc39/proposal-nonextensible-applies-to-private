export class C {
  static #FOO = "#FOO";
  static {
    C.#FOO = #BAR in C;
  }
  static #BAR = C.#FOO;
  static {
    Object.freeze(C);
  }
}
