# Documentation

- [Arrays](arrays)
- [Booleans](booleans)
- [Functions](functions)
- [Numbers](numbers)
- [Objects](objects)
- [Strings](strings)

## Lingo

Throughout the documentation, tests, and source code, methods are referred to as *minor* and *major*. *'What does this mean?',* you ask. Well, if you would kindly stop interrupting me, I'll tell you.

Hmm.

*Major* methods are the same old functions-assigned-to-properties that we're all used to. They're basic functions attached to the prototype chain. They accept arguments, and they can chain `.call`, `.apply`, `.bind`, because they *are* functions.

*Minor* methods are methods implemented behind *getters* & *setters*. It would be fair to simply call them getters, but there's generally a lot more going on below the surface than just property retrieval. They can *not* be invoked externally, and as such they never accept any arguments. They are simply called.


## Immutable . . . or ?

No! Yes. Maybe? Kind of. Mostly no, actually!

Major methods are fair game to all types of changes - instanced and prototype.

On prototypes, minor methods can be overridden with assignment, redefined with `Object.defineProperty`, or removed with the `delete` operator.

Minor methods can be overridden on *instances*, but only on **Objects**, **Functions**, and **Arrays**. Booleans, Numbers, and Strings will fail loudly, because `Object.defineProperty` will be called with the non-object as the `this` context. The `delete` operator will not work either.


## Sanity check, please!

If a method, minor or major, already exists on a prototype it will not be overridden.

One can safely include Rubyisms at just about any time, and be fairly certain of no conflicts.

