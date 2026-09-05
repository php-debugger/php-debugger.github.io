---
title: Inspect Variables
---

Stopping is only half of it. The reason to stop somewhere is to look at what the
code is actually holding at that moment — and the debugger gives your editor
everything that is in scope, on demand, without you adding a single `var_dump()`.

## Stack levels

When execution stops, you are not just at a line. You are at a line inside a
function, called from another function, called from another, all the way back to
the entry point. That chain is the call stack, and every frame in it has its own
set of variables.

Your editor shows it as a list — usually "Call Stack" or "Frames" — with the place
you stopped at the top and the entry point at the bottom. Clicking any frame
switches the variables panel to *that* frame's scope.

This is the part people miss, and it is the most useful thing on the page. When a
function blows up on a value it was handed, the interesting question is rarely what
that function is holding — it is what the caller passed and where that came from.
Click one frame up and you are looking at the caller's variables at the exact moment
it made the call, with everything it had in hand.

You are only reading. Selecting an outer frame changes what you are shown, not
where execution will resume; the script still continues from where it stopped.

## Reading the values

The variables panel lists what is in scope as a tree. Simple values — strings,
numbers, booleans, `null` — are shown inline, with their type.

Anything with contents inside it — arrays, objects — arrives **collapsed**, showing
a summary rather than the contents: the class name, or the number of elements.
Expanding a node asks the debugger for that node's children, and it answers with
just those.

That is worth understanding, because it explains the behaviour you will see. The
debugger does not send you the whole object graph when it stops; it sends the top
layer and waits. Expanding is a fresh request each time. This is what makes it
practical to stop inside a framework and open up a container holding half the
application without the session grinding to a halt.

There are limits on how much comes back in one go, so a very large array is
returned a chunk at a time, a deeply nested structure is only walked so far down,
and a very long string is truncated. Editors handle this for you, usually with a
"show more" affordance at the point where the list was cut off. If you find
yourself hitting those limits constantly, your editor's settings will have knobs
for them — they are negotiated per session, so raising them there is enough and no
`php.ini` change is needed.

Objects show their private and protected properties as well as their public ones,
which is the whole point of a debugger over a `print_r()`.

## The three groups

Variables arrive in three named groups. Your editor may show them as sections, as
separate panels, or as a dropdown.

| Group | What is in it |
| --- | --- |
| Locals | Everything in scope in the selected frame — parameters, local variables, and `$this` when there is one. |
| Superglobals | `$_GET`, `$_POST`, `$_SERVER`, `$_SESSION` and friends, plus anything else living at global scope. |
| User defined constants | Constants defined by your code with `define()`. |

**Locals is the one you will use.** It follows the frame you have selected in the
stack, so switching frames changes it. Almost everything you go looking for is
here.

The other two are worth knowing about, and worth not expecting much from.

### Why the other two disappoint

Both made much more sense in the PHP people wrote fifteen years ago.

**Superglobals** mattered when request handling meant reading `$_GET` and `$_POST`
directly. Any framework written this decade wraps them the moment the request
arrives and hands you a request object instead, and from that point the framework's
copy is the truth — it has been filtered, validated, cast, and possibly rewritten
by middleware. The superglobal still holds the raw original, which is occasionally
exactly what you want when you suspect the framework of mangling something, and
irrelevant the rest of the time. Look at the request object in Locals instead.

`$_SERVER` remains genuinely useful for checking what the web server actually
passed — headers, the resolved path, the environment.

**User defined constants** has the same story and a sharper edge. The list only
ever contains constants your code defined with `define()` — PHP's own constants and
those from extensions are deliberately left out, so the list is far shorter than
you might expect. And `define()` itself has largely been replaced: values that were
once constants now live as class constants, enum cases, container parameters or
environment configuration, none of which show up here.

The practical consequence is that on a modern codebase this group is often empty,
or holds three entries from a bootstrap file. That is not a fault — there is simply
not much left for it to report.
