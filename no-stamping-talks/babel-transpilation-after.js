var lastBlocks;
export class C {
  static #FOO = "#FOO";
  static #BAR = (
    (() => {
      C.#FOO = #BAR in C;
    })(),
    lastBlocks = (() => {
      Object.freeze(C);
    }),
    C.#FOO
  );
}
lastBlocks();
