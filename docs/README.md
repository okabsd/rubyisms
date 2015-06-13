# Documentation

- [Arrays](arrays)
- [Booleans](booleans)
- [Functions](functions)
- [Numbers](numbers)
- [Objects](objects)
- [Strings](strings)

## Lingo

Throughout the documentation, tests, and source code, methods are referred to as *minor* and *major* methods. *What does this mean?*, you ask. Well, if you will kindly stop interrupting me, I'll tell you.

*Major* methods are the same old functions-assigned-to-properties that we're all used to. They're basic functions attached to the prototype chain. They accept arguments, and they can chain `.call`, `.apply`, `.bind`, because they *are* functions.

*Minor* methods are methods implemented behind *getters* & *setters*. It would be fair to simply call them getters, but there's generally a lot more going on below the surface than just property retrieval - hence minor methods. They can not be invoked externally, and as such they never accept any arguments. The are simply called.


## Immutable . . . or ?

No! Yes. Maybe?

Major methods are fair game to all types of changes, they differ in no way from traditional prototype methods.

Minor methods can be overridden, but only on *instances* of Objects, Functions, and Arrays. Booleans, Numbers, Strings will fail loudly.

Trying to override a minor method on a prototype will fail loudly.


## Sanity check, please!

If a method, minor or major, already exists on a prototype it will not be overridden.

Combined with the immutable nature of prototype minor methods, it's best to include / require later than sooner.

