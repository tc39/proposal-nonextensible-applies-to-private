# Strength Non-extensibility

A TC39 proposal to stengthen non-extensibility so it also prevents stamping new private fields onto non-extensible objects.

## Status

[The TC39 Process](https://tc39.es/process-document/)

**Stage**: Stage 0

**Champions**:
- Shu-yu Guo (@syg)
- Mark S. Miller (@erights)

## Background

Prior proposal [Stabilize, and other integrity traits](https://github.com/tc39/proposal-stabilize) proposed a new integrity trait, "fixed", that would imply non-extensibility. But "fixed" would be stronger than non-extensibility in that it would also mitigate the return-override mistake by preventing new private fields from being stamped onto fixed objects. We proposed this as a separate integrity trait under the assumption that changing the semantics of non-extensibility would be too incompatible.

Issue [V8 prefers to normatively change non-extensible to imply fixed (no private stamping) #5](https://github.com/tc39/proposal-stabilize/issues/5) raises the possibility that just strengthening non-extensibility itself might be compatible enough, which could be adequately determined by the V8 and Chrome teams by so-called "usage counters" in the Chrome browsers. Measurements to date support this hypothesis. All involved vastly prefer the simplicity of this alternative, if it is indeed possible.

This is the proposal to do exactly that -- strengthen non-extensibility so that it also prevents stamping private fields onto non-extensible objects.

## Motivation

### The Fixed-shape Motivation

The [Structs](https://github.com/tc39/proposal-structs) proposal is itself partially motivated to create higher performance class-like objects. To achieve that, it wants to create objects of fixed shape. Hence struct instances are both sealed, which implies non-extensible.

However, the return override mistake enables the use of classes to stamp private fields onto existing objects (with the notable exception of the browser global windowProxy object). The class-like structs proposal purposely omits return override. However, without some new mechanism, classes could still be used to stamp new private fields onto existing struct instances.

Unfortunately, most JS engines implement the stamping of new private fields onto objects by changing the shape of the object, just as they do with the addition of named public properties. Non-extensibility by itself prevents the latter. JS could in theory implement the stamping of structs by other means, but this would be highly unpleasant for those implementations. Therefore we need to prohibit the use of return override to stamp private fields onto structs. If this prohibition were introduced by a new integrity trait like "fixed", the structs proposal could just state that all struct instances are born "fixed" and "sealed". Or, if non-extensible is strengthened to include "fixed", the it is sufficient to state that all struct instances are "sealed".

### The Hidden Global Communications Channel

In [Hardened JavaScript](https://hardenedjs.org/), mutiple Compartments in the same Realm should be isolated from each other. TODO more...

### The Loss of Virtualizability

[Endo](https://github.com/endojs/endo), which build on Hardened JavaScript, is supposed to support the transparent virtualization of so-called "exo" objects. TODO more...
