export class C {
  static #FOO = "#FOO";
  static #_ = (() => C.#FOO = #BAR in C)();
  static #BAR = (() => C.#FOO)();
  static #_2 = (() => Object.freeze(C))();
}
