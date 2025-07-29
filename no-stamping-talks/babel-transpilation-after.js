export class C {
  static __last_static_block__ = () => {
    delete C.__last_static_block__;
    Object.freeze(C);
  };
  static #FOO = "#FOO";
  static #BAR = (() => (C.#FOO = #BAR in C, C.#FOO))();
}
C.__last_static_block__();
