---
title: Watches and Edits
---

[Inspecting variables](./inspect-variables.md) tells you what the code is holding.
This page covers the two things you can do beyond that: watch an expression so its
value is in front of you at every stop, and change a value while the script is
paused.

Underneath, both are the same mechanism — the debugger runs a fragment of PHP
inside your paused request — and that is worth knowing, because it explains the
sharp edges on both.

## Watch expressions

A watch is an expression you hand to your editor once, which it then re-evaluates
every time execution stops and shows alongside the variables. Anything valid in
that scope will do:

```php
$order->getTotal()
count($items)
$user->isActive() && $user->getRole() === 'admin'
$items[$i]['sku']
```

The value refreshes at every stop, so stepping through a loop with
`$items[$i]['sku']` on watch turns "what is this iteration working on" into
something you read rather than something you go digging for.

Watches are the natural companion to stepping. A breakpoint tells you *when*, the
variables panel tells you *what is here*, and a watch tells you *what the thing you
actually care about is doing* — especially when it is buried several levels inside
a structure you would otherwise be expanding by hand at every stop.

### What a watch really is

It is not a read. The debugger evaluates the expression as PHP, in the paused
process, exactly as though the line appeared in your code at that point. Four
consequences follow, and all four can surprise you:

**Side effects are real.** `$collection->pop()` in a watch pops the collection —
every time you stop. An expression that writes to the database writes to the
database. Keep watches to questions, not actions.

**Breakpoints inside a watch are ignored.** The debugger switches breakpoints off
while it evaluates. Watch an expression that calls a function you have a breakpoint
in, and that breakpoint stays silent — which is the right behaviour, since the
alternative is stopping inside your own watch.

**Errors are swallowed.** Error reporting is turned off for the evaluation, so a
warning or notice your expression provokes goes nowhere. If a thrown exception is
what ended it, your editor shows the exception message in place of the value.

**Watches evaluate where execution stopped.** Selecting an outer frame in the call
stack changes what the variables panel shows, but a watch is still evaluated in the
frame the debugger actually paused in. An expression naming a local of the caller
will not resolve just because you have that frame selected.

Most editors also offer a one-off "evaluate expression" box for a question you only
want to ask once. It is the same machinery with the same caveats — the only
difference is that nothing is remembered for the next stop.

## Editing values

You can also change a value while the script is paused. In most editors it is a
double-click on the value in the variables panel, or a "set value" item on its
context menu.

What happens is an assignment, executed in the scope of the frame you have selected
— `$retries = 0`, run inside the paused request. Execution then carries on with the
new value, exactly as if the code had put it there.

This is the fastest way to reach a branch you cannot otherwise get to. A retry path
that only runs on the third failure, an error handler that needs a malformed
response, a discount that only applies over a threshold: rather than contriving the
input, stop before the branch and set the value that takes you down it.

Editors usually let you say what type you mean — boolean, integer, float or string
— for the cases where `0` should not become the string `"0"`.

Some edits will simply refuse:

- a **typed property** given something its declared type rejects
- a **readonly property** that has already been set
- **constants**, which cannot be assigned to at all

Your editor reports that the change did not take, though often quietly — if a value
snaps back to what it was, that is what happened.

:::warning[You are changing the run, not the code]

An edit lives in the paused request and nowhere else. The file on disk is untouched
and the value is gone when the request ends.

That cuts both ways. Nothing you do here can damage your source — but a bug you
"fixed" by editing a value is still in the code, and the next request will run it
exactly as before.

:::
